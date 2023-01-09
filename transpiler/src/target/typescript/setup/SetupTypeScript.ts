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
import path from 'path';
import { kebabCase } from '../../../utils/caseStyles.js';
import { readFromFile } from '../../../helpers/fileOperations.js';
import {
  getLanguageFileSuffixExtension,
  SupportedLanguages,
  getLanguageFileExtension,
} from '../../../helpers/supportedLanguages.js';
import { isGraphQLController, isRestServerInstance } from '../../../helpers/typeGuards.js';
import {
  // TRouterInstanceName,
  TServerType,
  TGraphQLServerInstance,
  TGraphQLSetupData,
  // TUseCasesOfModule, //TODO this is TUseCaseDefinition
  TRepoConnectionDefinition,
  TPackageConcretion,
  packageConcretionKey,
  packageAdapterIdentifierKey,
  TRouterDefinition,
  TDomainError,
  TApplicationError,
  DomainErrorKey,
  DomainErrorIdentifier,
  ApplicationErrorKey,
  ApplicationErrorIdentifier,
  TDomainErrorValue,
  TApplicationErrorValue,
  TDomainRule,
  TUseCaseDefinition,
  RestServerOptions,
  TRouterController,
  TRepoAdapterDefinition,
  TRestServerInstanceRouters,
  TLiteral,
  TGraphQLController,
  GraphQLServerInstanceKey,
  ControllerResolversKey,
  ControllerResolverKey,
} from '../../../types.js';

import { TBoundedContexts } from '../../../ast/core/types.js';
import { formatToLang } from '../helpers/codeFormatting.js';
import { StringUtils } from '../../../utils/index.js';
import { getRecursivelyFileInDirectory } from '../../../utils/getRecursivelyFileInDirectory.js';
import { GenerateServerParams } from './definitions.js';
import { graphQLSetupDataToTargetLanguage } from './graphql/index.js';
import {
  getFilePathRelativeToModule,
  getTargetFileDestination,
} from '../helpers/getTargetFileDestination.js';
import { ISetupRepos, SetupTypeScriptRepos } from './repos/index.js';
import { modelToTargetLanguage } from '../core/modelToTargetLanguage.js';
import { TSetupOutput } from './index.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../helpers/mappings.js';
import { TUseCase, UseCaseDefinitionHelpers } from './useCaseDefinition/index.js';
import { RouterDefinitionHelpers } from './routerDefinition/index.js';
import { isGraphQLServerInstance, isRestServer, TRestAndGraphQLServers } from './servers/index.js';
import { NodeValueHelpers } from './helpers.js';
import { RestFastifyGenerator } from './servers/fastify.js';
import { GraphQLControllerNode } from '../../../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerNode.js';

type PackageAdapterContent = string;
type TPackageVersions = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

interface ISetup {
  generateStartupFile(
    allServers: TRestAndGraphQLServers,
    reposData: TRepoConnectionDefinition[],
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput;
  generateAPIs(servers: TRestAndGraphQLServers, license: string): TSetupOutput[];
  generateServerRouters(routerDefinitions: TRouterDefinition[]): TSetupOutput[];
  generateServers(servers: TRestAndGraphQLServers, bitloopsModel: TBoundedContexts): TSetupOutput[];
  generateDIs(
    routerDefinitions: TRouterDefinition[],
    useCaseDefinitions: TUseCaseDefinition[],
    repoAdapterDefinitions: TRepoAdapterDefinition[],
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[];
  // generateRepoConnections(setupData: TSetupData): TSetupOutput[];
  generateRepoConnections(repoConnectionDefinitions: TRepoConnectionDefinition[]): TSetupOutput[];
  // generateControllerDIs(data: ISetupData, bitloopsModel: TBoundedContexts): TSetupOutput[];
  // generateUseCaseDIs(data: ISetupData, bitloopsModel: TBoundedContexts): TSetupOutput[];

  generatePackageFiles(
    packageDefinitions: TPackageConcretion[],
    sourceDirPath: string,
    _setupTypeMapper: Record<string, string>,
    packageVersions?: TPackageVersions,
  ): TSetupOutput[];
}

type TNodePackages = Record<string, string>;

const REQUIRED_NODE_DEPENDENCIES = {
  '@types/bcrypt-nodejs': '0.0.31',
  compression: '^1.7.4',
  dompurify: '^2.3.8',
  dotenv: '^16.0.1',
  helmet: '^5.1.0',
  jsdom: '^20.0.0',
  morgan: '^1.10.0',
  uuid: '^8.3.2',
  validator: '^13.7.0',
  '@bitloops/bl-boilerplate-core': '^0.0.6',
};

const REQUIRED_NODE_DEV_DEPENDENCIES = {
  '@types/dompurify': '^2.3.3',
  '@types/jest': '^28.1.3',
  '@types/jsdom': '^20.0.0',
  '@types/node': '^18.0.0',
  '@types/randomatic': '^3.1.3',
  '@types/validator': '^13.7.4',
  '@typescript-eslint/eslint-plugin': '^5.30.6',
  '@typescript-eslint/parser': '^5.30.6',
  'env-cmd': '^10.1.0',
  eslint: '^8.19.0',
  'eslint-config-prettier': '^8.5.0',
  'eslint-plugin-prettier': '^4.2.1',
  husky: '^8.0.1',
  jest: '^28.1.3',
  'jest-cucumber': '^3.0.1',
  'jest-extended': '^3.0.1',
  'jest-ts-auto-mock': '^2.1.0',
  nodemon: '^2.0.18',
  prettier: '^2.7.1',
  rimraf: '^3.0.2',
  'ts-auto-mock': '^3.6.2',
  'ts-jest': '^28.0.7',
  'ts-node': '^10.8.1',
  ttypescript: '^1.5.13',
  typescript: '^4.7.4',
};

const esmEnabled = false;

export class SetupTypeScript implements ISetup {
  private nodeDependencies: TNodePackages;
  private nodeDevDependencies: TNodePackages;
  private setupTypeScriptRepos: ISetupRepos;

  constructor() {
    this.nodeDependencies = REQUIRED_NODE_DEPENDENCIES;
    this.nodeDevDependencies = REQUIRED_NODE_DEV_DEPENDENCIES;
    this.setupTypeScriptRepos = new SetupTypeScriptRepos();
  }

  // generateRepoConnections(setupData: TSetupData): TSetupOutput[] {
  generateRepoConnections(repoConnectionDefinitions: TRepoConnectionDefinition[]): TSetupOutput[] {
    const repoDependencies =
      this.setupTypeScriptRepos.getPackageJSONDependencies(repoConnectionDefinitions);
    this.nodeDependencies = { ...this.nodeDependencies, ...repoDependencies };
    return this.setupTypeScriptRepos.generateRepoConnections(repoConnectionDefinitions);
  }

  getNodeDependencies(): TNodePackages {
    return this.nodeDependencies;
  }

  getNodeDevDependencies(): TNodePackages {
    return this.nodeDevDependencies;
  }

  generateDIs(
    routerDefinitions: TRouterDefinition[],
    useCaseDefinitions: TUseCaseDefinition[],
    repoAdapterDefinitions: TRepoAdapterDefinition[],
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl
    // TODO Add support for other types of DIs such as repositories, etc.
    const useCases =
      UseCaseDefinitionHelpers.getUseCasesForEachBoundedContextModule(useCaseDefinitions);
    const useCasesLength = Object.keys(useCases).length;

    const controllers =
      RouterDefinitionHelpers.getControllersForEachBoundedContextModule(routerDefinitions);
    const controllersLength = Object.keys(controllers).length;

    const repoAdaptersLength = repoAdapterDefinitions.length;

    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const moduleName of Object.keys(boundedContext)) {
        // console.log('module', module);
        const diFileName = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/DI.ts`;
        let diContent = '';
        // Gather all imports
        if (repoAdaptersLength > 0) {
          diContent += this.setupTypeScriptRepos.generateRepoDIImports(
            repoAdapterDefinitions,
            setupTypeMapper,
          );
        }

        if (useCasesLength > 0)
          diContent += this.generateDIUseCaseImports(useCases[boundedContextName][moduleName]);

        if (controllersLength > 0)
          diContent += this.generateDIControllersImports(
            controllers[boundedContextName][moduleName],
          );

        diContent += '\n';
        if (repoAdaptersLength > 0) {
          diContent += this.setupTypeScriptRepos.generateRepoDIAdapters(repoAdapterDefinitions);
        }

        if (useCasesLength > 0)
          diContent += this.generateUseCasesDIs(useCases[boundedContextName][moduleName]);

        if (controllersLength > 0)
          diContent += this.generateControllerDIsAndExports(
            controllers[boundedContextName][moduleName],
          );

        result.push({
          fileId: diFileName,
          fileType: 'DI',
          content: (license || '') + diContent,
          context: {
            boundedContextName,
            moduleName,
          },
        });
      }
    }
    return result;
  }

  private generateDIUseCaseImports(useCases: TUseCase[]): string {
    let result = '';
    for (const useCase of useCases) {
      const { useCaseExpression } = useCase;
      const { UseCaseIdentifier } = useCaseExpression;
      // Gather all use case imports
      const { path, filename } = getFilePathRelativeToModule(
        ClassTypes.UseCases,
        UseCaseIdentifier,
      );
      result += `import { ${UseCaseIdentifier} } from './${path}${filename}${
        esmEnabled ? '.js' : ''
      }';\n`;
    }
    return result;
  }

  private generateDIControllersImports(controllers: TRouterController[]): string {
    let result = '';
    for (const controller of controllers) {
      const { routerController } = controller;
      const { RESTControllerIdentifier } = routerController;
      const { path, filename } = getFilePathRelativeToModule(
        ClassTypes.Controller,
        RESTControllerIdentifier,
      );
      result += `import { ${RESTControllerIdentifier} } from './${path}${filename}${
        esmEnabled ? '.js' : ''
      }';\n`;
    }
    return result;
  }

  private generateUseCasesDIs(useCases: TUseCase[]): string {
    let result = '';
    for (const useCase of useCases) {
      const { useCaseExpression, instanceName } = useCase;
      const { UseCaseIdentifier, argumentList } = useCaseExpression;
      const useCaseDependencies = modelToTargetLanguage({
        type: BitloopsTypesMapping.TArgumentList,
        value: { argumentList },
      });
      result += `const ${instanceName} = new ${UseCaseIdentifier}${useCaseDependencies.output};\n`;
    }
    return result;
  }

  private generateControllerDIsAndExports(controllers: TRouterController[]): string {
    let controllerDIContent = '';
    let exportsString = '';
    for (const controller of controllers) {
      const { routerController } = controller;
      const { RESTControllerIdentifier, controllerInstanceName, argumentList } = routerController;

      const controllerDependencies = modelToTargetLanguage({
        type: BitloopsTypesMapping.TArgumentList,
        value: { argumentList },
      });

      controllerDIContent += `const ${controllerInstanceName} = new ${RESTControllerIdentifier}${controllerDependencies.output};\n`;
      exportsString += `export { ${controllerInstanceName} };\n`;
    }
    return controllerDIContent + '\n' + exportsString;
  }

  private findPackageAdapterFileContent(
    packageAdapter: string,
    sourceDirPath: string,
  ): PackageAdapterContent {
    const targetLanguageSuffix = getLanguageFileSuffixExtension(SupportedLanguages.TypeScript);
    const targetLanguageFileExtension = getLanguageFileExtension(SupportedLanguages.TypeScript);
    const contextPackagesFilePaths = getRecursivelyFileInDirectory(
      sourceDirPath,
      targetLanguageSuffix,
    );

    if (contextPackagesFilePaths.length === 0)
      throw new Error(`Could not find ts packages at ${sourceDirPath}`);

    const filenameToFind = packageAdapter + targetLanguageFileExtension;
    const foundFilepath = contextPackagesFilePaths.find(
      (filePath) =>
        StringUtils.getLastCharactersOfString(filePath, filenameToFind.length) === filenameToFind,
    );

    if (foundFilepath === undefined) {
      throw new Error(`Could not find ${filenameToFind} in your projects file`);
    }
    const content = readFromFile(foundFilepath);

    return content;
  }

  private getDependenciesForPackageJSON(adapterContent: string, versions: TPackageVersions): void {
    const importStrings = StringUtils.getSubstringsBetweenStrings(
      adapterContent.replaceAll('\n', ';'),
      'import',
      ';',
    );
    importStrings.forEach((importString) => {
      const isPackageImport = !importString.includes('/');
      if (isPackageImport) {
        const packageName = importString
          .split('from')[1]
          .trim()
          .split(';')[0]
          .replaceAll("'", '')
          .replaceAll('"', '');
        if (versions.dependencies[packageName])
          this.nodeDependencies[packageName] = versions.dependencies[packageName];
        else if (versions.devDependencies[packageName])
          this.nodeDevDependencies[packageName] = versions.devDependencies[packageName];
        else throw new Error(`Could not find version for ${packageName}`);
      }
    });
  }

  generatePackageFiles(
    packageDefinitions: TPackageConcretion[],
    sourceDirPath: string,
    _setupTypeMapper: Record<string, string>,
    packageVersions?: TPackageVersions,
  ): TSetupOutput[] {
    const results: TSetupOutput[] = [];
    for (const packageDef of packageDefinitions) {
      const packageDefinition = packageDef[packageConcretionKey];
      const { boundedContextName, moduleName } = packageDefinition.boundedContextModule;
      const boundedContext = boundedContextName.wordsWithSpaces;
      const module = moduleName.wordsWithSpaces;

      // const _packagePortIdentifier = packageDefinition[PackagePortIdentifierKey];
      const packageAdapterIdentifier = packageDefinition[packageAdapterIdentifierKey];

      const adapterContent = this.findPackageAdapterFileContent(
        packageAdapterIdentifier,
        `${sourceDirPath}/${boundedContext}/${module}`,
      );

      const adapterFilePathObj = getTargetFileDestination(
        boundedContext,
        module,
        'Package',
        packageAdapterIdentifier,
        'TypeScript',
      );

      results.push({
        fileType: 'Package.Adapter',
        fileId: `${adapterFilePathObj.path}/${adapterFilePathObj.filename}`,
        content: adapterContent,
      });
      if (packageVersions) {
        this.getDependenciesForPackageJSON(adapterContent, packageVersions);
      } else {
        const packageJSONString =
          readFromFile(`${sourceDirPath}/${boundedContext}/${module}/package.json`) ||
          readFromFile(`${sourceDirPath}/package.json`);
        if (packageJSONString) {
          const packageJSON = JSON.parse(packageJSONString);
          this.getDependenciesForPackageJSON(adapterContent, {
            dependencies: packageJSON.dependencies as Record<string, string>,
            devDependencies: packageJSON.devDependencies as Record<string, string>,
          });
        } else {
          throw new Error(
            `Could not find package.json in ${sourceDirPath}/${boundedContext}/${module}`,
          );
        }
      }
    }

    return results;
  }

  generateServerRouters(routerDefinitions: TRouterDefinition[], license?: string): TSetupOutput[] {
    // This can be refactored to gather all controllers and router identifier, for each server type
    const fastifyImport = "import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';";
    let fastifyExports = '';
    let fastifyRouterDefinitionBody = '';
    const fastifyControllerImports: string[] = [];

    for (const routerDefinition of routerDefinitions) {
      const { routerDefinition: router } = routerDefinition;
      const { routerExpression, identifier } = router;
      const { routerArguments, routerControllers } = routerExpression;
      const { serverType } = routerArguments;

      switch (serverType) {
        case 'REST.Express':
          throw new Error(`Server ${serverType} not fully implemented`);
        case 'REST.Fastify': {
          let controllersBody = '';
          for (const controller of routerControllers) {
            const { routerController } = controller;
            const {
              httpMethodVerb: method,
              stringLiteral: path,
              RESTControllerIdentifier,
              controllerInstanceName,
              boundedContextModule,
            } = routerController;
            const { boundedContextName, moduleName } = boundedContextModule;
            const { wordsWithSpaces: boundedContext } = boundedContextName;
            const { wordsWithSpaces: module } = moduleName;

            fastifyControllerImports.push(
              `import { ${RESTControllerIdentifier} } from '../../../../../bounded-contexts/${kebabCase(
                boundedContext,
              )}/${kebabCase(module)}/DI${esmEnabled ? '.js' : ''}';`,
            );

            controllersBody += `\n  fastify.${method.toLowerCase()}('${path}', {}, async (request: Fastify.Request, reply: Fastify.Reply) => {`;
            controllersBody += `\n    return ${controllerInstanceName}.execute(request, reply);`;
            controllersBody += '\n  });';
          }

          fastifyRouterDefinitionBody += `const ${identifier} = async (fastify: Fastify.Instance) => {`;
          fastifyRouterDefinitionBody += controllersBody;
          fastifyRouterDefinitionBody += '\n};\n';

          fastifyExports += `${identifier},\n`;

          break;
        }
      }
    }

    const output = [];
    if (fastifyControllerImports.length > 0) {
      let body = `${fastifyImport}\n`;
      body += `${fastifyControllerImports.join('\n')}`;
      body += `${fastifyRouterDefinitionBody}`;
      body += `export {${fastifyExports}};\n`;

      output.push({
        fileId: 'index.ts',
        fileType: 'REST.Fastify.Router',
        content: (license || '') + body,
      });
    }

    return output;
  }

  private registerRouters(
    routers: TRestServerInstanceRouters, //Record<TRouterInstanceName, { routerPrefix: string }>,
    serverType: TServerType,
    license?: string,
  ): TSetupOutput {
    let importType = '';
    let routerInstanceType = '';
    let body = '';
    let imports = '';
    switch (serverType) {
      case 'REST.Express':
        throw new Error(`Server ${serverType} not fully implemented`);
      case 'REST.Fastify':
        {
          importType = "import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';";
          routerInstanceType = 'Fastify.Instance';

          imports = `import { ${routers.map((router) =>
            `${router.serverRoute.identifier},`.slice(0, -1),
          )} } from '../routers/index';`;
          body = `${importType}
${imports}

const routers = async (serverInstance: ${routerInstanceType}, _opts: any) => {
  ${routers.map((router) => {
    const literal: TLiteral = {
      literal: {
        ...router.serverRoute.routerPrefix,
      },
    };
    const routerPrefix = modelToTargetLanguage({
      type: BitloopsTypesMapping.TLiteral,
      value: literal,
    });
    return `serverInstance.register(${router.serverRoute.identifier}, { prefix: '${routerPrefix.output}' });\n`;
  })}};

export { routers };
`;
        }
        break;
      default: {
        throw new Error(`Server ${serverType} not fully implemented`);
      }
    }
    return {
      fileId: 'index.ts',
      fileType: `${serverType}.API`,
      content: (license || '') + body,
    };
  }

  generateAPIs(servers: TRestAndGraphQLServers, license: string): TSetupOutput[] {
    const output = [];
    for (const [serverType, { serverInstances }] of Object.entries(servers)) {
      for (let i = 0; i < serverInstances.length; i++) {
        const serverInstance = serverInstances[i];
        if (!isRestServerInstance(serverInstance)) {
          continue;
        }
        output.push(
          this.registerRouters(
            serverInstance.restServer.serverRoutes,
            serverType as TServerType,
            license,
          ),
        );
      }
    }
    return output;
  }

  generateAppDomainErrors(model: TBoundedContexts): TSetupOutput[] {
    const output = [];
    for (const [boundedContextName, boundedContext] of Object.entries(model)) {
      for (const [moduleName, module] of Object.entries(boundedContext)) {
        const domainErrors = module.getRootChildrenNodesValueByType<TDomainError>(
          BitloopsTypesMapping.TDomainError,
        );
        const applicationErrors = module.getRootChildrenNodesValueByType<TApplicationError>(
          BitloopsTypesMapping.TApplicationError,
        );
        const domainRes = this.handleDomainApplicationError(
          {
            classType: ClassTypes.DomainErrors,
            errorModels: domainErrors,
          },
          boundedContextName,
          moduleName,
        );
        const appRes = this.handleDomainApplicationError(
          {
            classType: ClassTypes.ApplicationError,
            errorModels: applicationErrors,
          },
          boundedContextName,
          moduleName,
        );
        output.push(...domainRes, ...appRes);
      }
    }
    return output;
  }

  private handleDomainApplicationError(
    params:
      | { classType: 'DomainErrors'; errorModels: TDomainError[] } // ClassTypes.DomainErrors || ClassTypes.ApplicationError
      | { classType: 'ApplicationError'; errorModels: TApplicationError[] },
    boundedContextName: string,
    moduleName: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];

    const { classType: classTypeName, errorModels } = params;
    let imports = '';
    let content = `export namespace ${classTypeName} {`;

    const filePathObj = getTargetFileDestination(
      boundedContextName,
      moduleName,
      classTypeName,
      classTypeName,
    );

    for (const errorModel of errorModels) {
      const className = this.getErrorName(errorModel, classTypeName);
      const classNameWithoutError = className.split('Error')[0];
      imports += `import { ${className} as ${classNameWithoutError} } from './${className}';`;
      content += `export class ${className} extends ${classNameWithoutError} {}`;
    }
    content += '}';
    const finalContent = imports + content;
    result.push({
      fileType: classTypeName,
      fileId: `${filePathObj.path}/index.ts`,
      content: finalContent,
    });

    return result;
  }

  // Get Error name Depending on the classType
  private getErrorName(
    errorModel: TDomainError | TApplicationError,
    classTypeName: 'DomainErrors' | 'ApplicationError',
  ): string {
    if (classTypeName === 'DomainErrors') {
      const error = errorModel[DomainErrorKey] as TDomainErrorValue;
      return error[DomainErrorIdentifier];
    } else {
      const error = errorModel[ApplicationErrorKey] as TApplicationErrorValue;
      return error[ApplicationErrorIdentifier];
    }
  }

  generateRules(model: TBoundedContexts): TSetupOutput[] {
    const output = [];
    for (const [boundedContextName, boundedContext] of Object.entries(model)) {
      for (const [moduleName, module] of Object.entries(boundedContext)) {
        // Gather all domain rules of the module
        const domainRules = module.getRootChildrenNodesValueByType<TDomainRule>(
          BitloopsTypesMapping.TDomainRule,
        );

        const classTypeName = ClassTypes.DomainRule;
        let imports = '';
        let content = `export namespace ${classTypeName} {`;
        const filePathObj = getTargetFileDestination(
          boundedContextName,
          moduleName,
          classTypeName,
          classTypeName,
        );

        for (const domainRule of domainRules) {
          const className = domainRule.DomainRule.domainRuleIdentifier;
          const classNameWithoutRule = className.split('Rule')[0];
          imports += `import { ${className} as ${classNameWithoutRule} } from './${className}';`;
          content += `export class ${className} extends ${classNameWithoutRule} {}`;
        }
        content += '}';
        const finalContent = imports + content;
        output.push({
          fileType: classTypeName,
          fileId: `${filePathObj.path}/index.ts`,
          content: finalContent,
        });
      }
    }
    return output;
  }

  private generateServer(params: GenerateServerParams): TSetupOutput {
    const { serverInstance: data, serverType, bitloopsModel, serverIndex, license } = params;
    // TODO handle CORS
    // let serverPath = '';
    let serverPrefix: string = null;
    let portStatement: string = null;
    if (isRestServer(data)) {
      const evaluationList = data.restServer.serverOptions;
      // TODO Check if enum for server options exist
      const apiPrefixExpr = NodeValueHelpers.findKeyOfEvaluationFieldList(
        evaluationList,
        RestServerOptions.apiPrefix,
      );
      const apiPrefixOutput = modelToTargetLanguage({
        type: BitloopsTypesMapping.TExpression,
        value: apiPrefixExpr,
      });

      serverPrefix = apiPrefixOutput.output;

      const portExpression = NodeValueHelpers.findKeyOfEvaluationFieldList(
        evaluationList,
        RestServerOptions.port,
      );
      portStatement = modelToTargetLanguage({
        type: BitloopsTypesMapping.TExpression,
        value: portExpression,
      }).output;
    }

    let body = '';
    switch (serverType as TServerType) {
      case 'REST.Express':
        throw new Error(`Server ${serverType} not fully implemented`);
      case 'REST.Fastify': {
        // serverPath = 'rest/fastify';
        const dependencies = RestFastifyGenerator.getDependencies();
        for (const [key, value] of Object.entries(dependencies)) {
          this.nodeDependencies[key] = value;
        }
        body = RestFastifyGenerator.getServerFile(serverPrefix, portStatement);
        break;
      }
      case 'GraphQL': {
        // serverPath = 'graphql';
        if (!isGraphQLServerInstance(data)) {
          throw new Error(
            'Server instance must be of type GraphQLServerInstance for server type GraphQL',
          );
        }
        body += "import { GraphQL } from '@bitloops/bl-boilerplate-infra-graphql';\n";
        body += this.generateGraphQLServer(data, bitloopsModel, portStatement);
        break;
      }
      default:
        throw new Error(`Server ${serverType} not supported`);
    }
    return {
      fileId: `app${serverIndex}.ts`,
      fileType: `${serverType}.Server`,
      content: (license || '') + body,
    };
  }
  generateServers(
    servers: TRestAndGraphQLServers,
    bitloopsModel: TBoundedContexts,
  ): TSetupOutput[] {
    const output = [];
    for (const [serverType, { serverInstances }] of Object.entries(servers)) {
      for (let i = 0; i < serverInstances.length; i++) {
        const serverInstance = serverInstances[i];
        const args = {
          serverInstance,
          serverType: serverType as TServerType,
          serverIndex: i,
          bitloopsModel,
        };
        const serverResult = this.generateServer(args);

        output.push(serverResult);
      }
    }
    return output;
  }
  generateStartupFile(
    servers: TRestAndGraphQLServers,
    reposData: TRepoConnectionDefinition[],
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput {
    const imports = [];
    for (const serverType of Object.keys(servers)) {
      for (let i = 0; i < servers[serverType].serverInstances.length; i++) {
        const filePath = `${setupTypeMapper[`${serverType}.Server`]}app${i}${
          esmEnabled ? '.js' : ''
        }`;
        imports.push(`await import('..${path.normalize(filePath)}${esmEnabled ? '.js' : ''}');`);
      }
    }
    const dbConnections = this.setupTypeScriptRepos.getStartupImports(reposData, setupTypeMapper);
    imports.push(...dbConnections);
    // TODO check if map here is needed
    const body = `(async () => {
  ${imports.map((i) => i).join('\n  ')}
})();
`;
    return {
      fileId: 'index.ts',
      fileType: 'startup',
      content: (license || '') + body,
    };
  }

  /**
   * Needs to find the graphQL Controllers inside bitloopsModel,
   *  Like a middleware, transforms
   * graphql data into the expected schema
   * and calls the graphQLSetupDataToTargetLanguage function
   */
  private generateGraphQLServer(
    data: TGraphQLServerInstance,
    bitloopsModel: TBoundedContexts,
    portStatement: string,
  ): string {
    const resolvers = data[GraphQLServerInstanceKey][ControllerResolversKey];
    const serverName = 'server';
    this.nodeDependencies['@bitloops/bl-boilerplate-infra-graphql'] = '^0.0.4';
    const graphQLSetupData: TGraphQLSetupData = {
      servers: [{ type: 'GraphQL', port: portStatement, name: serverName }],
      resolvers: [],
      addResolversToServer: [],
      bitloopsModel,
    };

    let importsString = '';
    for (const resolver of resolvers) {
      const resolverDef = resolver[ControllerResolverKey];
      const controllerClassName = resolverDef.graphQLControllerIdentifier;
      const controllerInstance = resolverDef.controllerInstanceName;
      const boundedContext = resolverDef.boundedContextModule.boundedContextName.wordsWithSpaces;
      const module = resolverDef.boundedContextModule.moduleName.wordsWithSpaces;

      importsString += `import { ${controllerInstance} } from '../../../bounded-contexts/${kebabCase(
        boundedContext,
      )}/${kebabCase(module)}/DI${esmEnabled ? '.js' : ''}';\n`;

      // const dtos = bitloopsModel[boundedContext][module].DTOs;
      // TODO Check what happens here for same name DTOs from different modules/bounded contexts
      // and fix conflict / change model perhaps

      const bitloopsModelTree = bitloopsModel[boundedContext][module];
      const graphQLControllers = bitloopsModelTree.getRootChildrenNodesByType(
        BitloopsTypesMapping.TGraphQLController,
      ) as GraphQLControllerNode[];
      const controller = graphQLControllers.find(
        (graphQLController) => graphQLController.getName() === controllerClassName,
      );

      // const controller = bitloopsModel[boundedContext][module]['Controllers'][controllerClassName];
      if (!controller) {
        throw new Error(
          `Controller ${controllerClassName} not found in bounded context ${boundedContext} module ${module}`,
        );
      }
      // if (!isGraphQLController(controller)) {
      //   throw new Error(
      //     `Controller ${controllerClassName} in bounded context ${boundedContext} module ${module} is not a GraphQL controller`,
      //   );
      // }
      const controllerValue: TGraphQLController = controller.getValue();
      const { operationType, operationName, inputType } = controllerValue.GraphQLController;
      const outputType = controllerValue.GraphQLController.execute.returnType;
      const constructedResolver = {
        boundedContext,
        module,
        operationType,
        operationName,
        input: inputType,
        output: outputType,
        controller: controllerInstance,
      };
      graphQLSetupData.resolvers.push(constructedResolver);
      graphQLSetupData.addResolversToServer.push({
        serverName,
        resolver: {
          name: operationName,
          boundedContext,
          module,
        },
      });
    }
    // setupData.bitloopsModel = bitloopsModel;
    // TODO Prettier this string
    const serverContent = graphQLSetupDataToTargetLanguage(graphQLSetupData);
    return formatToLang(importsString + serverContent.output, SupportedLanguages.TypeScript);
  }
}
