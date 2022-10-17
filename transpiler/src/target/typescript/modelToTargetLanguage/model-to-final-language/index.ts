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
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
// import { appData } from './testData/helloWorldData.js';
// import { appData } from './testData/dtoData.js';

import { BitloopsTypesMapping, ClassTypes } from '../commons/index.js';
import { kebabCase } from '../../../helpers/caseStyles.js';
import { initializeComponents } from './helpers/index.js';
import {
  firstIteration,
  insertMissingImportsForModule,
  // secondIteration,
} from './helpers/iterations.js';
import { ISetupData, TBoundedContexts } from '../../../types.js';
// import { join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export const controllersMapping = {
  'REST.Fastify': 'BaseFastifyController',
  'REST.Express': 'ExpressController',
};
// Get this through __dirname or whatever
// const projectPath = `${__dirname}/../../../../output`;

/**
 * Steps
 * 1. Initialize components and missingComponents for each boundedContext and module (kebab names)
 * 2. Kebab boundedContextName and moduleName
 *
 * 3. According to component type make additional operation (extends for component)
 * e.g. framework mapping for controllers based on setup
 *
 * For each bounded context and module
 * Chain for each component
 * 1. Model to target language -> @returns string
 * 2. According to component type make additional operation
 * e.g. extends for component will take mapping as argument
 * 3. Get file path
 * 4. Write generated language to file
 * 5. Find missing imports and update components and missingComponents
 * 6. Write missing importsString to component file
 */
const modelToFinalLanguage = (
  appData: TBoundedContexts,
  projectPath: string,
  context: { boundedContext: string; module: string },
  setupData: ISetupData,
): void => {
  const { components } = initializeComponents(appData, projectPath);
  const boundedContextKeysToClassTypeMapping = {
    Controllers: ClassTypes.Controller,
    UseCases: ClassTypes.UseCase,
    ValueObjects: ClassTypes.ValueObject,
    Props: ClassTypes.Props,
    DomainErrors: ClassTypes.DomainError,
    DTOs: ClassTypes.DTO,
    Packages: ClassTypes.Package,
    RepoPorts: ClassTypes.RepoPort,
    RepoAdapters: ClassTypes.RepoAdapter,
  };
  for (const boundedContextName of Object.keys(appData)) {
    const boundedContextNameKebab = kebabCase(boundedContextName);
    for (const moduleName of Object.keys(appData[boundedContextName])) {
      const moduleNameKebab = kebabCase(moduleName);
      for (const componentFamilyName of Object.keys(appData[boundedContextName][moduleName])) {
        // Controllers, UseCases, ValueObjects, DomainErrors, Entities, Repositories
        const classType = boundedContextKeysToClassTypeMapping[componentFamilyName];

        const mappingToComponentType = {
          [ClassTypes.Controller]: BitloopsTypesMapping.TController,
          [ClassTypes.UseCase]: BitloopsTypesMapping.TUseCase,
          [ClassTypes.ValueObject]: BitloopsTypesMapping.TValueObjects,
          [ClassTypes.Props]: BitloopsTypesMapping.TProps,
          [ClassTypes.DTO]: BitloopsTypesMapping.TDTO,
          [ClassTypes.DomainError]: BitloopsTypesMapping.TDomainErrors,
          [ClassTypes.Package]: BitloopsTypesMapping.TPackages,
          [ClassTypes.Entity]: 'TBD', // TODO
          [ClassTypes.Aggregate]: 'TBD', // TODO
          [ClassTypes.RepoPort]: BitloopsTypesMapping.TRepoPorts,
          [ClassTypes.RepoAdapter]: BitloopsTypesMapping.TRepoAdapters,
        };

        const componentType = mappingToComponentType[classType];

        for (const [componentName, component] of Object.entries(
          appData[boundedContextName][moduleName][componentFamilyName],
        )) {
          // const component =
          //   appData[boundedContextName][moduleName][componentFamilyName][componentName];
          firstIteration({
            boundedContextName: boundedContextNameKebab,
            moduleName: moduleNameKebab,
            componentName,
            classType,
            component,
            projectPath,
            componentType,
            language: SupportedLanguages.TypeScript,
            components,
            context,
            setupData,
            model: appData,
          });
        }
      }

      insertMissingImportsForModule({
        moduleAppData: appData[boundedContextName][moduleName],
        components,
        boundedContext: boundedContextNameKebab,
        moduleName: moduleNameKebab,
      });
    }
  }
};

// modelToFinalLanguage(appData, projectPath);

export { modelToFinalLanguage };
