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
import { kebabCase } from '../../../../utils/caseStyles.js';
import {
  TRouterController,
  ControllerResolverKey,
  TControllerResolver,
  TDependencyInjection,
  TDependencyInjectionType,
  TArgument,
} from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';
import { getFilePathRelativeToModule } from '../../helpers/getTargetFileDestination.js';
import { ISetupRepos, SetupTypeScriptRepos } from '../repos/index.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { TSetupOutput } from '../index.js';
import {
  BitloopsTypesMapping,
  ClassTypes,
  TClassTypesValues,
} from '../../../../helpers/mappings.js';
import { TUseCase } from '../useCaseDefinition/index.js';
import { TSetupElementsPerModule } from '../definitions.js';
import { generateDIsInstanceName } from '../helpers.js';

interface IDependencyInjectionsGenerator {
  generateDIs(
    elementsPerBoundedContext: TSetupElementsPerModule,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[];
}

const esmEnabled = false;

const typeToClassTypeMapping: Record<TDependencyInjectionType, TClassTypesValues> = {
  CommandHandler: ClassTypes.CommandHandler,
  QueryHandler: ClassTypes.QueryHandler,
  EventHandler: ClassTypes.DomainEventHandler,
  IntegrationEventHandler: ClassTypes.IntegrationEventHandler,
};

export class DependencyInjectionsGenerator implements IDependencyInjectionsGenerator {
  constructor(private setupTypeScriptRepos: ISetupRepos = new SetupTypeScriptRepos()) {}

  generateDIs(
    elementsPerBoundedContext: TSetupElementsPerModule,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl

    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const moduleName of Object.keys(boundedContext)) {
        const diFileName = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/DI.ts`;
        // Gather all imports
        let diContent = this.generateDIFIleImports(
          elementsPerBoundedContext,
          setupTypeMapper,
          boundedContextName,
          moduleName,
        );

        diContent += '\n';
        diContent += this.generateDIFileBody(
          elementsPerBoundedContext,
          boundedContextName,
          moduleName,
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
  private generateDIFIleImports(
    elementsPerBoundedContext: TSetupElementsPerModule,
    setupTypeMapper: Record<string, string>,
    boundedContextName: string,
    moduleName: string,
  ): string {
    const {
      useCases,
      restControllers: controllers,
      graphQLControllers,
      repoAdapters,
      dependencyInjections,
    } = elementsPerBoundedContext;
    const moduleRepoAdapters = repoAdapters[boundedContextName]?.[moduleName];
    const moduleUseCases = useCases[boundedContextName]?.[moduleName];
    const moduleRestControllers = controllers[boundedContextName]?.[moduleName];
    const moduleGraphQLControllers = graphQLControllers[boundedContextName]?.[moduleName];
    const moduleDIs = dependencyInjections[boundedContextName]?.[moduleName];
    let diContent = '';
    if (moduleRepoAdapters) {
      diContent += this.setupTypeScriptRepos.generateRepoDIImports(
        moduleRepoAdapters,
        setupTypeMapper,
      );
    }

    if (moduleUseCases) {
      diContent += this.generateDIUseCaseImports(moduleUseCases);
    }

    if (moduleDIs) {
      diContent += this.generateDependencyInjectionImports(moduleDIs);
    }

    if (moduleRestControllers) {
      diContent += this.generateDIControllersImports(moduleRestControllers);
    }

    if (moduleGraphQLControllers) {
      diContent += this.generateDIGraphQLControllersImports(moduleGraphQLControllers);
    }

    return diContent;
  }

  private generateDIFileBody(
    elementsPerBoundedContext: TSetupElementsPerModule,
    boundedContextName: string,
    moduleName: string,
  ): string {
    const {
      useCases,
      restControllers: controllers,
      graphQLControllers,
      repoAdapters,
      dependencyInjections,
    } = elementsPerBoundedContext;
    const moduleRepoAdapters = repoAdapters[boundedContextName]?.[moduleName];
    const moduleUseCases = useCases[boundedContextName]?.[moduleName];
    const moduleRestControllers = controllers[boundedContextName]?.[moduleName];
    const moduleGraphQLControllers = graphQLControllers[boundedContextName]?.[moduleName];
    const moduleDIs = dependencyInjections[boundedContextName]?.[moduleName];

    let diContent = '';
    if (moduleRepoAdapters) {
      diContent += this.setupTypeScriptRepos.generateRepoDIAdapters(moduleRepoAdapters);
    }

    if (moduleUseCases) {
      diContent += this.generateUseCasesDIs(moduleUseCases);
    }

    if (moduleDIs) {
      diContent = this.generateDependencyInjections(moduleDIs);
    }

    if (moduleRestControllers)
      diContent += this.generateControllerDIsAndExports(moduleRestControllers);

    if (moduleGraphQLControllers) {
      diContent += this.generateGraphQLControllerDIsAndExports(moduleGraphQLControllers);
    }

    return diContent;
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

  private generateDependencyInjectionImports(DIs: TDependencyInjection[]): string {
    let result = '';
    for (const useCase of DIs) {
      const { dependencyInjection } = useCase;
      const { identifier, type } = dependencyInjection;
      // Gather all use case imports
      const classType = typeToClassTypeMapping[type];
      const { path, filename } = getFilePathRelativeToModule(classType, identifier);
      result += `import { ${identifier} } from './${path}${filename}${esmEnabled ? '.js' : ''}';\n`;
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
      result += this.generateElementDI(instanceName, UseCaseIdentifier, argumentList);
    }
    return result;
  }

  private generateDependencyInjections(DIs: TDependencyInjection[]): string {
    let result = '';
    for (const di of DIs) {
      const { dependencyInjection } = di;
      const { identifier, type, argumentList } = dependencyInjection;
      const instanceName = generateDIsInstanceName(type, identifier);
      result += this.generateElementDI(instanceName, identifier, argumentList, true);
    }

    return result;
  }

  private generateControllerDIsAndExports(controllers: TRouterController[]): string {
    let controllerDIContent = '';
    const controllerInstanceNames = [];
    for (const controller of controllers) {
      const { routerController } = controller;
      const { RESTControllerIdentifier, controllerInstanceName, argumentList } = routerController;

      controllerDIContent += this.generateElementDI(
        controllerInstanceName,
        RESTControllerIdentifier,
        argumentList,
      );
      controllerInstanceNames.push(controllerInstanceName);
    }
    const exportsString = this.generateExports(controllerInstanceNames);

    return controllerDIContent + '\n' + exportsString;
  }

  private generateGraphQLControllerDIsAndExports(
    controllerResolvers: TControllerResolver[],
  ): string {
    let controllerDIContent = '';
    const controllerInstanceNames = [];
    for (const controllerResolverInstance of controllerResolvers) {
      const controllerResolver = controllerResolverInstance[ControllerResolverKey];
      const { graphQLControllerIdentifier, controllerInstanceName, argumentList } =
        controllerResolver;

      controllerDIContent += this.generateElementDI(
        controllerInstanceName,
        graphQLControllerIdentifier,
        argumentList,
      );
      controllerInstanceNames.push(controllerInstanceName);
    }
    const exportsString = this.generateExports(controllerInstanceNames);
    return controllerDIContent + '\n' + exportsString;
  }

  private generateElementDI(
    instanceName: string,
    classIdentifier: string,
    argumentList: TArgument[],
    exportInstance = false,
  ): string {
    const argumentsTarget = modelToTargetLanguage({
      type: BitloopsTypesMapping.TArgumentList,
      value: { argumentList },
    });

    const exportString = exportInstance ? 'export ' : '';

    return (
      exportString + `const ${instanceName} = new ${classIdentifier}${argumentsTarget.output};\n`
    );
  }

  private generateExports(identifiers: string[]): string {
    let exportsString = 'export {';
    for (const identifier of identifiers) {
      exportsString += `${identifier}, `;
    }
    exportsString += '};\n';
    return exportsString;
  }
}
