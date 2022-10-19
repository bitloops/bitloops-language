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
import {
  controllerDefinitionIsRest,
  isGraphQLController,
  isGraphQLServerInstance,
  isRestServerInstance,
} from '../../../helpers/typeGuards.js';
import {
  ISetupData,
  TControllers,
  TMethodAndPath,
  TRouterInstanceName,
  TRoutersInfo,
  TServerType,
  TSetupInfo,
  TBoundedContexts,
  TGraphQLServerInstance,
  TGraphQLSetupData,
  TPackagesMapping,
  TPackagesSetup,
  TUseCasesOfModule,
  TControllerOfModule,
  TReposSetup,
} from '../../../types.js';
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

type PackageAdapterName = string;
type PackageAdapterContent = string;
type TPackageAdaptersContent = Record<PackageAdapterName, PackageAdapterContent>;
type TPackageVersions = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

interface ISetup {
  generateStartupFile(
    data: TSetupInfo,
    reposData: TReposSetup,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput;
  generateAPIs(data: TSetupInfo): TSetupOutput[];
  generateServerRouters(data: ISetupData, _bitloopsModel: TBoundedContexts): TSetupOutput[];
  generateServers(data: TSetupInfo, bitloopsModel: TBoundedContexts): TSetupOutput[];
  generateDIs(
    data: ISetupData,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[];
  generateRepoConnections(setupData: ISetupData): TSetupOutput[];
  // generateControllerDIs(data: ISetupData, bitloopsModel: TBoundedContexts): TSetupOutput[];
  // generateUseCaseDIs(data: ISetupData, bitloopsModel: TBoundedContexts): TSetupOutput[];
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
  '@bitloops/bl-boilerplate-core': '^0.0.3',
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
  generateRepoConnections(setupData: ISetupData): TSetupOutput[] {
    const repoDependencies = this.setupTypeScriptRepos.getPackageJSONDependencies(setupData.repos);
    this.nodeDependencies = { ...this.nodeDependencies, ...repoDependencies };
    return this.setupTypeScriptRepos.generateRepoConnections(setupData);
  }

  getNodeDependencies(): TNodePackages {
    return this.nodeDependencies;
  }

  getNodeDevDependencies(): TNodePackages {
    return this.nodeDevDependencies;
  }

  generateDIs(
    data: ISetupData,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[] {
    const { controllers, useCases, repos } = data;
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl
    // TODO Add support for other types of DIs such as repositories, etc.

    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const moduleName of Object.keys(boundedContext)) {
        // console.log('module', module);
        const diFileName = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/DI.ts`;
        let diContent = '';
        // Gather all imports
        if (repos) {
          diContent += this.setupTypeScriptRepos.generateRepoDIImports(
            data.repos,
            boundedContextName,
            moduleName,
            setupTypeMapper,
          );
        }

        if (useCases)
          diContent += this.generateDIUseCaseImports(useCases[boundedContextName][moduleName]);

        if (controllers)
          diContent += this.generateDIControllersImports(
            controllers[boundedContextName][moduleName],
          );

        diContent += '\n';
        if (repos) {
          diContent += this.setupTypeScriptRepos.generateRepoDIAdapters(
            data.repos,
            boundedContextName,
            moduleName,
          );
        }

        if (useCases)
          diContent += this.generateUseCasesDIs(useCases[boundedContextName][moduleName]);

        if (controllers)
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

  private generateDIUseCaseImports(useCases: TUseCasesOfModule): string {
    let result = '';
    for (const useCaseName of Object.keys(useCases)) {
      // console.log('useCase', useCase);
      // Gather all use case imports
      const { path, filename } = getFilePathRelativeToModule(ClassTypes.UseCases, useCaseName);
      result += `import { ${useCaseName} } from './${path}${filename}${
        esmEnabled ? '.js' : ''
      }';\n`;
    }
    return result;
  }

  private generateDIControllersImports(controllers: TControllerOfModule): string {
    let result = '';
    for (const controllerName of Object.keys(controllers)) {
      const { path, filename } = getFilePathRelativeToModule(
        ClassTypes.Controllers,
        controllerName,
      );
      result += `import { ${controllerName} } from './${path}${filename}${
        esmEnabled ? '.js' : ''
      }';\n`;
    }
    return result;
  }
  private generateUseCasesDIs(useCases: TUseCasesOfModule): string {
    let result = '';
    for (const [useCaseName, useCase] of Object.entries(useCases)) {
      for (const instance of useCase.instances) {
        const { instanceName, dependencies } = instance;
        result += `const ${instanceName} = new ${useCaseName}(${dependencies.join(', ')});\n`;
      }
    }
    return result;
  }

  private generateControllerDIsAndExports(controllers: TControllerOfModule): string {
    let controllerDIContent = '';
    let exportsString = '';
    for (const [controllerName, controller] of Object.entries(controllers)) {
      for (const instance of controller.instances) {
        const controllerInstanceName = instance.controllerInstance;

        const dependencies = instance.dependencies;

        const dependenciesString = dependencies.join(', '); //'';
        controllerDIContent += `const ${controllerInstanceName} = new ${controllerName}(${dependenciesString});\n`;
        exportsString += `export { ${controllerInstanceName} };\n`;
      }
    }
    return controllerDIContent + '\n' + exportsString;
  }

  // generateUseCaseDIs(data: ISetupData, _bitloopsModel: TBoundedContexts): TSetupOutput[] {
  //   const { useCases } = data;
  //   const result: Record<string, { content: string; name: string; useCaseName: string }[]> = {};

  //   for (const [boundedContextName, boundedContext] of Object.entries(useCases)) {
  //     for (const [moduleName, module] of Object.entries(boundedContext)) {
  //       for (const [useCaseName, useCase] of Object.entries(module)) {
  //         // instanceName: string;
  //         // dependencies: string[]; // Replace with correct type
  //         const { instanceName, dependencies } = useCase;
  //         const useCaseInstanceFilePath = `./src/bounded-contexts/${kebabCase(
  //           boundedContextName,
  //         )}/${kebabCase(moduleName)}/use-cases/${kebabCase(useCaseName)}/DI.ts`;

  //         let useCaseDIContent = '';
  //         if (dependencies.length > 0) {
  //           // TODO fix issue with dependencies
  //           // const useCaseDependency = dependencies[0];
  //           // controllerDIContent = `const ${useCaseDependency} = new ${useCase}UseCase();\n`;
  //         }
  //         useCaseDIContent += `const ${instanceName} = new ${useCaseName}();\n`;

  //         if (!result[useCaseInstanceFilePath]) {
  //           result[useCaseInstanceFilePath] = [];
  //         }
  //         result[useCaseInstanceFilePath].push({
  //           content: useCaseDIContent,
  //           name: instanceName,
  //           useCaseName,
  //         });
  //       }
  //     }
  //   }
  //   const filePathsAndContents: TSetupOutput[] = [];
  //   // On Every Controller DI file, we need for sure to import The local controller instance
  //   // and perhaps the local useCase if it is defined as a needed dependency
  //   for (const [filePath, useCaseDIs] of Object.entries(result)) {
  //     const useCaseDIExports = useCaseDIs.map(({ name }) => name).join(', ');
  //     const useCaseDIContent = useCaseDIs.map(({ content }) => content).join('\n');
  //     // const useCaseName = controllerName.slice(0, -controllerSuffixLength) + 'UseCase';
  //     // Remove duplicates
  //     const useCasesInDI = new Set(useCaseDIs.map(({ useCaseName }) => useCaseName));
  //     const importsString = Array.from(useCasesInDI)
  //       .map((useCaseName) => `import { ${useCaseName} } from './${useCaseName}';`)
  //       .join('\n');
  //     // const importString = `\nimport { ${controllerName} } from './${controllerName}';\n\n`; //+
  //     // `import { ${useCaseName} } from './${useCaseName}';\n\n`;
  //     const content =
  //       LICENSE +
  //       '\n' +
  //       importsString +
  //       '\n\n' +
  //       useCaseDIContent +
  //       `\nexport { ${useCaseDIExports} };\n`;
  //     filePathsAndContents.push({ filePath, content });
  //   }
  //   return filePathsAndContents;
  // }

  private findPackageAdapterFileContent(
    packages: TPackagesMapping,
    sourceDirPath: string,
  ): TPackageAdaptersContent {
    const res = {};

    for (const [, packageAdapter] of Object.entries(packages)) {
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
      const contents = readFromFile(foundFilepath);

      res[packageAdapter] = contents;
    }
    return res;
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
    packages: TPackagesSetup,
    sourceDirPath: string,
    _setupTypeMapper: Record<string, string>,
    packageVersions?: TPackageVersions,
  ): TSetupOutput[] {
    const results: TSetupOutput[] = [];
    if (packages) {
      for (const [boundedContext, modules] of Object.entries(packages)) {
        for (const [module, modulePackages] of Object.entries(modules)) {
          const adaptersContent = this.findPackageAdapterFileContent(
            packages[boundedContext][module],
            `${sourceDirPath}/${boundedContext}/${module}`,
          );
          for (const packageAdapter of Object.values(modulePackages)) {
            const adapterFilePathObj = getTargetFileDestination(
              boundedContext,
              module,
              'Package',
              packageAdapter,
              'TypeScript',
            );
            const adapterContent = adaptersContent[packageAdapter];
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
        }
      }
    }
    return results;
  }

  private generateRouters(
    routesData: TRoutersInfo,
    serverType: TServerType,
    controllers: TControllers,
    _bitloopsModel: TBoundedContexts,
    license?: string,
  ): TSetupOutput {
    let imports = '';
    // let serverPath = '';
    let body = '';
    let routes = '';
    let exports = '';
    const controllerImports: string[] = [];
    switch (serverType) {
      case 'REST.Express':
        // serverPath = 'rest/express';
        throw new Error(`Server ${serverType} not fully implemented`);
      case 'REST.Fastify':
        // serverPath = 'rest/fastify';
        imports = "import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';";
        routes = Object.keys(routesData)
          .map((routerInstanceName) => {
            const methodURLMap = routesData[routerInstanceName as TRouterInstanceName].methodURLMap;
            let routerDefinition = `const ${routerInstanceName} = async (fastify: Fastify.Instance) => {`;
            Object.keys(methodURLMap).map((methodAndPath: TMethodAndPath) => {
              const [method, path] = methodAndPath.split(' ');
              const { boundedContext, controllerClass, module } = methodURLMap[methodAndPath];
              const controllerInstances = controllers[boundedContext][module][controllerClass];
              if (!controllerDefinitionIsRest(controllerInstances)) {
                throw new Error(
                  `Controller ${controllerClass} is not a REST controller, it cannot be used in a REST server`,
                );
              }
              let controllerInstanceName = '';
              for (const controllerInstance of controllerInstances.instances) {
                if (controllerInstance.url === path) {
                  controllerInstanceName = controllerInstance.controllerInstance;
                  controllerImports.push(
                    `import { ${controllerInstanceName} } from '../../../../../bounded-contexts/${kebabCase(
                      boundedContext,
                    )}/${kebabCase(module)}/DI${esmEnabled ? '.js' : ''}';`,
                  );
                }
              }
              routerDefinition += `\n  fastify.${method.toLowerCase()}('${path}', {}, async (request: Fastify.Request, reply: Fastify.Reply) => {`;
              routerDefinition += `\n    return ${controllerInstanceName}.execute(request, reply);`;
              routerDefinition += '\n  });';
            });
            routerDefinition += '\n};\n';
            return routerDefinition;
          })
          .join('');
        exports =
          Object.keys(routesData).length > 2
            ? `${Object.keys(routesData).map((routerInstanceName) => `  ${routerInstanceName},\n`)}`
            : `${Object.keys(routesData).map(
                (routerInstanceName) => ` ${routerInstanceName},`,
              )}`.slice(0, -1) + ' ';
        body = `${imports}
${controllerImports.join('\n')}

${routes}
export {${exports}};\n`;
        break;
    }
    return {
      fileId: 'index.ts',
      fileType: `${serverType}.Router`,
      content: (license || '') + body,
    };
  }
  generateServerRouters(
    data: ISetupData,
    bitloopsModel: TBoundedContexts,
    license?: string,
  ): TSetupOutput[] {
    const routers = data.setup.routers;
    const output = [];
    for (const serverType of Object.keys(routers)) {
      // for (const routerInstanceName of Object.keys(routers[serverType])) {
      //   const serverInstanceRouters = routers[serverType][routerInstanceName];
      output.push(
        this.generateRouters(
          routers[serverType],
          serverType as TServerType,
          data.controllers,
          bitloopsModel,
          license,
        ),
      );
      // }
    }
    return output;
  }
  private registerRouters(
    routers: Record<TRouterInstanceName, { routerPrefix: string }>,
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
        importType = "import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';";
        routerInstanceType = 'Fastify.Instance';
        // for (const routerInstanceName in routers) {
        //   const routerPrefix = routers[routerInstanceName].routerPrefix;
        // }
        imports =
          Object.keys(routers).length > 2
            ? `import {
          ${Object.keys(routers).map(
            (routerInstanceName) => `${routerInstanceName},\n`,
          )}  } from '../routers/index';`
            : `import { ${Object.keys(routers).map((routerInstanceName) =>
                `${routerInstanceName},`.slice(0, -1),
              )} } from '../routers/index';`;
        body = `${importType}
${imports}

const routers = async (serverInstance: ${routerInstanceType}, _opts: any) => {
  ${Object.keys(routers).map(
    (routerInstanceName) =>
      `serverInstance.register(${routerInstanceName}, { prefix: '${routers[routerInstanceName].routerPrefix}' });\n`,
  )}};

export { routers };
`;
    }
    return {
      fileId: 'index.ts',
      fileType: `${serverType}.API`,
      content: (license || '') + body,
    };
  }
  generateAPIs(data: TSetupInfo): TSetupOutput[] {
    const servers = data.servers;
    const output = [];
    for (const serverType of Object.keys(servers)) {
      for (let i = 0; i < servers[serverType].serverInstances.length; i++) {
        const serverInstance = servers[serverType].serverInstances[i];
        output.push(this.registerRouters(serverInstance.routers, serverType as TServerType));
      }
    }
    return output;
  }

  private generateServer(params: GenerateServerParams): TSetupOutput {
    const { serverInstance: data, serverType, bitloopsModel, serverIndex, license } = params;
    // TODO handle CORS
    // let serverPath = '';
    const serverPrefix = isRestServerInstance(data) ? `'${data.apiPrefix || '/'}'` : null;
    // TODO handle special env-variable Expression, and env-variable (like identifier-variable)
    const portStatement = modelToTargetLanguage({
      type: BitloopsTypesMapping.TSingleExpression,
      value: data.port,
    });
    // const portStatement = data.port.replaceAll('env.', 'process.env.');
    let body = '';
    switch (serverType as TServerType) {
      case 'REST.Express':
        // serverPath = 'rest/express';
        // this.nodeDependencies['express'] = '^4.18.1';
        // this.nodeDevDependencies['@types/express'] = '^4.17.14';
        throw new Error(`Server ${serverType} not fully implemented`);
      case 'REST.Fastify': {
        // serverPath = 'rest/fastify';
        this.nodeDependencies['@bitloops/bl-boilerplate-infra-rest-fastify'] = '^0.0.2';
        body = `import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { routers } from './api';

const corsOptions = {
  origin: '*',
};

const fastify = Fastify.Server({
  logger: true,
});
fastify.register(Fastify.cors, corsOptions);
fastify.register(Fastify.formBody);
fastify.register(routers, {
  prefix: ${serverPrefix},
});

const port = ${portStatement};

const start = async () => {
  try {
    await fastify.listen({ port: +port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
`;
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
  generateServers(data: TSetupInfo, _bitloopsModel: TBoundedContexts): TSetupOutput[] {
    const servers = data.servers;
    const output = [];
    for (const serverType of Object.keys(servers)) {
      for (let i = 0; i < servers[serverType].serverInstances.length; i++) {
        const serverInstance = servers[serverType].serverInstances[i];
        const args = {
          serverInstance,
          serverType: serverType as TServerType,
          serverIndex: i,
          bitloopsModel: _bitloopsModel,
        };
        output.push(this.generateServer(args));
      }
    }
    return output;
  }
  generateStartupFile(
    data: TSetupInfo,
    reposData: TReposSetup,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput {
    const imports = [];
    const servers = data.servers;
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
   *  Like a middleware, transforms
   * graphql data into the expected schema
   * and calls the graphQLSetupDataToTargetLanguage function
   */
  private generateGraphQLServer(
    data: TGraphQLServerInstance,
    bitloopsModel: TBoundedContexts,
    portStatement: string,
  ): string {
    const { resolvers } = data;
    const serverName = 'server';
    this.nodeDependencies['@bitloops/bl-boilerplate-infra-graphql'] = '^0.0.1';
    const setupData: TGraphQLSetupData = {
      servers: [{ type: 'GraphQL', port: portStatement, name: serverName }],
      resolvers: [],
      addResolversToServer: [],
      // DTOs: {},
      bitloopsModel,
    };

    let importsString = '';
    // const dtosOfBoundedCtxAndModules = {};
    for (const resolver of resolvers) {
      const {
        boundedContext,
        module,
        controllerClassName,
        dependencies: _dependencies,
        controllerInstance,
      } = resolver;
      // const useCase = kebabCase(
      //   bitloopsModel[boundedContext][module]['Controllers'][controllerClassName].useCase,
      // );

      importsString += `import { ${controllerInstance} } from '../../../bounded-contexts/${kebabCase(
        boundedContext,
      )}/${kebabCase(module)}/DI${esmEnabled ? '.js' : ''}';\n`;

      // const dtos = bitloopsModel[boundedContext][module].DTOs;
      // TODO Check what happens here for same name DTOs from different modules/bounded contexts
      // and fix conflict / change model perhaps

      const controller = bitloopsModel[boundedContext][module]['Controllers'][controllerClassName];
      if (!controller) {
        throw new Error(
          `Controller ${controllerClassName} not found in bounded context ${boundedContext} module ${module}`,
        );
      }
      if (!isGraphQLController(controller)) {
        throw new Error(
          `Controller ${controllerClassName} in bounded context ${boundedContext} module ${module} is not a GraphQL controller`,
        );
      }
      const { operationType, operationName, inputType, outputType } = controller;
      const constructedResolver = {
        boundedContext,
        module,
        operationType,
        operationName,
        input: inputType,
        output: outputType,
        controller: controllerInstance,
      };
      setupData.resolvers.push(constructedResolver);
      setupData.addResolversToServer.push({
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
    const serverContent = graphQLSetupDataToTargetLanguage(
      setupData,
      SupportedLanguages.TypeScript,
    );
    return formatToLang(importsString + serverContent, SupportedLanguages.TypeScript);
  }
}
