/**
 *  Bitloops Language
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
import { BitloopsBuiltInClassNames } from '../types.js';

const BitloopsTypesMapping = {
  TClassName: 'TClassName',
  TVariable: 'TVariable',
  TVariables: 'TVariables',
  TDomainConstructorParameter: 'TDomainConstructorParameter',
  TProps: 'TProps',
  TEvaluation: 'TEvaluation',
  TInstanceOf: 'TInstanceOf',
  TArgument: 'TArgument',
  TArgumentDependency: 'TArgumentDependency',
  TSwitchCases: 'TSwitchCases',
  TSwitchCase: 'TSwitchCase',
  TArgumentDependencyType: 'TArgumentDependencyType',
  TParameter: 'TParameterDependency',
  TParameterDependencyIdentifier: 'TParameterDependencyIdentifier',
  TParameterList: 'TParameterDependencies',
  TArgumentDependencies: 'TArgumentDependencies',
  TRegularEvaluation: 'TRegularEvaluation',
  TGetClass: 'TGetClass',
  TToStringExpression: 'TToStringExpression',
  TStructEvaluation: 'TStructEvaluation',
  TPropsEvaluation: 'TPropsEvaluation',
  TDTOEvaluation: 'TDTOEvaluation',
  TCondition: 'TCondition',
  TExpression: 'TExpression',
  TReturnStatement: 'TReturnStatement',
  TConstDeclaration: 'TConstDeclaration',
  TReturnOKStatement: 'TReturnOKStatement',
  TReturnErrorStatement: 'TReturnErrorStatement',
  TConstDecomposition: 'TConstDecomposition',
  TCase: 'TCase',
  TDefaultCase: 'TDefaultCase',
  TRegularCase: 'TRegularCase',
  TSwitchStatement: 'TSwitchStatement',
  TBreakStatement: 'TBreakStatement',
  TStatement: 'TStatement',
  TStatements: 'TStatements',
  TStatementsWithoutThis: 'TStatementsWithoutThis',
  TIfStatement: 'TIfStatement',
  TDTO: 'TDTO',
  TStruct: 'TStruct',
  TOkErrorReturnType: 'TOkErrorReturnType',
  TValueObject: 'TValueObject',
  TUseCase: 'TUseCase',
  TUseCaseExecute: 'TUseCaseExecute',
  TRESTController: 'TRESTController',
  TGraphQLController: 'TGraphQLController',
  TGraphQLControllerIdentifier: 'TGraphQLControllerIdentifier',
  TGraphQLControllerOperationType: 'TGraphQLControllerOperationType',
  TGraphQLControllerInputType: 'TGraphQLControllerInputType',
  TGraphQLControllerOperationName: 'TGraphQLControllerOperationName',
  TGraphQLControllerExecuteReturnType: 'TGraphQLControllerExecuteReturnType',
  TGraphQLControllerExecute: 'TGraphQLControllerExecute',
  TGraphQLControllerExecuteDependencies: 'TGraphQLControllerExecuteDependencies',
  TController: 'TController',
  TString: 'TString',
  TBackTickString: 'TBackTickString',
  TDomainErrors: 'TDomainErrors',
  TDomainError: 'TDomainError',
  TApplicationError: 'TApplicationError',
  TErrorId: 'TErrorId',
  TErrorMessage: 'TErrorMessage',
  TEvaluatePrimitive: 'TEvaluatePrimitive',
  TGraphQLSetupData: 'TGraphQLSetupData',
  TDefinitionMethodInfo: 'TDefinitionMethodInfo',
  TDefinitionMethods: 'TDefinitionMethods',
  TReturnType: 'TReturnType',
  TPackagePort: 'TPackagePort',
  TPackagePortIdentifier: 'TPackagePortIdentifier',
  TPackage: 'TPackage',
  TPackageIdentifier: 'TPackageIdentifier',
  TPackageAdapterList: 'TPackageAdapterList',
  TDomainCreateMethod: 'TDomainCreateMethod',
  TDomainCreateParameterType: 'TDomainCreateParameterType',
  TValueObjectEvaluation: 'TValueObjectEvaluation',
  TEvaluationFields: 'TEvaluationFields',
  TEvaluationField: 'TEvaluationField',
  TDomainEvaluation: 'TDomainEvaluation',
  TDomainEvaluationProps: 'TDomainEvaluationProps',
  TEntityEvaluation: 'TEntityEvaluation',
  TCommandEvaluation: 'TCommandEvaluation',
  TQueryEvaluation: 'TQueryEvaluation',
  TEntity: 'TEntity',
  TEntityValues: 'TEntityValues',
  TRootEntity: 'TRootEntity',
  TThisDeclaration: 'TThisDeclaration',
  TRepoPort: 'TRepoPort',
  TRepoPortIdentifier: 'TRepoPortIdentifier',
  TLogicalExpression: 'TLogicalExpression',
  TNotExpression: 'TNotExpression',
  TAndExpression: 'TAndExpression',
  TOrExpression: 'TOrExpression',
  TMultiplicativeExpression: 'TMultiplicativeExpression',
  TMultiplicativeOperator: 'TMultiplicativeOperator',
  TAdditiveExpression: 'TAdditiveExpression',
  TAdditiveOperator: 'TAdditiveOperator',
  TRelationalExpression: 'TRelationalExpression',
  TRelationalOperator: 'TRelationalOperator',
  TEqualityOperator: 'TEqualityOperator',
  TEqualityExpression: 'TEqualityExpression',
  TXorExpression: 'TXorExpression',
  TParenthesizedExpression: 'TParenthesizedExpression',
  TVariableDeclaration: 'TVariableDeclaration',
  TExpressionValues: ' TExpressionValues',
  TDomainRule: 'TDomainRule',
  TEntityCreate: 'TEntityCreate',
  TBuiltInFunction: 'TBuiltInFunction',
  TApplyRules: 'TApplyRules',
  TReadModel: 'TReadModels',
  TReadModelIdentifier: 'TReadModelIdentifier',
  TDomainMethods: 'TDomainMethods',
  TDomainPublicMethod: 'TDomainPublicMethod',
  TDomainPrivateMethod: 'TDomainPrivateMethod',
  TValueObjectMethods: 'TValueObjectMethods',
  TBitloopsPrimaryType: 'TBitloopsPrimaryType',
  TBuiltInClassEvaluation: 'TBuiltInClassEvaluation',
  TArrayLiteralExpression: 'TArrayLiteralExpression',
  TErrorEvaluation: 'TErrorEvaluation',
  TDTOIdentifier: 'TDTOIdentifier',
  TPropsIdentifier: 'TPropsIdentifier',
  TIdentifier: 'TIdentifier',
  TStructIdentifier: 'TStructIdentifier',
  TUseCaseIdentifier: 'TUseCaseIdentifier',
  Toperator: 'Toperator',
  TIdentifierExpression: 'TIdentifierExpression',
  TOptional: 'TOptional',
  TBitloopsPrimitives: 'TBitloopsPrimitives',
  ArrayBitloopsPrimType: 'ArrayBitloopsPrimType',
  TBitloopsIdentifier: 'TBitloopsIdentifier',
  TBitloopsBuildInClasses: 'TBitloopsBuildInClasses',
  TMethodCallExpression: 'TMethodCallExpression',
  TThisExpression: 'TThisExpression',
  TStringLiteral: 'TStringLiteral',
  TTemplateStringLiteral: 'TTemplateStringLiteral',
  TNullLiteral: 'TNullLiteral',
  TNumericLiteral: 'TNumericLiteral',
  TBooleanLiteral: 'TBooleanLiteral',
  TDecimalLiteral: 'TDecimalLiteral',
  TIntegerLiteral: 'TIntegerLiteral',
  TLiteral: 'TLiteral',
  TLiteralValue: 'TLiteralValue',
  TLiteralType: 'TLiteralType',
  TMemberDotExpression: 'TMemberDotExpression',
  TAssignmentExpression: 'TAssignmentExpression',
  TName: 'TName',
  TClass: 'TClass',
  TArgumentList: 'TArgumentList',
  TThenStatements: 'TThenStatements',
  TElseStatements: 'TElseStatements',
  TEntityIdentifier: 'TEntityIdentifier',
  TConstDeclarationList: 'TConstDeclarationList',
  TDomainRuleIdentifier: 'TDomainRuleIdentifier',
  TAppliedRule: 'TAppliedRule',
  TIsBrokenIfCondition: 'TIsBrokenIfCondition',
  TErrorIdentifier: 'TErrorIdentifier',
  TErrorIdentifiers: 'TErrorIdentifiers',
  TReturnOkType: 'TReturnOkType',
  TExtendsRepoPorts: 'TExtendsRepoPorts',
  TDomainPublicMethods: 'TDomainPublicMethods',
  TDomainPrivateMethods: 'TDomainPrivateMethods',
  TRESTMethods: 'TRESTMethods',
  TRESTControllerExecute: 'TRESTControllerExecute',
  TRESTControllerExecuteDependencies: 'TRESTControllerExecuteDependencies',
  TRESTControllerIdentifier: 'TRESTControllerIdentifier',
  TValueObjectIdentifier: 'TValueObjectIdentifier',
  TServers: 'TServers',
  TServerType: 'TServerType',
  TSetupExpression: 'TSetupExpression',
  TRestServerInstanceRouters: 'TRestServerInstanceRouters',
  TEnvironmentVariableExpression: 'TEnvironmentVariableExpression',
  TRestServerInstanceRouter: 'TRestServerInstanceRouter',
  TServerOption: 'TServerOption',
  TServerOptions: 'TServerOptions',
  TRestServerPort: 'TRestServerPort',
  TAPIPrefix: 'TAPIPrefix',
  TRouterPrefix: 'TRouterPrefix',
  TUseCaseDefinition: 'TUseCaseDefinition',
  TUseCaseExpression: 'TUseCaseExpression',
  TRepoConnectionDefinition: 'TRepoConnectionDefinition',
  TRepoConnectionExpression: 'TRepoConnectionExpression',
  TRepoConnectionOptions: 'TRepoConnectionOptions',
  TRepoDatabaseType: 'TRepoDatabaseType',
  TBoundedContextModule: 'TBoundedContextModule',
  TWordsWithSpaces: 'TWordsWithSpaces',
  TBoundedContextName: 'TBoundedContextName',
  TModuleName: 'TModuleName',
  TDefaultValueEnvironmentVariable: 'TDefaultValueEnvironmentVariable',
  TRouterExpression: 'TRouterExpression',
  TRouterDefinition: 'TRouterDefinition',
  TRestRouter: 'TRestRouter',
  TRouterArguments: 'TRouterArguments',
  TRouterControllers: 'TRouterControllers',
  TRouterController: 'TRouterController',
  THTTPMethodVerb: 'THTTPMethodVerb',
  TLanguage: 'TLanguage',
  TConfigInvocation: 'TConfigInvocation',
  TPackageAdapterIdentifier: 'TPackageAdapterIdentifier',
  TPackageConcretion: 'TPackageConcretion',
  TCorsOptionsEvaluation: 'TCorsOptionsEvaluation',
  TControllerInstanceName: 'TControllerInstanceName',
  TRepoAdapterClassName: 'TRepoAdapterClassName',
  TRepoAdapterOptions: 'TRepoAdapterOptions',
  TConcretedRepoPort: 'TConcretedRepoPort',
  TRepoAdapterExpression: 'TRepoAdapterExpression',
  TSetupRepoAdapterDefinition: 'TSetupRepoAdapterDefinition',
  TRepoAdapter: 'TRepoAdapter',
  TControllerResolver: 'TControllerResolver',
  TControllerResolvers: 'TControllerResolvers',
  TGraphQLServerOptions: 'TGraphQLServerOptions',
  TGraphQLServerInstance: 'TGraphQLServerInstance',
  TRESTServerInstance: 'TRESTServerInstance',
  TCommandIdentifier: 'TCommandIdentifier',
  TQueryIdentifier: 'TQueryIdentifier',
  TCommand: 'TCommand',
  TQuery: 'TQuery',
  TDomainEvent: 'TDomainEvent',
  TDomainEventIdentifier: 'TDomainEventIdentifier',
  TCommandTopicIdentifier: 'TCommandTopicIdentifier',
  TQueryTopicIdentifier: 'TQueryTopicIdentifier',
  TCommandHandler: 'TCommandHandler',
  TQueryHandler: 'TQueryHandler',
} as const;

type TBitloopsTypesKeys = keyof typeof BitloopsTypesMapping;

export type TBitloopsTypesValues = typeof BitloopsTypesMapping[TBitloopsTypesKeys];

const ClassTypes = {
  RootEntity: 'RootEntity',
  Entity: 'Entity',
  ValueObject: 'ValueObject',
  Props: 'Props',
  Controller: 'Controller',
  UseCase: 'UseCase',
  DomainError: 'DomainError',
  ApplicationError: 'ApplicationError',
  DTO: 'DTO',
  Struct: 'Struct',
  Package: 'Package',
  RepoPort: 'RepoPort',
  RepoAdapter: 'RepoAdapter',
  DomainRule: 'DomainRule',
  ReadModel: 'ReadModel',
  Command: 'Command',
  Query: 'Query',
  DomainEvent: 'DomainEvent',
  CommandHandler: 'CommandHandler',
  QueryHandler: 'QueryHandler',
} as const;

type TClassTypesKeys = keyof typeof ClassTypes;

export type TClassTypesValues = typeof ClassTypes[TClassTypesKeys];

const ArchitectureLayers = {
  Domain: 'Domain',
};

export const mappingBitloopsBuiltInClassToLayer = {
  [BitloopsBuiltInClassNames.UUIDv4]: ArchitectureLayers.Domain,
};

const mappingClassTypeToComponentType: Record<TClassTypesValues, TBitloopsTypesValues> = {
  [ClassTypes.Controller]: BitloopsTypesMapping.TController,
  [ClassTypes.UseCase]: BitloopsTypesMapping.TUseCase,
  [ClassTypes.ValueObject]: BitloopsTypesMapping.TValueObject,
  [ClassTypes.Props]: BitloopsTypesMapping.TProps,
  [ClassTypes.DTO]: BitloopsTypesMapping.TDTO,
  [ClassTypes.DomainError]: BitloopsTypesMapping.TDomainErrors,
  [ClassTypes.Package]: BitloopsTypesMapping.TPackage,
  [ClassTypes.Entity]: BitloopsTypesMapping.TEntity,
  [ClassTypes.RepoPort]: BitloopsTypesMapping.TRepoPort,
  [ClassTypes.RootEntity]: BitloopsTypesMapping.TRootEntity,
  [ClassTypes.RepoAdapter]: BitloopsTypesMapping.TRepoAdapter,
  [ClassTypes.DomainRule]: BitloopsTypesMapping.TDomainRule,
  [ClassTypes.Struct]: BitloopsTypesMapping.TStruct,
  [ClassTypes.ApplicationError]: BitloopsTypesMapping.TApplicationError,
  [ClassTypes.ReadModel]: BitloopsTypesMapping.TReadModel,
  [ClassTypes.DomainEvent]: BitloopsTypesMapping.TDomainEvent,
  [ClassTypes.Command]: BitloopsTypesMapping.TCommand,
  [ClassTypes.Query]: BitloopsTypesMapping.TQuery,
  [ClassTypes.CommandHandler]: BitloopsTypesMapping.TCommandHandler,
  [ClassTypes.QueryHandler]: BitloopsTypesMapping.TQueryHandler,
};

export { BitloopsTypesMapping, ClassTypes, mappingClassTypeToComponentType };
