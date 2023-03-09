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
import { kebabCase } from '../../../../utils/caseStyles.js';
import { TContextData, TDependencyInjection } from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';
import { getFilePathRelativeToModule } from '../../helpers/getTargetFileDestination.js';
import { TSetupOutput } from '../index.js';
import { ClassTypes, TClassTypesValues } from '../../../../helpers/mappings.js';
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

export type TComponentSubscriptionDependency = {
  type: 'di' | TClassTypesValues;
  identifier: string;
  contextInfo?: TContextData;
};
export type TComponentSubscriptionDependencies = TComponentSubscriptionDependency[];
export type ComponentSubscriptionsResult = {
  output: string;
  dependencies: TComponentSubscriptionDependencies;
};

export class SubscriptionsHandler implements ISubscriptionsHandler {
  private readonly subscriptionComponentHandlers = [
    CommandHandlerSubscriptions,
    QueryHandlerSubscriptions,
    DomainEventHandlerSubscriptions,
    IntegrationEventHandlerSubscriptions,
  ];
  generateSubscriptions(
    elementsPerBoundedContext: TSetupElementsPerModule,
    bitloopsModel: TBoundedContexts,
    setupTypeMapper: TSetupTypeMapper,
    license?: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl

    const methodName = 'setUpSubscriptions';
    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const [moduleName, moduleTree] of Object.entries(boundedContext)) {
        const subscriptionsFileId = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/subscriptions/index.ts`;

        const DIs =
          elementsPerBoundedContext.dependencyInjections?.[boundedContextName]?.[moduleName] ?? [];

        if (DIs.length === 0) {
          continue;
        }
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
    elementsPerBoundedContext: TSetupElementsPerModule,
  ): Array<{ boundedContextName: string; moduleName: string }> {
    const res = [];
    for (const [boundedContextName, boundedContext] of Object.entries(bitloopsModel)) {
      for (const moduleName of Object.keys(boundedContext)) {
        const DIs =
          elementsPerBoundedContext.dependencyInjections?.[boundedContextName]?.[moduleName] ?? [];

        if (DIs.length === 0) {
          continue;
        }
        res.push({ boundedContextName, moduleName });
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
    let methodBody = '';
    const allDependencies = [];

    for (const Handler of this.subscriptionComponentHandlers) {
      const handlerSubscriptions = new Handler(moduleTree, dependencyInjections);
      const subscriptions = handlerSubscriptions.generateSubscriptions();
      methodBody += subscriptions.output;
      allDependencies.push(...subscriptions.dependencies);
    }

    return {
      output: methodName + methodBody + '\n\n}\n',
      dependencies: allDependencies,
    };
  }

  private generateImports(dependencies: TComponentSubscriptionDependencies): string {
    let result = '';
    for (const dependency of this.removeDuplicateDependencies(dependencies)) {
      const { type, identifier } = dependency;
      if (type === 'di') {
        result += `import { ${identifier} } from '../DI';\n`;
        continue;
      }

      if (type === ClassTypes.IntegrationEvent) {
        result += this.generateCrossModuleImport(type, dependency);
        continue;
      }
      const childPathObj = getFilePathRelativeToModule(type, identifier);
      const childPath = childPathObj.path;
      const filename = childPathObj.filename + (esmEnabled ? '.js' : '');
      result += `import { ${identifier} } from '../${childPath}${filename}';\n`;
    }
    return result;
  }

  private generateCrossModuleImport(
    type: TClassTypesValues,
    dependency: TComponentSubscriptionDependency,
  ): string {
    const { identifier, contextInfo } = dependency;
    const childPathObj = getFilePathRelativeToModule(type, identifier, contextInfo);
    const childPath = childPathObj.path;
    const filename = childPathObj.filename + (esmEnabled ? '.js' : '');
    return `import { ${identifier} } from '../../../${childPath}${filename}';\n`;
  }

  private removeDuplicateDependencies(
    dependencies: TComponentSubscriptionDependencies,
  ): TComponentSubscriptionDependencies {
    const result: TComponentSubscriptionDependencies = [];
    const identifiers: Set<string> = new Set();
    for (const dependency of dependencies) {
      if (identifiers.has(dependency.identifier)) {
        continue;
      }
      result.push(dependency);
      identifiers.add(dependency.identifier);
    }
    return result;
  }
}
