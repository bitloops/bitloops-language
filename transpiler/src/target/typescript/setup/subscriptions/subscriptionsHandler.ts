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
  TCommandHandler,
  commandHandlerKey,
  identifierKey,
  bitloopsPrimaryTypeKey,
  queryHandlerKey,
  TDomainEventHandler,
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
import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { DependencyInjectionsGenerator } from '../dependency-injections/diHandler.js';
import { TQueryHandler } from '../../../../types.js';

interface ISubscriptionsHandler {
  generateSubscriptions(
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

export class SubscriptionsHandler implements ISubscriptionsHandler {
  constructor(private setupTypeScriptRepos: ISetupRepos = new SetupTypeScriptRepos()) {}

  generateSubscriptions(
    elementsPerBoundedContext: TSetupElementsPerModule,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl

    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const [moduleName, moduleTree] of Object.entries(boundedContext)) {
        const diFileName = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/DI.ts`;

        const DIs = elementsPerBoundedContext.dependencyInjections[boundedContextName][moduleName];
        // Gather all imports
        let diContent = this.generateDIFIleImports(
          elementsPerBoundedContext,
          setupTypeMapper,
          boundedContextName,
          moduleName,
        );

        diContent += '\n';

        const commandHandlersSubscriptions = this.generateCommandHandlersSubscriptions(
          moduleTree,
          DIs,
        );

        diContent += commandHandlersSubscriptions;

        result.push({
          fileId: diFileName,
          fileType: 'subscriptions',
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
  private generateCommandHandlersSubscriptions(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): string {
    const commandHandlers = moduleTree.getRootChildrenNodesValueByType<TCommandHandler>(
      BitloopsTypesMapping.TCommandHandler,
    );
    let result = 'const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);';
    for (const commandHandler of commandHandlers) {
      const di = dependencyInjections.find(
        (di) =>
          di.dependencyInjection.identifier === commandHandler[commandHandlerKey][identifierKey],
      );
      if (!di) {
        // Perhaps we could create uninitialized DI here(if they have no dependencies)
        continue;
      }
      const { type, identifier } = di.dependencyInjection;
      const instance = DependencyInjectionsGenerator.generateDIsInstanceName(type, identifier);

      const commandNameModel =
        commandHandler[commandHandlerKey].execute.parameter[bitloopsPrimaryTypeKey];
      const command = modelToTargetLanguage({
        value: { [bitloopsPrimaryTypeKey]: commandNameModel },
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
      });
      result += `
      await commandBus.register(
        ${command.output}.getCommandTopic(),
        ${instance}.execute.bind(${instance}}),
      );
      `;
    }
    return result;
  }

  private generateQueryHandlersSubscriptions(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): string {
    const queryHandlers = moduleTree.getRootChildrenNodesValueByType<TQueryHandler>(
      BitloopsTypesMapping.TQueryHandler,
    );
    let result = 'const queryBus = Container.getQueryBusFromContext(CONTEXT_ID);';
    for (const queryHandler of queryHandlers) {
      const di = dependencyInjections.find(
        (di) => di.dependencyInjection.identifier === queryHandler[queryHandlerKey][identifierKey],
      );
      if (!di) {
        // Perhaps we could create uninitialized DI here(if they have no dependencies)
        continue;
      }
      const { type, identifier } = di.dependencyInjection;
      const instance = DependencyInjectionsGenerator.generateDIsInstanceName(type, identifier);
      const queryNameModel =
        queryHandler[queryHandlerKey].execute.parameter[bitloopsPrimaryTypeKey];
      const query = modelToTargetLanguage({
        value: { [bitloopsPrimaryTypeKey]: queryNameModel },
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
      });
      result += `
      await queryBus.register(
        ${query.output}.getQueryTopic(),
        ${instance}.execute.bind(${instance}}),
      );
      `;
    }
    return result;
  }

  private generateEventHandlersSubscriptions(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): string {
    const eventHandlers = moduleTree.getRootChildrenNodesValueByType<TDomainEventHandler>(
      BitloopsTypesMapping.TDomainEventHandler,
    );
    let result = 'const eventBus = Container.getEventBusFromContext(CONTEXT_ID);';
    for (const eventHandler of eventHandlers) {
      const di = dependencyInjections.find(
        (di) =>
          di.dependencyInjection.identifier ===
          eventHandler.domainEventHandler.domainEventHandlerIdentifier,
      );
      if (!di) {
        // Perhaps we could create uninitialized DI here(if they have no dependencies)
        continue;
      }
      const { type, identifier } = di.dependencyInjection;
      const instance = DependencyInjectionsGenerator.generateDIsInstanceName(type, identifier);
      const eventNameModel =
        eventHandler.domainEventHandler.handle.parameter[bitloopsPrimaryTypeKey];
      const event = modelToTargetLanguage({
        value: { [bitloopsPrimaryTypeKey]: eventNameModel },
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
      });
      result += `
      await eventBus.register(
        ${event.output}.getEventTopic(),
        ${instance}.execute.bind(${instance}}),
      );
      `;
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
}
