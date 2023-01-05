import prettier from 'prettier';
import path from 'path';
import { packageJSONTemplate } from './package-template.js';
import { SetupTypeScript } from './SetupTypeScript.js';
import { tsConfigJSONTemplate } from './tsconfig-template.js';
import { nodemonJSONTemplate } from './nodemon-template.js';
import { TargetSetupGeneratorError, TTargetSetupContent } from '../../types.js';
import { IntermediateAST } from '../../../ast/core/types.js';
import { TTranspileOptions } from '../../../transpilerTypes.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import {
  TPackageConcretion,
  TRepoConnectionDefinition,
  TRouterDefinition,
} from '../../../types.js';

export type TSetupOutput = { fileId: string; fileType: string; content: string; context?: any };

const setupMapper = {
  OUTPUT_DB_FOLDER: 'db/',
  OUTPUT_INFRA_FOLDER: 'infra/',
  OUTPUT_GRAPHQL_FOLDER: 'graphql/',
  OUTPUT_REST_FOLDER: 'rest/',
  OUTPUT_ROUTERS_FOLDER: 'routers/',
  OUTPUT_SHARED_FOLDER: 'src/shared/',
  OUTPUT_SRC_FOLDER: 'src/',
}; // TODO optionally get this from the config

const setupTypeMapper = {
  SRC_FOLDER: `/${setupMapper.OUTPUT_SRC_FOLDER}`,
  BOUNDED_CONTEXTS: 'bounded-contexts',
  startup: `/${setupMapper.OUTPUT_SRC_FOLDER}`,
  DI: '',
  'package.json': '/./',
  Config: '/./',
  'REST.Fastify.Router': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_REST_FOLDER}fastify/routers/`,
  'REST.Fastify.API': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_REST_FOLDER}fastify/api/`,
  'REST.Fastify.Server': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_REST_FOLDER}fastify/`,
  'GraphQL.Server': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}graphql/`,
  'DB.Mongo': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_DB_FOLDER}mongo/`,
  'DB.Mongo.Index': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_DB_FOLDER}mongo/`,
  'DB.Mongo.Config': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_DB_FOLDER}mongo/`,
  DomainErrors: '',
  ApplicationErrors: '',
  Rules: '',
};

const license = `/**
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
`; // TODO get this dynamically from the config file

export const generateSetupFiles = (
  params: IntermediateAST,
  options: TTranspileOptions,
): TTargetSetupContent[] | TargetSetupGeneratorError => {
  //TODO get .value from setup and core tree
  const { setup, core } = params;
  const { sourceDirPath } = options;
  const setupData = setup;
  const _bitloopsModel = core as any;

  const formatterConfig = options.formatterConfig ?? {
    semi: true,
    parser: 'typescript',
    singleQuote: true,
  };

  const result: TTargetSetupContent[] = [];
  for (const [_fileId, setupTree] of Object.entries(setupData)) {
    // console.log('Generating system files...');
    const setupGenerator = new SetupTypeScript();
    const pathsAndContents: TSetupOutput[] = [];

    // Step 1. Generate routes files
    const routerDefinitions = setupTree.getRootChildrenNodesValueByType<TRouterDefinition>(
      BitloopsTypesMapping.TRouterDefinition,
    );
    const routes = setupGenerator.generateServerRouters(routerDefinitions, _bitloopsModel, license);
    // console.log('routes:', routes);
    // console.log('--------------------------------');
    routes.forEach((router) => {
      pathsAndContents.push(router);
    });

    // Step 2. Generate routers files
    const routers = setupGenerator.generateAPIs(setupData.setup);
    // console.log('routers:', routers);
    // console.log('--------------------------------');
    routers.forEach((router) => {
      pathsAndContents.push(router);
    });

    // Step 3. Generate DIs
    const controllerDIs = setupGenerator.generateDIs(
      setupData,
      _bitloopsModel,
      setupTypeMapper,
      license,
    );
    // console.log('controllerDIs:', controllerDIs);
    // console.log('--------------------------------');
    controllerDIs.forEach((controllerDI) => {
      pathsAndContents.push(controllerDI);
    });

    // Step 4. Setup server file
    const serverSetup = setupGenerator.generateServers(setupData.servers, _bitloopsModel);
    // console.log('serverSetup:', serverSetup);
    // console.log('--------------------------------');
    serverSetup.forEach((server) => {
      pathsAndContents.push(server);
    });

    // Step 5. Startup File
    const startupFile = setupGenerator.generateStartupFile(
      setupData.servers,
      setupData.repos,
      setupTypeMapper,
      license,
    );
    // console.log('startupFile:', startupFile);
    // console.log('--------------------------------');
    pathsAndContents.push(startupFile);

    // Step 6. Package files

    const packageDefinitions = setupTree.getRootChildrenNodesValueByType<TPackageConcretion>(
      BitloopsTypesMapping.TPackageConcretion,
    );
    const packageFiles = setupGenerator.generatePackageFiles(
      packageDefinitions,
      sourceDirPath,
      setupTypeMapper,
    );
    packageFiles.forEach((packageFile) => {
      pathsAndContents.push(packageFile);
    });

    // Step 7. Generate repo connections
    const repoConnectionDefinitions =
      setupTree.getRootChildrenNodesValueByType<TRepoConnectionDefinition>(
        BitloopsTypesMapping.TRepoConnectionDefinition,
      );
    const repoConnections = setupGenerator.generateRepoConnections(repoConnectionDefinitions);
    repoConnections.forEach((repoConnection) => {
      pathsAndContents.push(repoConnection);
    });

    // Step 8. Generate domain and application errors
    const appDomainErrors = setupGenerator.generateAppDomainErrors(core);
    appDomainErrors.forEach((appDomainError) => {
      // console.log('appDomainError:', appDomainError);
      pathsAndContents.push(appDomainError);
    });

    // Step 9. Generate rules
    const rules = setupGenerator.generateRules(core);
    rules.forEach((rule) => {
      // console.log('rule:', rule);
      pathsAndContents.push(rule);
    });

    // Step 10. Write files
    pathsAndContents.forEach((pathAndContent) => {
      const { fileType, content, fileId } = pathAndContent;
      result.push({
        fileId: path.normalize(`./${setupTypeMapper[fileType]}${fileId}`),
        fileType: fileType,
        fileContent: prettier.format(content, formatterConfig),
      });
    });

    // Step 11. Write package.json
    // TODO add project name and other info through setupData config.set(XXX, YYY)
    // const packageJSONFilePath = `${outputDirPath}/package.json`;
    const packageJSON = {
      ...packageJSONTemplate,
      dependencies: setupGenerator.getNodeDependencies(),
      devDependencies: setupGenerator.getNodeDevDependencies(),
    };
    result.push({
      fileId: 'package.json',
      fileType: 'Config',
      fileContent: prettier.format(JSON.stringify(packageJSON), { parser: 'json' }),
    });
    result.push({
      fileId: 'tsconfig.json',
      fileType: 'Config',
      fileContent: prettier.format(JSON.stringify(tsConfigJSONTemplate), {
        parser: 'json',
      }),
    });
    result.push({
      fileId: 'nodemon.json',
      fileType: 'Config',
      fileContent: prettier.format(JSON.stringify(nodemonJSONTemplate), {
        parser: 'json',
      }),
    });
  }

  return result;
};
