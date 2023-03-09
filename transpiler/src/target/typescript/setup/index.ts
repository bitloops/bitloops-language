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
import prettier from 'prettier';
import path from 'path';
import { packageJSONTemplate } from './package-template.js';
import { SetupTypeScript } from './SetupTypeScript.js';
import { tsConfigJSONTemplate } from './tsconfig-template.js';
import { nodemonJSONTemplate } from './nodemon-template.js';
import {
  IIntermediateSetupASTToTarget,
  TargetSetupGeneratorError,
  TTargetSetupContent,
} from '../../types.js';
import { IntermediateAST } from '../../../ast/core/types.js';
import { TTranspileOptions } from '../../../transpilerTypes.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import {
  TConfigBusesInvocation,
  TPackageConcretion,
  TRepoConnectionDefinition,
  TRouterDefinition,
} from '../../../types.js';
import { groupServers } from './servers/index.js';
import { DependencyInjectionsGenerator } from './dependency-injections/diHandler.js';
import { TSetupElementsPerModule } from './definitions.js';
import { groupSetupElementsPerModule } from './helpers.js';
import { SubscriptionsHandler } from './subscriptions/subscriptionsHandler.js';
import { setupTypeMapper, TSetupFileType } from './fileDestinations.js';

export type TSetupOutput = {
  fileId: string;
  fileType: TSetupFileType;
  content: string;
  context?: any;
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

export class IntermediateSetupASTToTarget implements IIntermediateSetupASTToTarget {
  generateSetupFiles = (
    params: IntermediateAST,
    options: TTranspileOptions,
  ): TTargetSetupContent[] | TargetSetupGeneratorError => {
    const { setup, core } = params;
    const { sourceDirPath } = options;
    const setupData = setup;
    const bitloopsModel = core;

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

      const allServers = groupServers(setupTree);
      const repoConnectionDefinitions =
        setupTree.getRootChildrenNodesValueByType<TRepoConnectionDefinition>(
          BitloopsTypesMapping.TRepoConnectionDefinition,
        );

      const routerDefinitions = setupTree.getRootChildrenNodesValueByType<TRouterDefinition>(
        BitloopsTypesMapping.TRouterDefinition,
      );
      const elementsPerModule: TSetupElementsPerModule = groupSetupElementsPerModule(setupTree);
      const eventBusConfig = setupTree.getRootChildrenNodesValueByType<TConfigBusesInvocation>(
        BitloopsTypesMapping.TConfigBusesInvocationNode,
      )?.[0];

      // Step 1. Generate routes files
      const routes = setupGenerator.generateServerRouters(routerDefinitions, license);
      // console.log('routes:', routes);
      // console.log('--------------------------------');
      routes.forEach((router) => {
        pathsAndContents.push(router);
      });

      // Step 2. Generate routers files
      const routers = setupGenerator.generateAPIs(allServers, license);
      // console.log('routers:', routers);
      // console.log('--------------------------------');
      routers.forEach((router) => {
        pathsAndContents.push(router);
      });

      // Step 3. Generate DIs

      const diGenerator = new DependencyInjectionsGenerator();
      const DIs = diGenerator.generateDIs(
        elementsPerModule,
        bitloopsModel,
        setupTypeMapper,
        license,
      );
      pathsAndContents.push(...DIs);
      // console.log('--------------------------------');

      // Step 4. Setup server file
      const serverSetup = setupGenerator.generateServers(allServers, bitloopsModel);
      // console.log('serverSetup:', serverSetup);
      // console.log('--------------------------------');
      serverSetup.forEach((server) => {
        pathsAndContents.push(server);
      });

      // Step 5. Startup File
      const startupFile = setupGenerator.generateStartupFile(
        bitloopsModel,
        elementsPerModule,
        allServers,
        repoConnectionDefinitions,
        eventBusConfig ?? null,
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

      // Step 10. Generate AppConfig(Buses)
      const appConfig = setupGenerator.generateAppConfigFile(eventBusConfig, license);
      if (appConfig !== null) pathsAndContents.push(appConfig);

      // Step 11. Generate subscriptions
      const subscriptionsHandler = new SubscriptionsHandler();
      const subscriptions = subscriptionsHandler.generateSubscriptions(
        elementsPerModule,
        bitloopsModel,
        setupTypeMapper,
        license,
      );
      pathsAndContents.push(...subscriptions);

      // Step 12. Write files
      pathsAndContents.forEach((pathAndContent) => {
        const { fileType, content, fileId } = pathAndContent;
        if (setupTypeMapper[fileType] === undefined)
          throw new Error(`File type ${fileType} not supported!`);
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
}
