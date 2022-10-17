import chalk from 'chalk';
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
import { join, relative } from 'path';
import { kebabCase } from '../../../../helpers/caseStyles.js';
import { createDirectory } from '../../../../helpers/createDirectory.js';
import { prependToFile, writeToFile } from '../../../../helpers/fileOperations.js';
import { SupportedLanguages } from '../../../../helpers/supportedLanguages.js';
import { ISetupData, TBoundedContexts, TRESTControllerValues } from '../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../commons/index.js';
import { getTargetFileDestination } from '../../getTargetFileDestination.js';
import { modelToTargetLanguage } from '../../index.js';
import { findAllMissingTSImports } from './imports.js';
import { formatToLang } from './codeFormatting.js';
import { controllersMapping } from '../index.js';
import { controllerDefinitionIsRest } from '../../../../helpers/typeGuards.js';
import { StringUtils } from '../../../../utils/StringUtils.js';

const sameDirectory = (relDif: string): boolean => relDif === '';

type ModuleName = string;
type BoundedCtxName = string;
export type TComponentType = Record<
  BoundedCtxName,
  Record<ModuleName, Record<string, { path: string; file: string }>>
>;
export type TMissingComponents = Record<
  BoundedCtxName,
  Record<ModuleName, Record<string, string[]>>
>;
export const initializeComponents = (
  appData: TBoundedContexts,
  projectPath: string,
): {
  components: TComponentType;
} => {
  const components: TComponentType = {};
  for (const boundedContextName of Object.keys(appData)) {
    for (const moduleName of Object.keys(appData[boundedContextName])) {
      const boundedContextKebabName = kebabCase(boundedContextName);
      const moduleNameKebabName = kebabCase(moduleName);
      components[boundedContextKebabName] = {};
      components[boundedContextKebabName][moduleNameKebabName] = {
        // TODO get these for template
        BaseFastifyController: {
          path: projectPath + '/src/shared/infra/rest/fastify/models/',
          file: 'BaseFastifyController',
        },
        BaseGraphQLController: {
          path: projectPath + '/src/shared/infra/graphql/models/',
          file: 'BaseGraphQLController',
        },
        CRUDRepoPort: {
          path: projectPath + '/src/shared/domain/',
          file: 'ICRUDRepoPort',
        },
        // ExpressController: { path: '/', file: '' },
        XOR: { path: projectPath + '/src/shared/core/', file: 'Result' },
        UseCase: { path: projectPath + '/src/shared/core/', file: 'UseCase' },
        DomainError: { path: projectPath + '/src/shared/core/', file: 'DomainError' },
        ValueObject: { path: projectPath + '/src/shared/domain/', file: 'ValueObject' },
        Void: { path: projectPath + '/src/shared/core/', file: 'VoidResponse' },
        yay: { path: projectPath + '/src/shared/core/', file: 'Result' },
        oops: { path: projectPath + '/src/shared/core/', file: 'Result' },
      };
      if (appData[boundedContextName][moduleName].DomainErrors) {
        // const components = appData[boundedContextName][moduleName].DomainErrors[];
        const { filePathObj, directoryPath } = getFilePaths({
          boundedContextName: boundedContextKebabName,
          moduleName: moduleNameKebabName,
          classType: ClassTypes.DomainError,
          componentName: 'errors',
          language: SupportedLanguages.TypeScript,
          projectPath,
          component: undefined, // TODO if needed for domain errors
        });

        components[boundedContextKebabName][moduleNameKebabName].DomainErrors = {
          path: directoryPath,
          file: filePathObj.filename,
        };
        // TODO check if adding of individual domain errors in components causes problems
      }
    }
  }

  return { components };
};

export const getMissingImportsString = (params: {
  boundedContext: string;
  moduleName: string;
  components: any;
  missingImports: string[];
  pathOfImporter: string;
}): string => {
  const { pathOfImporter, boundedContext, moduleName, components, missingImports } = params;
  // let componentImportsString = '';
  const componentImportsString =
    missingImports
      .map((missingImport) => {
        const componentToBeImported = components[boundedContext][moduleName][missingImport];
        if (componentToBeImported === undefined) {
          throw new Error(
            `${chalk.red(missingImport)} does not exist in components and is not defined`,
          );
        }
        const { path: pathToBeImported, file: fileToBeImported } = componentToBeImported;

        const relativePathDif = relative(pathOfImporter, pathToBeImported);
        // console.log('relativePathDif', relativePathDif, pathOfImporter, pathToBeImported);
        const importPath =
          (sameDirectory(relativePathDif) ? './' : relativePathDif + '/') +
          fileToBeImported.replace(/\.[^/.]+$/, ''); // Remove fileToBeImported extension
        const importString = `import { ${missingImport} } from '${importPath}';`;
        return importString;
      })
      .join('\n') + '\n';
  return componentImportsString;
};

export const modelToTargetLanguageStep = (
  componentType: string,
  component: any,
  componentName: string,
  language: string,
  context?: { boundedContext: string; module: string },
  setupData?: ISetupData,
  model?: TBoundedContexts,
): string => {
  const generatedCodeString = modelToTargetLanguage({
    type: componentType,
    value: { [componentName]: component },
    targetLanguage: language,
    contextData: context,
    setupData,
    model: model as any,
  });
  return generatedCodeString;
};

export const additionalOperationsBasedOnComponent = (params: {
  generatedCodeString: string;
  componentName: string;
  componentType: string;
  component: any;
  context?: { boundedContext: string; module: string };
  setupData?: ISetupData;
}): string => {
  const { generatedCodeString, componentName, componentType, context, setupData, component } =
    params;
  if (componentType === BitloopsTypesMapping.TController) {
    return additionalOperationsForController(
      generatedCodeString,
      component,
      componentName,
      context.boundedContext,
      context.module,
      setupData,
    );
  }
  // TODO parse other component types
  return generatedCodeString;
};

const additionalOperationsForController = (
  initialCodeString: string,
  component: TRESTControllerValues,
  controllerName: string,
  boundedContext: string,
  module: string,
  setupData?: ISetupData,
): string => {
  const { parameterDependencies } = component;
  const controllerDefinition = setupData.controllers[boundedContext][module][controllerName];
  if (!controllerDefinition) {
    return initialCodeString;
  }

  // Prepend await before execution of dependencies
  // Search for dependencies between execute () till end, replace dependencies with this.dependency
  const indexOfExecute = initialCodeString.search(/execute( )*/);
  let controllerResult = initialCodeString;
  for (const { value } of parameterDependencies) {
    // const dependencyIndex = initialCodeString.indexOf(value, indexOfExecute);
    const dependencyIndices = StringUtils.getIndicesOf(
      'this.' + value + '.',
      initialCodeString,
      true,
      indexOfExecute,
    );
    for (const dependencyIndex of dependencyIndices) {
      controllerResult =
        controllerResult.slice(0, dependencyIndex) +
        'await ' +
        controllerResult.slice(dependencyIndex);
    }
  }

  if (controllerDefinitionIsRest(controllerDefinition)) {
    const { serverType } = controllerDefinition;
    const typeOfController = controllersMapping[serverType];
    if (typeOfController === undefined) {
      throw new Error(`${controllerName} does not exist in controller mapping`);
    }
    // mapping for typescript
    const indexOfExtend = controllerResult.search(/extends/);

    const indexToWrite = indexOfExtend + 'extends'.length + 1;
    controllerResult =
      controllerResult.slice(0, indexToWrite) +
      typeOfController +
      controllerResult.slice(indexToWrite);
    // console.log(controllerResult);
    return controllerResult;
  }
  return controllerResult;
};

export const getFilePaths = (params: {
  boundedContextName: string;
  moduleName: string;
  classType: string;
  componentName: string;
  language: string;
  projectPath: string;
  component: any;
}): {
  filePathObj: {
    path: string;
    filename: string;
  };
  directoryPath: string;
} => {
  const {
    boundedContextName,
    moduleName,
    componentName,
    classType,
    language,
    projectPath,
    component,
  } = params;

  let useCase: string | undefined = undefined;
  if (classType === ClassTypes.UseCase || classType === ClassTypes.Controller) {
    useCase = component.useCase;
    // if (componentName.includes('UseCase')) {
    //   useCase = componentName
    //     .split('UseCase')[0]
    //     .replace(/([A-Z])/g, ' $1')
    //     .trim();
    // } else if (componentName.includes('Controller')) {
    // componentName
    //   .split('Controller')[0]
    //   .replace(/([A-Z])/g, ' $1')
    //   .trim();
    // }
  }
  const filePathObj = getTargetFileDestination(
    boundedContextName,
    moduleName,
    classType,
    componentName,
    language,
    useCase,
  );
  const directoryPath = join(projectPath, filePathObj.path);
  return {
    filePathObj,
    directoryPath,
  };
};

export const createFileAndDirectories = (params: {
  projectPath: string;
  directoryPath: string;
  filePathObj: any;
  generatedCodeString: string;
  language: string;
}): void => {
  const { projectPath, directoryPath, filePathObj, generatedCodeString, language } = params;
  createDirectory(directoryPath);
  const filePath = join(projectPath, filePathObj.path, filePathObj.filename);

  const formattedComponent = formatToLang(generatedCodeString, language);
  writeToFile(formattedComponent, filePath);
};

// export const formatFiles = () => {
//   const formattedComponent = formatToLang(generatedCodeString, language);
//   writeToFile(formattedComponent, filePath);
// };

export const prependImportsToFile = (params: {
  data: string;
  fileDirPath: string;
  fileName: string;
}): void => {
  const { data, fileDirPath, fileName } = params;
  const filePath = join(fileDirPath, fileName);
  prependToFile(data, filePath);
};

export const updateComponentsStruct = (params: {
  boundedContextName: string;
  moduleName: string;
  components: any;
  componentName: string;
  directoryPath: string;
  filePathObj: { path: string; filename: string };
}): void => {
  const { components, boundedContextName, moduleName, directoryPath, filePathObj, componentName } =
    params;

  components[boundedContextName][moduleName][componentName] = {
    path: directoryPath,
    file: filePathObj.filename,
  };
};

type FilePath = string;
export type TypescriptImportsReverseMapper = {
  [filePath: string]: {
    boundedContext: string;
    module: string;
    component: string;
    missingImports?: string[] | Set<string>; // Populated by ts compiler function
  };
};

export const getAllMissingComponents = (params: {
  [bdctx: string]: { [module: string]: { [component: string]: FilePath } };
}): TMissingComponents => {
  const missingComponents: TMissingComponents = {};
  const filePathsToComponentInfo: TypescriptImportsReverseMapper = {};
  const filePaths: FilePath[] = [];
  for (const boundedContext in params) {
    if (!missingComponents[boundedContext]) {
      missingComponents[boundedContext] = {};
    }
    for (const module in params[boundedContext]) {
      if (!missingComponents[boundedContext][module]) {
        missingComponents[boundedContext][module] = {};
      }
      for (const component in params[boundedContext][module]) {
        const filePath = params[boundedContext][module][component];
        filePaths.push(filePath);
        filePathsToComponentInfo[filePath] = {
          boundedContext,
          module,
          component,
        };
      }
    }
  }

  const reverseMapping = findAllMissingTSImports(
    filePaths,
    { noEmit: true },
    filePathsToComponentInfo,
  );
  for (const componentImportsInfo of Object.values(reverseMapping)) {
    const { boundedContext, module, component, missingImports } = componentImportsInfo;
    missingComponents[boundedContext][module][component] = missingImports
      ? Array.from(missingImports)
      : [];
  }
  return missingComponents;
};
