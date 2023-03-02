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
  TDependencyInjection,
  TCommandHandler,
  commandHandlerKey,
  identifierKey,
  bitloopsPrimaryTypeKey,
  TBitloopsPrimaryTypeValues,
  queryHandlerKey,
  TQueryHandler,
  TDomainEventHandler,
  TIntegrationEventHandler,
  expressionKey,
} from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';
import { getFilePathRelativeToModule } from '../../helpers/getTargetFileDestination.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { TSetupOutput } from '../index.js';
import {
  BitloopsTypesMapping,
  ClassTypes,
  TBitloopsTypesValues,
  TClassTypesValues,
} from '../../../../helpers/mappings.js';
import { TSetupElementsPerModule } from '../definitions.js';
import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { DependencyInjectionsGenerator } from '../dependency-injections/diHandler.js';
import { TSetupTypeMapper } from '../fileDestinations.js';

interface ISubscriptionsHandler {
  generateSubscriptions(
    elementsPerBoundedContext: TSetupElementsPerModule,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[];
}

const esmEnabled = false;

type TComponentSubscriptionDependencies = Array<{
  type: 'di' | TClassTypesValues;
  identifier: string;
}>;
type ComponentSubscriptionsResult = {
  output: string;
  dependencies: TComponentSubscriptionDependencies;
};

export class SubscriptionsHandler implements ISubscriptionsHandler {
  generateSubscriptions(
    elementsPerBoundedContext: TSetupElementsPerModule,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: TSetupTypeMapper,
    license?: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl

    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const [moduleName, moduleTree] of Object.entries(boundedContext)) {
        const subscriptionsFileId = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/subscriptions/index.ts`;

        const DIs =
          elementsPerBoundedContext.dependencyInjections?.[boundedContextName]?.[moduleName] ?? [];

        const methodName = 'setUpSubscriptions';
        const commandHandlersSubscriptions = this.generateSetupsSubscriptions(
          methodName,
          moduleTree,
          DIs,
        );

        const containerImport = "import { Container } from '@bitloops/bl-boilerplate-core';\n";
        const imports = this.generateImports(commandHandlersSubscriptions.dependencies);

        const fileBody = commandHandlersSubscriptions.output + `\n${methodName}();\n`;

        result.push({
          fileId: subscriptionsFileId,
          fileType: 'subscriptions',
          content: (license || '') + containerImport + imports + '\n' + fileBody,
          context: {
            boundedContextName,
            moduleName,
          },
        });
      }
    }
    return result;
  }

  private generateSetupsSubscriptions(
    setupSubscriptionsMethodName: string,
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    const methodName = `const ${setupSubscriptionsMethodName} = async () => {`;

    setupSubscriptionsMethodName += 'setUpSubscriptions();';
    const commandHandlersSubscriptions = this.generateSubscriptionsForCommandHandlers(
      moduleTree,
      dependencyInjections,
    );

    const queryHandlersSubscriptions = this.generateSubscriptionsForQueryHandlers(
      moduleTree,
      dependencyInjections,
    );

    const domainEventHandlersSubscriptions = this.generateSubscriptionsForDomainEventHandlers(
      moduleTree,
      dependencyInjections,
    );

    const integrationEventHandlersSubscriptions =
      this.generateSubscriptionsForIntegrationEventHandlers(moduleTree, dependencyInjections);

    const methodBody =
      commandHandlersSubscriptions.output +
      queryHandlersSubscriptions.output +
      domainEventHandlersSubscriptions.output +
      integrationEventHandlersSubscriptions.output;

    const allDependencies = [
      ...commandHandlersSubscriptions.dependencies,
      ...queryHandlersSubscriptions.dependencies,
      ...domainEventHandlersSubscriptions.dependencies,
      ...integrationEventHandlersSubscriptions.dependencies,
    ];

    return {
      output: methodName + methodBody + '\n\n}\n',
      dependencies: allDependencies,
    };
  }

  private generateSubscriptionsForCommandHandlers(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    return this.generateSubscriptionsForComponent<TCommandHandler>({
      moduleTree,
      componentHandlerNodeType: BitloopsTypesMapping.TCommandHandler,
      busIdentifier: 'commandBus',
      busGetterFunction: 'Container.getCommandBus()',
      componentClassType: ClassTypes.Command,
      getDIForComponentHandler: (component) =>
        dependencyInjections.find(
          (di) => di.dependencyInjection.identifier === component[commandHandlerKey][identifierKey],
        ),
      getComponentFromComponentHandler: (handler) =>
        handler[commandHandlerKey].execute.parameter[bitloopsPrimaryTypeKey],
      subscriptionStatement: (
        busIdentifier: string,
        componentClassName: string,
        handler: string,
      ) => `await ${busIdentifier}.register(
        ${componentClassName}.getCommandTopic(),
        ${handler}.execute.bind(${handler}),
      );
      `,
    });
  }

  private generateSubscriptionsForQueryHandlers(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    return this.generateSubscriptionsForComponent<TQueryHandler>({
      moduleTree,
      componentHandlerNodeType: BitloopsTypesMapping.TQueryHandler,
      busIdentifier: 'queryBus',
      busGetterFunction: 'Container.getQueryBus()',
      componentClassType: ClassTypes.Query,
      getDIForComponentHandler: (component) =>
        dependencyInjections.find(
          (di) => di.dependencyInjection.identifier === component[queryHandlerKey][identifierKey],
        ),
      getComponentFromComponentHandler: (handler) =>
        handler[queryHandlerKey].execute.parameter[bitloopsPrimaryTypeKey],
      subscriptionStatement: (
        busIdentifier: string,
        componentClassName: string,
        handler: string,
      ) => `await ${busIdentifier}.register(
        ${componentClassName}.getQueryTopic(),
        ${handler}.execute.bind(${handler}),
      );
      `,
    });
  }

  private generateSubscriptionsForDomainEventHandlers(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    return this.generateSubscriptionsForComponent<TDomainEventHandler>({
      moduleTree,
      componentHandlerNodeType: BitloopsTypesMapping.TDomainEventHandler,
      busIdentifier: 'domainEventBus',
      busGetterFunction: 'Container.getEventBus()',
      componentClassType: ClassTypes.DomainEvent,
      getDIForComponentHandler: (component) =>
        dependencyInjections.find(
          (di) =>
            di.dependencyInjection.identifier ===
            component.domainEventHandler.domainEventHandlerIdentifier,
        ),
      getComponentFromComponentHandler: (handler) =>
        handler.domainEventHandler.handle.parameter[bitloopsPrimaryTypeKey],
      subscriptionStatement: (
        busIdentifier: string,
        componentClassName: string,
        handler: string,
      ) => `await ${busIdentifier}.subscribe(
        ${componentClassName}.getEventTopic(),
        ${handler}.handle.bind(${handler}),
      );
      `,
    });
  }

  private generateSubscriptionsForIntegrationEventHandlers(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    return this.generateSubscriptionsForComponent<TIntegrationEventHandler>({
      moduleTree,
      componentHandlerNodeType: BitloopsTypesMapping.TIntegrationEventHandler,
      busIdentifier: 'integrationEventBus',
      busGetterFunction: 'Container.getIntegrationEventBus()',
      componentClassType: ClassTypes.IntegrationEvent,
      getDIForComponentHandler: (component) =>
        dependencyInjections.find(
          (di) =>
            di.dependencyInjection.identifier ===
            component.integrationEventHandler.integrationEventHandlerIdentifier,
        ),
      getComponentFromComponentHandler: (handler) =>
        handler.integrationEventHandler.handle.parameter[bitloopsPrimaryTypeKey],
      subscriptionStatement: (
        busIdentifier: string,
        componentClassName: string,
        handler: string,
        integrationEventHandler,
      ) => {
        const version =
          integrationEventHandler.integrationEventHandler.evaluationField[expressionKey];
        const versionOutput = modelToTargetLanguage({
          value: { expression: version },
          type: BitloopsTypesMapping.TExpression,
        });

        return `await ${busIdentifier}.subscribe<${componentClassName}>(
        ${componentClassName}.getEventTopic(${versionOutput.output}}),
        ${handler}.handle.bind(${handler}),
      );
      `;
      },
    });
  }

  private generateSubscriptionsForComponent<T>(params: {
    moduleTree: IntermediateASTTree;
    componentHandlerNodeType: TBitloopsTypesValues;
    busIdentifier: string;
    busGetterFunction: string;
    componentClassType: TClassTypesValues;
    getDIForComponentHandler: (component: T) => TDependencyInjection | undefined;
    getComponentFromComponentHandler: (handler: T) => TBitloopsPrimaryTypeValues;
    subscriptionStatement: (
      busIdentifier: string,
      componentClassName: string,
      componentHandlerIdentifier: string,
      componentHandler?: T,
    ) => string;
  }): ComponentSubscriptionsResult {
    const {
      moduleTree,
      componentHandlerNodeType,
      busIdentifier,
      busGetterFunction,
      getComponentFromComponentHandler: extractComponentParameterTypeFromHandler,
      getDIForComponentHandler: extractDIForComponent,
      componentClassType: classType,
      subscriptionStatement,
    } = params;
    const componentHandlers =
      moduleTree.getRootChildrenNodesValueByType<T>(componentHandlerNodeType);
    const dependencies: TComponentSubscriptionDependencies = [];
    let result = `const ${busIdentifier} = ${busGetterFunction};`;
    for (const componentHandler of componentHandlers) {
      const di = extractDIForComponent(componentHandler);
      if (!di) {
        // Throw error to inform for unregistered DI?
        continue;
      }
      const { type, identifier } = di.dependencyInjection;
      const handlerInstance = DependencyInjectionsGenerator.generateDIsInstanceName(
        type,
        identifier,
      );

      const componentParameterType = extractComponentParameterTypeFromHandler(componentHandler);
      const component = modelToTargetLanguage({
        value: { [bitloopsPrimaryTypeKey]: componentParameterType },
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
      });
      result += subscriptionStatement(
        busIdentifier,
        component.output,
        handlerInstance,
        componentHandler,
      );

      dependencies.push({
        type: 'di',
        identifier: handlerInstance,
      });
      dependencies.push({
        type: classType,
        identifier: component.output,
      });
    }
    if (dependencies.length === 0) {
      return { output: '', dependencies };
    }
    return { output: result, dependencies };
  }

  private generateImports(dependencies: TComponentSubscriptionDependencies): string {
    let result = '';
    for (const dependency of dependencies) {
      const { type, identifier } = dependency;
      if (type === 'di') {
        result += `import { ${identifier} } from '../DI';\n`;
        continue;
      }
      const childPathObj = getFilePathRelativeToModule(type, identifier);
      const childPath = childPathObj.path;
      const filename = childPathObj.filename + (esmEnabled ? '.js' : '');
      result += `import { ${identifier} } from '../${childPath}/${filename}';\n`;
    }
    return result;
  }
}
