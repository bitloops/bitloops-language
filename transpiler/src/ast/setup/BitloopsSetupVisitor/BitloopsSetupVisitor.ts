/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import BitloopsSetupParserVisitor from '../../../parser/setup/grammar/BitloopsSetupParserVisitor.js';
import BitloopsSetupParser from '../../../parser/setup/grammar/BitloopsSetupParser.js';
import {
  ISetupData,
  TControllerResolverBind,
  TEnvironmentVariableExpression,
  TGraphQLServerInstance,
  TRepoAdapterInfo,
  TRepoConnectionInfo,
  TRepoSupportedTypes,
  TRestServerInstanceRouters,
  TSingleExpression,
} from '../../../types.js';
import { removeStringLiteralQuotes } from '../../utils/string-literals.js';
import { getUseCases } from '../helpers/getUseCases.js';
import { LANGUAGES } from './constants.js';
import {
  populateRoutes,
  populateControllers,
} from './routerDefinitions/populateRoutesAndControllers.js';
import { GraphQLServerResolverBind } from './graphql/types.js';
import { populateGraphQLAndControllers } from './graphql/populatateGraphQLAndControllers.js';
import { REST_METHOD_MAPPER } from './constants.js';
import { visitCustomServerOption } from './helpers/index.js';

export default class BitloopsSetupVisitor extends BitloopsSetupParserVisitor {
  [x: string]: any;
  private useCases: any;
  private packages: any;
  private _result: ISetupData = {
    setup: { language: 'TypeScript', servers: {}, routers: {} },
    repos: { connections: {}, repoAdapters: {} },
  };

  constructor() {
    super();
    this.useCases = [];
    this.packages = {};
  }

  get result(): ISetupData {
    return this._result;
  }

  visitPackageConcretion(ctx: BitloopsSetupParser.PackageConcretionContext): void {
    const { boundedContext, module } = this.visit(ctx.boundedContextModuleDeclaration());
    const adapterClassName = ctx.adapter.getText();
    const portClassName = ctx.port.getText();
    const classModel = {
      [module]: {
        [portClassName]: adapterClassName,
      },
    };

    this.packages[boundedContext] = classModel;
  }

  visitProgram(ctx: BitloopsSetupParser.ProgramContext): ISetupData {
    // console.log('visitProgram');
    const children = this.visitChildren(ctx);
    if (this.isJestTestElement(children)) {
      return children[0].test;
    }
    if (this.useCases.length > 0) {
      const useCases = getUseCases(this.useCases);
      this._result.useCases = useCases;
    }
    if (Object.keys(this.packages).length > 0) {
      this._result.packages = this.packages;
    }

    return this.result;
  }
  private isJestTestElement(children: any): boolean {
    return children?.[0] && children[0].test;
  }

  /**
   * Config
   */
  visitConfigSetLanguageInvocation(
    ctx: BitloopsSetupParser.ConfigSetLanguageInvocationContext,
  ): void {
    const language = this.visit(ctx.languageSetterMethod());
    const classModel = LANGUAGES[language];
    // console.log('classModel', classModel);
    if (!classModel) {
      throw new Error('Unknown language');
    }
    this._result.setup.language = classModel;
  }
  visitLanguageSetterMethod(ctx: BitloopsSetupParser.LanguageSetterMethodContext): string {
    return ctx.language().getText();
  }

  /**
   * Server Expressions
   */
  visitRestServerExpression(ctx: BitloopsSetupParser.RestServerExpressionContext): void {
    // console.log('visitRestServerExpression');
    const serverRawOptions = this.visit(ctx.serverInstantiationOptions());
    const { port, serverType, apiPrefix, cors } = serverRawOptions;
    const serverOptions: any = {
      port,
      apiPrefix,
    };
    if (cors) {
      serverOptions.cors = cors;
    }
    const routers = this.visit(ctx.bindServerRoutes());
    serverOptions.routers = routers;

    if (!this._result.setup.servers) {
      this._result.setup.servers = {};
    }
    if (!this._result.setup.servers[serverType]) {
      this._result.setup.servers[serverType] = { serverInstances: [] };
    }
    this._result.setup.servers[serverType].serverInstances.push(serverOptions);
  }

  visitServerInstantiationOptions(ctx: BitloopsSetupParser.ServerInstantiationOptionsContext): any {
    const optionsArray = this.visitChildren(ctx);

    // Ignore first and last Curly braces
    const options = optionsArray.slice(1, optionsArray.length - 1);
    return options.reduce((acc, option) => {
      return { ...acc, ...option[0] };
    }, {});
  }

  visitServerTypeOption(ctx: BitloopsSetupParser.ServerTypeOptionContext): { serverType: string } {
    const serverType = ctx.serverType().getText();
    return { serverType };
  }
  visitServerApiPrefixOption(ctx: BitloopsSetupParser.ServerApiPrefixOptionContext): {
    apiPrefix: string;
  } {
    const apiPrefix = removeStringLiteralQuotes(ctx.pathString().getText());
    return { apiPrefix };
  }

  visitCustomServerOption(ctx: BitloopsSetupParser.CustomServerOptionContext): {
    [key: string]: TSingleExpression;
  } {
    console.log('visitCustomServerOption');
    const res = visitCustomServerOption(this, ctx);
    return res;
  }

  visitBindServerRoutes(
    ctx: BitloopsSetupParser.BindServerRoutesContext,
  ): TRestServerInstanceRouters {
    const childrenResult = this.visitChildren(ctx);

    const routeBinds = childrenResult.filter((child) => child !== undefined);
    const routers: TRestServerInstanceRouters = {};
    for (const child of routeBinds) {
      const { routerPrefix, routerInstanceName } = child;
      routers[routerInstanceName] = { routerPrefix };
    }
    return routers;
  }

  visitRouteBind(ctx: BitloopsSetupParser.RouteBindContext): any {
    const routePath = ctx.pathString().getText();
    const identifier = ctx.identifier().getText();
    return { routerPrefix: removeStringLiteralQuotes(routePath), routerInstanceName: identifier };
  }

  /**
   *  Router Definition
   */
  visitRouterDefinition(ctx: BitloopsSetupParser.RouterDefinitionContext): void {
    const identifier = this.visit(ctx.routerDeclaration());
    const routerExpression = this.visit(ctx.routerExpression());

    const { controllerDeclarations, serverType } = routerExpression;
    this.initializeRoutesAndControllers(serverType, identifier);

    for (const controllerDeclaration of controllerDeclarations) {
      populateRoutes(controllerDeclaration, this._result, serverType, identifier);
      populateControllers(controllerDeclaration, this._result, serverType);
    }
  }

  private initializeRoutesAndControllers(serverType: string, routerInstance: string): void {
    if (!this._result.setup.routers) this._result.setup.routers = {};
    if (!this._result.setup.routers[serverType]) this._result.setup.routers[serverType] = {};

    this._result.setup.routers[serverType][routerInstance] = {
      methodURLMap: {},
    };

    if (!this._result.controllers) this._result.controllers = {};
  }
  visitRouterDeclaration(ctx: BitloopsSetupParser.RouterDeclarationContext): string {
    const identifier = ctx.identifier().getText();
    return identifier;
  }

  visitRouterExpression(ctx: BitloopsSetupParser.RouterExpressionContext): any {
    // console.log('visitRouterExpression');
    const serverType = this.visit(ctx.routerArguments())[0];
    const controllerDeclarations = this.visit(ctx.nestedImpliedControllerDeclarations());
    return { serverType, controllerDeclarations };
  }

  visitValidRouterArguments(ctx: BitloopsSetupParser.ValidRouterArgumentsContext): string {
    this.visit(ctx.serverType());
    const serverType = ctx.serverType().getText();
    return serverType;
  }

  visitServerType(ctx: BitloopsSetupParser.ServerTypeContext): any {
    return this.visitChildren(ctx);
  }

  visitUnknownServer(_ctx: BitloopsSetupParser.UnknownServerContext): void {
    throw new Error('Unknown server');
  }

  visitNestedControllerInstantiation(
    ctx: BitloopsSetupParser.NestedControllerInstantiationContext,
  ): any {
    const method = ctx.method().getText();
    const path = removeStringLiteralQuotes(ctx.pathString().getText());
    const { boundedContext, module } = this.visit(ctx.boundedContextModuleDeclaration());
    const controllerName = ctx.controllerName().getText();
    const dependencies = this.visit(ctx.controllerDependencies());

    const key = `${REST_METHOD_MAPPER[method]} ${path}`;
    return {
      key,
      controllerClass: controllerName,
      boundedContext,
      module,
      dependencies,
      method: REST_METHOD_MAPPER[method],
      path,
    };
  }

  visitControllerDependencies(ctx: BitloopsSetupParser.ControllerDependenciesContext): string[] {
    // console.log('visitControllerDependencies');
    const dependencies = this.visitChildren(ctx);
    if (dependencies === null) {
      return [];
    }
    return dependencies.filter((dep?: string) => dep !== undefined);
  }

  /**
   * GraphQLServerExpression
   */
  visitGraphQLServerExpression(ctx: BitloopsSetupParser.GraphQLServerExpressionContext): void {
    const port = this.visit(ctx.graphQLServerInstantiationOptions());
    // console.log({ port });
    const resolvers: TControllerResolverBind[] = this.visit(ctx.bindControllerResolvers());
    // console.log({ resolvers });

    // TODO remove partial,  controllerInstance: string is missing
    const serverOptions: TGraphQLServerInstance = {
      port,
      resolvers,
    };

    const serverOptionsWithControllerInstance = populateGraphQLAndControllers(
      this.result,
      serverOptions,
    );
    this.populateGraphQLServer(serverOptionsWithControllerInstance);
  }

  visitGraphQLServerInstantiationOptions(
    ctx: BitloopsSetupParser.GraphQLServerInstantiationOptionsContext,
  ): any {
    return this.visit(ctx.graphQLServerInstantiationOption());
  }

  visitGraphQLServerInstantiationOption(
    ctx: BitloopsSetupParser.GraphQLServerInstantiationOptionContext,
  ): TSingleExpression {
    const { port } = this.visit(ctx.customServerOption());
    return port;
  }

  visitBindControllerResolvers(
    ctx: BitloopsSetupParser.BindControllerResolversContext,
  ): GraphQLServerResolverBind[] {
    // console.log('visitBindControllerResolvers');
    const childrenResult = this.visitChildren(ctx);
    // console.log({ childrenResult });
    const controllerResolvers = childrenResult.filter((child) => child !== undefined);
    // console.log({ controllerResolvers });
    return controllerResolvers;
  }

  visitControllerResolverBind(
    ctx: BitloopsSetupParser.ControllerResolverBindContext,
  ): GraphQLServerResolverBind {
    const { boundedContext, module } = this.visit(ctx.boundedContextModuleDeclaration());
    // routeBind
    const controllerName = ctx.controllerName().getText();
    const dependencies = this.visit(ctx.controllerDependencies());
    return {
      boundedContext,
      module,
      controllerClassName: controllerName,
      dependencies,
    };
  }

  private populateGraphQLServer(serverOptions: TGraphQLServerInstance) {
    if (!this.result.setup.servers) this._result.setup.servers = {};
    const serverType = 'GraphQL';
    if (this._result.setup.servers) {
      if (!this._result.setup.servers[serverType]) {
        this._result.setup.servers[serverType] = { serverInstances: [] };
      }
      this._result.setup.servers[serverType].serverInstances.push(serverOptions);
    }
  }

  /**
   * Use Case Definition
   */
  visitUseCaseDefinitionStatement(ctx: BitloopsSetupParser.UseCaseDefinitionStatementContext) {
    // console.log('visitUseCaseDefinitionStatement');
    const useCaseObject = this.visit(ctx.useCaseDefinition());
    this.useCases.push(useCaseObject);
    return;
  }

  visitRepoConnectionDefinition(ctx: BitloopsSetupParser.RepoConnectionDefinitionContext): void {
    // console.log('visitRepoConnectionDefinition');
    const [, connectionName] = this.visit(ctx.constDeclaration());
    const repoConnectionTypeAndOptions: TRepoConnectionInfo = this.visit(
      ctx.repoConnectionExpression(),
    );

    this._result.repos.connections[connectionName] = repoConnectionTypeAndOptions;
  }

  visitRepoAdapterDefinition(ctx: BitloopsSetupParser.RepoAdapterDefinitionContext) {
    const [, repoAdapterInstanceIdentifier] = this.visit(ctx.constDeclaration());
    const repoExpression = this.visit(ctx.repoAdapterExpression());
    const { repoAdapterInfo, boundedContext, module } = repoExpression;
    this.populateRepoAdapters({
      boundedContext,
      module,
      repoAdapterInstanceIdentifier,
      repoAdapterInfo,
    });
  }

  visitRepoAdapterExpression(ctx: BitloopsSetupParser.RepoAdapterExpressionContext) {
    // const result = this.visitChildren(ctx);
    // console.log('visitRepoAdapterExpression', result);
    const rawRepoAdapterType = this.visit(ctx.repoAdapterClassName());
    // console.log('adapterClassName', rawRepoAdapterType);
    const databaseTypesMapping: Record<string, TRepoSupportedTypes> = {
      'RepoAdapters.Mongo': 'DB.Mongo',
    };
    const dbType = databaseTypesMapping[rawRepoAdapterType];
    if (!dbType) throw new Error('Database type not supported: ' + rawRepoAdapterType);

    const parsedOptions = this.visit(ctx.repoAdapterOptions())[0];
    // console.log('parsedOptions', parsedOptions);
    // Check that passed option names are valid
    this.checkObjectHasProperties(
      parsedOptions,
      ['connection', 'collection'],
      (property) => `Repo Adapter option ${property} is missing`,
    );

    const { connection, collection } = parsedOptions;

    const repoPort = this.visit(ctx.concretedRepoPort()); //getNextTypesValue('concretedRepoPort', repoAdapterExpression);
    const { boundedContext, module } = this.visit(ctx.boundedContextModuleDeclaration());
    const repoAdapterInfo: TRepoAdapterInfo = {
      collection,
      connection,
      repoPort,
      dbType,
    };
    return { repoAdapterInfo, boundedContext, module };
  }

  visitRepoAdapterClassName(ctx: BitloopsSetupParser.RepoAdapterClassNameContext): string {
    return ctx.RepoAdapters().getText() + ctx.Dot().getText() + ctx.Mongo().getText();
  }
  visitConcretedRepoPort(ctx: BitloopsSetupParser.ConcretedRepoPortContext): string {
    return ctx.RepoPortIdentifier().getText();
  }

  visitRepoConnectionExpression(
    ctx: BitloopsSetupParser.RepoConnectionExpressionContext,
  ): TRepoConnectionInfo {
    // console.log('visitRepoConnectionExpression');
    const dbConnectionType = this.visit(ctx.repoConnectionType()); //.Mongo().getText());

    const databaseTypesMapping: Record<string, TRepoSupportedTypes> = {
      Mongo: 'DB.Mongo',
    };
    const dbType = databaseTypesMapping[dbConnectionType];
    // Get result of 1st child of repoConnectionOptions (objectProperties)
    const repoConnectionObject = this.visit(ctx.repoConnectionOptions())[0];
    // console.log('repoConnectionObject', repoConnectionObject);

    this.checkObjectHasProperties(
      repoConnectionObject,
      ['host', 'port', 'database'],
      (property) => `Repo Connection option ${property} is missing`,
    );
    return {
      ...repoConnectionObject,
      dbType,
    };
  }

  visitObjectProperties(ctx: BitloopsSetupParser.ObjectPropertiesContext): Record<string, any> {
    // console.log('visitObjectProperties');

    const objectPropertiesAndCommas = this.visitChildren(ctx);
    const objectProperties = objectPropertiesAndCommas.filter((child: any) => child !== undefined);

    const parserObjectProperties = objectProperties.reduce((acc: any, property: any) => {
      acc = {
        ...acc,
        ...property,
      };
      return acc;
    }, {});
    // console.log('parserObjectProperties:', parserObjectProperties);
    return parserObjectProperties;
  }

  visitObjectProperty(ctx: BitloopsSetupParser.ObjectPropertyContext) {
    // console.log('visitObjectProperty');
    const identifier = this.visit(ctx.identifier());
    const singleExpression = this.visit(ctx.singleExpression());
    const returnObject = {
      [identifier]: singleExpression,
    };
    return returnObject;
  }

  /**
   * Single Expression
   */
  visitLogicalOrExpression(ctx: BitloopsSetupParser.LogicalOrExpressionContext): TSingleExpression {
    const left = this.visit(ctx.singleExpression(0));
    const right = this.visit(ctx.singleExpression(1));
    const returnObject = {
      expression: {
        logicalExpression: {
          orExpression: {
            left: left,
            right: right,
          },
        },
      },
    };
    return returnObject;
  }

  visitEnvVarWithDefaultValueExpression(
    ctx: BitloopsSetupParser.EnvVarWithDefaultValueExpressionContext,
  ): TSingleExpression {
    // console.log('visitEnvVarWithDefaultValueExpression');

    const identifier = this.visit(ctx.identifier());
    const literal = this.visit(ctx.literal());

    return {
      expression: {
        envVarDefault: {
          envVariable: {
            value: identifier,
          },
          defaultValue: {
            literal,
          },
        },
      },
    };
  }

  visitEnvironmentVariableExpression(
    ctx: BitloopsSetupParser.EnvironmentVariableExpressionContext,
  ): TSingleExpression {
    const environmentVariable = this.visitChildren(ctx)[0];
    const returnObject = {
      expression: environmentVariable,
    };
    return returnObject;
  }

  visitLiteralExpression(ctx: BitloopsSetupParser.LiteralExpressionContext): TSingleExpression {
    const result = this.visitChildren(ctx);
    return {
      expression: {
        literal: result[0],
      },
    };
  }

  visitIdentifierExpression(
    ctx: BitloopsSetupParser.IdentifierExpressionContext,
  ): TSingleExpression {
    const result = this.visit(ctx.identifier());
    return {
      expression: {
        identifier: {
          value: result,
        },
      },
    };
  }

  visitEnvVariable(ctx: BitloopsSetupParser.EnvVariableContext): TEnvironmentVariableExpression {
    const value = ctx.EnvVariable().getText();
    return {
      envVariable: {
        value,
      },
    };
  }

  visitNumericLiteralExpression(ctx: BitloopsSetupParser.NumericLiteralExpressionContext): {
    type: 'number'; // BitloopsPrimitives?
    value: string;
  } {
    const result = this.visit(ctx.numericLiteral());
    return {
      type: 'number', // TODO: check correct BitloopsPrimitive
      value: result,
    };
  }

  visitObjectLiteralExpression(ctx: BitloopsSetupParser.ObjectLiteralExpressionContext) {
    const objectLiteral = this.visitChildren(ctx).filter((listItem) => listItem !== undefined);
    return {
      expression: {
        objectLiteral,
      },
    };
  }

  visitPropertyExpressionAssignment(ctx: BitloopsSetupParser.PropertyExpressionAssignmentContext) {
    const identifier = ctx.propertyName().getText();
    const singleExpression = this.visit(ctx.singleExpression());
    return {
      name: identifier,
      expression: singleExpression.expression,
    };
  }

  visitStringLiteralExpression(ctx: BitloopsSetupParser.StringLiteralExpressionContext): {
    type: string;
    value: string;
  } {
    const stringLiteral = this.visit(ctx.stringLiteral());
    return {
      type: 'string',
      value: removeStringLiteralQuotes(stringLiteral),
    };
  }

  visitBooleanLiteralExpression(ctx: BitloopsSetupParser.BooleanLiteralExpressionContext): {
    type: 'bool';
    value: boolean;
  } {
    const BOOL_STRING = 'bool';

    const booleanValue = ctx.BooleanLiteral().getText();
    if (booleanValue !== 'true' && booleanValue !== 'false') {
      throw new Error(`Boolean value not recognized: ${booleanValue}`);
    }
    return {
      type: BOOL_STRING,
      value: booleanValue,
    };
  }

  visitStringLiteral(ctx: BitloopsSetupParser.StringLiteralContext): string {
    return ctx.StringLiteral().getText();
  }

  visitIntegerLiteral(ctx: BitloopsSetupParser.IntegerLiteralContext): string {
    return ctx.IntegerLiteral().getText();
  }

  visitRepoConnectionType(ctx: BitloopsSetupParser.RepoConnectionTypeContext): string {
    return (ctx as any).getText();
  }

  visitIdentifier(ctx: BitloopsSetupParser.IdentifierContext): string {
    // console.log('visitIdentifier');
    return ctx.Identifier().getText();
  }

  visitUseCaseDeclaration(ctx: BitloopsSetupParser.UseCaseDeclarationContext) {
    // console.log('visitUseCaseDeclaration');
    return this.visit(ctx.identifier());
  }

  visitUseCaseDefinition(ctx: BitloopsSetupParser.UseCaseDefinitionContext) {
    // console.log('visitUseCaseDefinition');
    const instanceName = this.visit(ctx.useCaseDeclaration());
    const { boundedContext, module, useCase, useCaseDependencies } = this.visit(
      ctx.useCaseExpression(),
    );
    const returnObject = {
      [boundedContext]: {
        [module]: {
          [useCase]: {
            instances: [{ instanceName, dependencies: useCaseDependencies }],
          },
        },
      },
    };
    return returnObject;
  }

  visitUseCaseExpression(ctx: BitloopsSetupParser.UseCaseExpressionContext) {
    // console.log('visitUseCaseExpression');
    const { boundedContext, module } = this.visit(ctx.boundedContextModuleDeclaration());
    const useCase = ctx.useCaseName().getText();
    const useCaseDependencies = ctx.useCaseDependencies().getText();
    if (useCaseDependencies === '') {
      return {
        boundedContext: boundedContext,
        module: module,
        useCase: useCase,
        useCaseDependencies: [],
      };
    }
    return {
      boundedContext: boundedContext,
      module: module,
      useCase: useCase,
      useCaseDependencies: [useCaseDependencies],
    };
  }

  visitBoundedContextModuleDeclaration(
    ctx: BitloopsSetupParser.BoundedContextModuleDeclarationContext,
  ): { boundedContext: string; module: string } {
    // console.log('visitBoundedContextModuleDeclaration');
    const boundedContext = this.visit(ctx.wordsWithSpaces(0));
    const module = this.visit(ctx.wordsWithSpaces(1));
    return { boundedContext, module };
  }

  visitWordsWithSpaces(ctx: BitloopsSetupParser.WordsWithSpacesContext): string {
    // console.log('visitWordsWithSpaces');
    const words = this.visitChildren(ctx).join(' ');
    return words;
  }
  visitAlpha_numeric_ws(ctx: BitloopsSetupParser.Alpha_numeric_wsContext): string {
    // console.log('visitAlpha_numeric_ws');
    return ctx.Identifier().getText();
  }

  private populateRepoAdapters(params: {
    boundedContext: string;
    module: string;
    repoAdapterInstanceIdentifier: string;
    repoAdapterInfo: TRepoAdapterInfo;
  }): void {
    const { boundedContext, module, repoAdapterInstanceIdentifier, repoAdapterInfo } = params;
    if (!this.result.repos.repoAdapters[boundedContext])
      this._result.repos.repoAdapters[boundedContext] = {};
    if (!this._result.repos.repoAdapters[boundedContext][module]) {
      this._result.repos.repoAdapters[boundedContext][module] = {};
    }
    this._result.repos.repoAdapters[boundedContext][module][repoAdapterInstanceIdentifier] =
      repoAdapterInfo;
  }

  protected checkObjectHasProperties(
    object: Record<string, unknown>,
    properties: string[],
    errorMessage: (prop: string) => string,
  ): void {
    properties.forEach((property) => {
      if (!object[property]) {
        throw new Error(errorMessage(property));
      }
    });
  }

  /**
   * Jest Tests
   */
  visitTestSingleExpression(ctx: BitloopsSetupParser.TestSingleExpressionContext): {
    test: TSingleExpression;
  } {
    // console.log('visitTestSingleExpression');
    const singleExpression = this.visit(ctx.singleExpression());
    // console.log(singleExpression);
    return { test: singleExpression };
  }
}
