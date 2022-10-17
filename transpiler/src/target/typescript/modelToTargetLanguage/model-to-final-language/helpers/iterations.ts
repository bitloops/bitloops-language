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
import { join } from 'path';
import { ISetupData, TBoundedContexts, TModule } from '../../../../types.js';
import {
  additionalOperationsBasedOnComponent,
  createFileAndDirectories,
  getFilePaths,
  getMissingImportsString,
  modelToTargetLanguageStep,
  prependImportsToFile,
  updateComponentsStruct,
  TComponentType,
  getAllMissingComponents,
} from './index.js';

export const firstIteration = (params: {
  boundedContextName;
  moduleName;
  classType;
  component: any;
  componentName: string;
  projectPath;
  componentType: string;
  language: string;
  components: any;
  context?: { boundedContext: string; module: string };
  setupData?: ISetupData;
  model?: TBoundedContexts;
}): void => {
  const {
    boundedContextName,
    moduleName,
    classType,
    component,
    componentName,
    projectPath,
    componentType,
    language,
    components,
    context,
    setupData,
    model,
  } = params;

  let generatedCodeString = modelToTargetLanguageStep(
    componentType,
    component,
    componentName,
    language,
    context,
    setupData,
    model,
  );

  generatedCodeString = additionalOperationsBasedOnComponent({
    generatedCodeString,
    componentName,
    componentType,
    component,
    context,
    setupData,
  });

  const { filePathObj, directoryPath } = getFilePaths({
    boundedContextName,
    moduleName,
    classType,
    componentName,
    language,
    projectPath,
    component,
  });

  createFileAndDirectories({
    projectPath,
    directoryPath,
    filePathObj,
    generatedCodeString,
    language,
  });

  updateComponentsStruct({
    boundedContextName,
    moduleName,
    components,
    componentName,
    directoryPath,
    filePathObj,
  });
};

/**
 * Steps
 *
 * For each module
 * 1. Get importer info from components
 * 2. Find missingImports
 * if missingImports for every component is [] -> end
 * 3. Build all missing importsString
 *  * For each missing import
 *  *   Get relative path diff
 * 4. Write missing importsString to component file
 *
 * Check again for missing imports (e.g. DomainErrors<InvalidName>, needs 2 passes)
 *
 */
export const insertMissingImportsForModule = (params: {
  boundedContext: string;
  moduleName: string;
  components: TComponentType;
  moduleAppData: TModule;
}): void => {
  const { moduleAppData, moduleName, boundedContext, components } = params;
  const componentsToPaths = {
    [boundedContext]: { [moduleName]: {} },
  };
  for (const componentFamily of Object.values(moduleAppData)) {
    for (const componentName of Object.keys(componentFamily)) {
      const componentThatImports = components[boundedContext][moduleName][componentName];
      const { path, file } = componentThatImports;
      componentsToPaths[boundedContext][moduleName][componentName] = join(path, file);
    }
  }

  const moduleMissingComponents = getAllMissingComponents(componentsToPaths);

  const missingImportsForModule = Object.values(
    moduleMissingComponents[boundedContext][moduleName],
  );

  // End - recursion base case
  if (
    missingImportsForModule.every((componentMissingImports) => componentMissingImports.length === 0)
  ) {
    return;
  }

  for (const [componentName, missingImports] of Object.entries(
    moduleMissingComponents[boundedContext][moduleName],
  )) {
    if (missingImports.length === 0) {
      continue;
    }

    const componentThatImports = components[boundedContext][moduleName][componentName];
    const { path: pathOfImporter, file: fileName } = componentThatImports;

    const importsString = getMissingImportsString({
      boundedContext,
      moduleName,
      components,
      missingImports,
      pathOfImporter,
    });

    prependImportsToFile({ data: importsString, fileDirPath: pathOfImporter, fileName });
  }

  // Because generic types are not spotted as errors if parent type is not imported
  insertMissingImportsForModule(params);
};
