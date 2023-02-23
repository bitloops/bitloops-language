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
//import path from 'path';
import { kebabCase } from '../../../utils/caseStyles.js';
import { TRouterController, ControllerResolverKey, TControllerResolver } from '../../../types.js';

import { TBoundedContexts } from '../../../ast/core/types.js';
import { getFilePathRelativeToModule } from '../helpers/getTargetFileDestination.js';
import { ISetupRepos, SetupTypeScriptRepos } from './repos/index.js';
import { modelToTargetLanguage } from '../core/modelToTargetLanguage.js';
import { TSetupOutput } from './index.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../helpers/mappings.js';
import { TUseCase } from './useCaseDefinition/index.js';
import { TSetupElementsPerBoundedContext } from './definitions.js';

interface IDependencyInjectionsGenerator {
  generateDIs(
    elementsPerBoundedContext: TSetupElementsPerBoundedContext,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[];
}

const esmEnabled = false;

export class DependencyInjectionsGenerator implements IDependencyInjectionsGenerator {
  constructor(private setupTypeScriptRepos: ISetupRepos = new SetupTypeScriptRepos()) {}

  generateDIs(
    elementsPerBoundedContext: TSetupElementsPerBoundedContext,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl
    // TODO Add support for other types of DIs such as repositories, etc.
    const {
      useCases,
      restControllers: controllers,
      graphQLControllers,
      repoAdapters,
    } = elementsPerBoundedContext;
    const useCasesLength = Object.keys(useCases).length;
    const controllersLength = Object.keys(controllers).length;
    const graphQLControllersLength = Object.keys(graphQLControllers).length;

    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const moduleName of Object.keys(boundedContext)) {
        const diFileName = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/DI.ts`;
        let diContent = '';
        const moduleRepoAdapters = repoAdapters?.[boundedContextName]?.[moduleName];
        // Gather all imports
        if (moduleRepoAdapters) {
          diContent += this.setupTypeScriptRepos.generateRepoDIImports(
            moduleRepoAdapters,
            setupTypeMapper,
          );
        }

        if (useCasesLength > 0)
          diContent += this.generateDIUseCaseImports(useCases[boundedContextName][moduleName]);

        if (controllersLength > 0)
          diContent += this.generateDIControllersImports(
            controllers[boundedContextName][moduleName],
          );

        if (graphQLControllersLength > 0) {
          diContent += this.generateDIGraphQLControllersImports(
            graphQLControllers[boundedContextName][moduleName],
          );
        }

        diContent += '\n';
        if (moduleRepoAdapters) {
          diContent += this.setupTypeScriptRepos.generateRepoDIAdapters(moduleRepoAdapters);
        }

        if (useCasesLength > 0)
          diContent += this.generateUseCasesDIs(useCases[boundedContextName][moduleName]);

        if (controllersLength > 0)
          diContent += this.generateControllerDIsAndExports(
            controllers[boundedContextName][moduleName],
          );

        if (graphQLControllersLength > 0) {
          diContent += this.generateGraphQLControllerDIsAndExports(
            graphQLControllers[boundedContextName][moduleName],
          );
        }

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
      const { path, filename } = getFilePathRelativeToModule(ClassTypes.UseCase, UseCaseIdentifier);
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

  private generateDIGraphQLControllersImports(controllers: TControllerResolver[]): string {
    let result = '';
    for (const controller of controllers) {
      const resolver = controller[ControllerResolverKey];
      const { graphQLControllerIdentifier } = resolver;
      const { path, filename } = getFilePathRelativeToModule(
        ClassTypes.Controller,
        graphQLControllerIdentifier,
      );
      result += `import { ${graphQLControllerIdentifier} } from './${path}${filename}${
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
    let exportsString = 'export {';
    const controllerInstanceNames = [];
    for (const controller of controllers) {
      const { routerController } = controller;
      const { RESTControllerIdentifier, controllerInstanceName, argumentList } = routerController;

      const controllerDependencies = modelToTargetLanguage({
        type: BitloopsTypesMapping.TArgumentList,
        value: { argumentList },
      });

      controllerDIContent += `const ${controllerInstanceName} = new ${RESTControllerIdentifier}${controllerDependencies.output};\n`;
      controllerInstanceNames.push(controllerInstanceName);
    }
    for (const controllerName of controllerInstanceNames) {
      exportsString += `${controllerName}, `;
    }
    exportsString += '};\n';

    return controllerDIContent + '\n' + exportsString;
  }

  private generateGraphQLControllerDIsAndExports(
    controllerResolvers: TControllerResolver[],
  ): string {
    let controllerDIContent = '';
    let exportsString = 'export {';
    const controllerInstanceNames = [];
    for (const controllerResolverInstance of controllerResolvers) {
      const controllerResolver = controllerResolverInstance[ControllerResolverKey];
      const { graphQLControllerIdentifier, controllerInstanceName, argumentList } =
        controllerResolver;

      const controllerDependencies = modelToTargetLanguage({
        type: BitloopsTypesMapping.TArgumentList,
        value: { argumentList },
      });

      controllerDIContent += `const ${controllerInstanceName} = new ${graphQLControllerIdentifier}${controllerDependencies.output};\n`;
      controllerInstanceNames.push(controllerInstanceName);
    }
    for (const controllerName of controllerInstanceNames) {
      exportsString += `${controllerName}, `;
    }
    exportsString += '};\n';
    return controllerDIContent + '\n' + exportsString;
  }
}
