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
  TCommandHandler,
  commandHandlerKey,
  identifierKey,
  TQueryHandler,
  queryHandlerKey,
  TDomainEventHandler,
  TIntegrationEventHandler,
} from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';
import { TSetupOutput } from '../index.js';
import {
  BitloopsTypesMapping,
  ClassTypes,
  TClassTypesValues,
} from '../../../../helpers/mappings.js';
import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { TSetupTypeMapper } from '../fileDestinations.js';
import { ClassTypesPaths } from '../../helpers/getTargetFileDestination.js';

interface IHandlersAggregator {
  handle(): TSetupOutput[];
}

export class HandlersAggregator implements IHandlersAggregator {
  static readonly FILE_NAME = 'index';
  constructor(
    private readonly bitloopsModel: TBoundedContexts,
    private readonly setupTypeMapper: TSetupTypeMapper,
    private readonly license?: string,
  ) {}
  static IDENTIFIERS = {
    PUB_SUB_COMMAND_HANDLERS: 'PubSubCommandHandlers',
    STREAMING_COMMAND_HANDLERS: 'StreamingCommandHandlers',
    QUERY_HANDLERS: 'QueryHandlers',
    STREAMING_DOMAIN_EVENT_HANDLERS: 'StreamingDomainEventHandlers',
    STREAMING_INTEGRATION_EVENT_HANDLERS: 'StreamingIntegrationEventHandlers',
    EVENT_HANDLERS: 'EventHandlers',
  };
  handle(): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl

    for (const [boundedContextName, boundedContext] of Object.entries(this.bitloopsModel)) {
      for (const [moduleName, moduleTree] of Object.entries(boundedContext)) {
        // Gather all imports

        result.push(
          this.generateCommandHandlerIndexFile(moduleTree, boundedContextName, moduleName),
        );
        result.push(this.generateQueryHandlerIndexFile(moduleTree, boundedContextName, moduleName));

        result.push(
          this.generateDomainEventHandlersIndexFile(moduleTree, boundedContextName, moduleName),
        );
        result.push(
          this.generateIntegrationEventHandlersIndexFile(
            moduleTree,
            boundedContextName,
            moduleName,
          ),
        );
      }
    }
    return result;
  }

  private generateCommandHandlerIndexFile(
    moduleTree: IntermediateASTTree,
    boundedContextName: string,
    moduleName: string,
  ): TSetupOutput {
    let result = '';
    const commandHandlers = moduleTree.getRootChildrenNodesValueByType<TCommandHandler>(
      BitloopsTypesMapping.TCommandHandler,
    );
    const commandHandlerIdentifiers: string[] = commandHandlers.map(
      (commandHandler) => commandHandler[commandHandlerKey][identifierKey],
    );
    const imports = commandHandlerIdentifiers
      .map((identifier) => {
        return `import { ${identifier} } from './${identifier}';`;
      })
      .join('\n');
    result += `export const ${
      HandlersAggregator.IDENTIFIERS.PUB_SUB_COMMAND_HANDLERS
    } = [${commandHandlerIdentifiers.join(', ')}];`;

    result += `export const ${
      HandlersAggregator.IDENTIFIERS.STREAMING_COMMAND_HANDLERS
    } = [${commandHandlerIdentifiers.join(', ')}];`;

    const { filePath, fileExtension } = HandlersAggregator.getIndexFilePath(
      boundedContextName,
      moduleName,
      ClassTypes.CommandHandler,
      this.setupTypeMapper,
    );

    return {
      fileId: filePath + '.' + fileExtension,
      fileType: 'index.ts',
      content: (this.license || '') + imports + result,
      context: {
        boundedContextName,
        moduleName,
      },
    };
  }

  private generateQueryHandlerIndexFile(
    moduleTree: IntermediateASTTree,
    boundedContextName: string,
    moduleName: string,
  ): TSetupOutput {
    let result = '';
    const queryHandlers = moduleTree.getRootChildrenNodesValueByType<TQueryHandler>(
      BitloopsTypesMapping.TQueryHandler,
    );
    const queryHandlerIdentifiers: string[] = queryHandlers.map(
      (queryHandler) => queryHandler[queryHandlerKey][identifierKey],
    );

    const imports = queryHandlerIdentifiers
      .map((identifier) => {
        return `import { ${identifier} } from './${identifier}';`;
      })
      .join('\n');

    result += `export const ${
      HandlersAggregator.IDENTIFIERS.QUERY_HANDLERS
    } = [${queryHandlerIdentifiers.join(', ')}];`;

    const { filePath, fileExtension } = HandlersAggregator.getIndexFilePath(
      boundedContextName,
      moduleName,
      ClassTypes.QueryHandler,
      this.setupTypeMapper,
    );
    return {
      fileId: filePath + '.' + fileExtension,
      fileType: 'index.ts',
      content: (this.license || '') + imports + result,
      context: {
        boundedContextName,
        moduleName,
      },
    };
  }

  private generateDomainEventHandlersIndexFile(
    moduleTree: IntermediateASTTree,
    boundedContextName: string,
    moduleName: string,
  ): TSetupOutput {
    let result = '';
    const domainEventHandlers = moduleTree.getRootChildrenNodesValueByType<TDomainEventHandler>(
      BitloopsTypesMapping.TDomainEventHandler,
    );
    const domainEventHandlerIdentifiers: string[] = domainEventHandlers.map(
      (domainEventHandler) => domainEventHandler.domainEventHandler.domainEventHandlerIdentifier,
    );
    const imports = domainEventHandlerIdentifiers
      .map((identifier) => {
        return `import { ${identifier} } from './${identifier}';`;
      })
      .join('\n');

    result += `export const ${
      HandlersAggregator.IDENTIFIERS.STREAMING_DOMAIN_EVENT_HANDLERS
    } = [${domainEventHandlerIdentifiers.join(', ')}];`;

    const { filePath, fileExtension } = HandlersAggregator.getIndexFilePath(
      boundedContextName,
      moduleName,
      ClassTypes.DomainEventHandler,
      this.setupTypeMapper,
    );

    return {
      fileId: filePath + '.' + fileExtension,
      fileType: 'index.ts',
      content: (this.license || '') + imports + result,
      context: {
        boundedContextName,
        moduleName,
      },
    };
  }

  private generateIntegrationEventHandlersIndexFile(
    moduleTree: IntermediateASTTree,
    boundedContextName: string,
    moduleName: string,
  ): TSetupOutput {
    let result = '';
    const integrationEventHandlers =
      moduleTree.getRootChildrenNodesValueByType<TIntegrationEventHandler>(
        BitloopsTypesMapping.TIntegrationEventHandler,
      );
    const integrationEventHandlerIdentifiers: string[] = integrationEventHandlers.map(
      (integrationEventHandler) =>
        integrationEventHandler.integrationEventHandler.integrationEventHandlerIdentifier,
    );
    const imports = integrationEventHandlerIdentifiers
      .map((identifier) => {
        return `import { ${identifier} } from './${identifier}';`;
      })
      .join('\n');

    result += `export const ${
      HandlersAggregator.IDENTIFIERS.STREAMING_INTEGRATION_EVENT_HANDLERS
    } = [${integrationEventHandlerIdentifiers.join(', ')}];`;

    const { filePath, fileExtension } = HandlersAggregator.getIndexFilePath(
      boundedContextName,
      moduleName,
      ClassTypes.IntegrationEventHandler,
      this.setupTypeMapper,
    );

    return {
      fileId: filePath + '.' + fileExtension,
      fileType: 'index.ts',
      content: (this.license || '') + imports + result,
      context: {
        boundedContextName,
        moduleName,
      },
    };
  }

  static getIndexFilePath(
    boundedContextName: string,
    moduleName: string,
    classType: TClassTypesValues,
    setupTypeMapper: TSetupTypeMapper,
  ): { filePath: string; fileExtension: string } {
    const modulePath = `./src/${setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
      boundedContextName,
    )}/${kebabCase(moduleName)}`;
    const fileName = `${modulePath}/${ClassTypesPaths[classType] + this.FILE_NAME}`;

    return {
      filePath: fileName,
      fileExtension: 'ts',
    };
  }
}
