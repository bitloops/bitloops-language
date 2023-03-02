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
import { TDependencyInjection } from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';
import { getFilePathRelativeToModule } from '../../helpers/getTargetFileDestination.js';
import { TSetupOutput } from '../index.js';
import {
  BitloopsTypesMapping,
  ClassTypes,
  TClassTypesValues,
} from '../../../../helpers/mappings.js';
import { TSetupElementsPerModule } from '../definitions.js';
import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { TSetupTypeMapper } from '../fileDestinations.js';
import { CommandHandlerSubscriptions } from './CommandHandlerSubscriptions.js';
import { QueryHandlerSubscriptions } from './QueryHandlerSubscriptions.js';
import { DomainEventHandlerSubscriptions } from './DomainEventHandlerSubscriptions.js';
import { IntegrationEventHandlerSubscriptions } from './IntegrationEventHandlerSubscriptions.js';

interface ISubscriptionsHandler {
  generateSubscriptions(
    elementsPerBoundedContext: TSetupElementsPerModule,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: Record<string, string>,
    license?: string,
  ): TSetupOutput[];
}

const esmEnabled = false;

export type TComponentSubscriptionDependencies = Array<{
  type: 'di' | TClassTypesValues;
  identifier: string;
}>;
export type ComponentSubscriptionsResult = {
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

  static modulesWithSubscriptions(
    bitloopsModel: TBoundedContexts,
  ): Array<{ boundedContextName: string; moduleName: string }> {
    const res = [];
    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const [moduleName, moduleTree] of Object.entries(boundedContext)) {
        const commandHandlers = moduleTree.getRootChildrenNodesValueByType(
          BitloopsTypesMapping.TCommandHandler,
        );
        if (commandHandlers.length > 0) {
          res.push({ boundedContextName, moduleName });
          continue;
        }

        const queryHandlers = moduleTree.getRootChildrenNodesValueByType(
          BitloopsTypesMapping.TQueryHandler,
        );
        if (queryHandlers.length > 0) {
          res.push({ boundedContextName, moduleName });
          continue;
        }

        const domainEventHandlers = moduleTree.getRootChildrenNodesValueByType(
          BitloopsTypesMapping.TDomainEventHandler,
        );
        if (domainEventHandlers.length > 0) {
          res.push({ boundedContextName, moduleName });
          continue;
        }

        const integrationEventHandlers = moduleTree.getRootChildrenNodesValueByType(
          BitloopsTypesMapping.TIntegrationEventHandler,
        );
        if (integrationEventHandlers.length > 0) {
          res.push({ boundedContextName, moduleName });
        }
      }
    }
    return res;
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
    const commandHandlerSubscriptions = new CommandHandlerSubscriptions(
      moduleTree,
      dependencyInjections,
    );
    return commandHandlerSubscriptions.generateSubscriptions({
      componentHandlerNodeType: BitloopsTypesMapping.TCommandHandler,
      busIdentifier: 'commandBus',
      busGetterFunction: 'Container.getCommandBus()',
      componentClassType: ClassTypes.Command,
    });
  }

  private generateSubscriptionsForQueryHandlers(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    const queryHandlerSubscriptions = new QueryHandlerSubscriptions(
      moduleTree,
      dependencyInjections,
    );
    return queryHandlerSubscriptions.generateSubscriptions({
      componentHandlerNodeType: BitloopsTypesMapping.TQueryHandler,
      busIdentifier: 'queryBus',
      busGetterFunction: 'Container.getQueryBus()',
      componentClassType: ClassTypes.Query,
    });
  }

  private generateSubscriptionsForDomainEventHandlers(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    const domainEventHandlerSubscriptions = new DomainEventHandlerSubscriptions(
      moduleTree,
      dependencyInjections,
    );
    return domainEventHandlerSubscriptions.generateSubscriptions({
      componentHandlerNodeType: BitloopsTypesMapping.TDomainEventHandler,
      busIdentifier: 'domainEventBus',
      busGetterFunction: 'Container.getEventBus()',
      componentClassType: ClassTypes.DomainEvent,
    });
  }

  private generateSubscriptionsForIntegrationEventHandlers(
    moduleTree: IntermediateASTTree,
    dependencyInjections: TDependencyInjection[],
  ): ComponentSubscriptionsResult {
    const integrationEventHandlerSubscriptions = new IntegrationEventHandlerSubscriptions(
      moduleTree,
      dependencyInjections,
    );
    return integrationEventHandlerSubscriptions.generateSubscriptions({
      componentHandlerNodeType: BitloopsTypesMapping.TIntegrationEventHandler,
      busIdentifier: 'integrationEventBus',
      busGetterFunction: 'Container.getIntegrationEventBus()',
      componentClassType: ClassTypes.IntegrationEvent,
    });
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
