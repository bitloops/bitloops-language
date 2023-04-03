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
import { kebabCase, pascalCase } from '../../../../utils/caseStyles.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';
import { TSetupOutput } from '../setup-typescript.js';
import { ClassTypes } from '../../../../helpers/mappings.js';
import { TSetupTypeMapper } from '../fileDestinations.js';
import { HandlersAggregator } from '../handlers-aggregation/handlers-aggregation.handler.js';

interface IHandlersAggregator {
  handle(): TSetupOutput[];
}

export class NestModuleDeclaration implements IHandlersAggregator {
  static readonly FILE_NAME = (moduleName: string): string => `${kebabCase(moduleName)}.module.ts`;
  constructor(
    private readonly bitloopsModel: TBoundedContexts,
    private readonly setupTypeMapper: TSetupTypeMapper,
  ) {}

  handle(): TSetupOutput[] {
    const result: TSetupOutput[] = [];

    for (const [boundedContextName, boundedContext] of Object.entries(this.bitloopsModel)) {
      for (const moduleName of Object.keys(boundedContext)) {
        const moduleFileContent = this.generateModuleFileContent(moduleName);

        const fileName = `./src/${this.setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/${NestModuleDeclaration.FILE_NAME(moduleName)}`;

        result.push({
          fileId: fileName,
          fileType: 'nest.module.ts',
          content: moduleFileContent,
          context: {
            boundedContextName,
            moduleName,
          },
        });
      }
    }
    return result;
  }

  private generateModuleFileContent(moduleName: string): string {
    let fileImports = "import { Module, Provider } from '@nestjs/common';";
    fileImports += this.generateHandlersIndexImports();

    const nestModuleName = pascalCase(moduleName) + 'Module';
    return (
      fileImports +
      `
    @Module({})
      export class ${nestModuleName} {
        static register(options: { inject: Provider<any>[]; imports: any[] }) {
          const InjectedProviders = options.inject || [];
          return {
            module: ${nestModuleName},
            imports: [
              ...options.imports,
            ],
            providers: [
              ...${HandlersAggregator.IDENTIFIERS.PUB_SUB_COMMAND_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.STREAMING_COMMAND_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.QUERY_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.STREAMING_DOMAIN_EVENT_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.STREAMING_INTEGRATION_EVENT_HANDLERS},
              ...InjectedProviders,
            ],
            exports: [
              ...${HandlersAggregator.IDENTIFIERS.PUB_SUB_COMMAND_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.STREAMING_COMMAND_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.QUERY_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.STREAMING_DOMAIN_EVENT_HANDLERS},
              ...${HandlersAggregator.IDENTIFIERS.STREAMING_INTEGRATION_EVENT_HANDLERS},
            ],
          };
        }
      }
      `
    );
  }

  private generateHandlersIndexImports(): string {
    const commandHandlers = HandlersAggregator.getIndexFilePathFromModuleRoot(
      ClassTypes.CommandHandler,
    );
    const importPathCommandHandlers = `./${commandHandlers.filePath}`;
    const queryHandlers = HandlersAggregator.getIndexFilePathFromModuleRoot(
      ClassTypes.QueryHandler,
    );
    const importPathQueryHandlers = `./${queryHandlers.filePath}`;

    const domainEventHandlers = HandlersAggregator.getIndexFilePathFromModuleRoot(
      ClassTypes.DomainEventHandler,
    );
    const importPathDomainEventHandlers = `./${domainEventHandlers.filePath}`;

    const integrationEventHandlers = HandlersAggregator.getIndexFilePathFromModuleRoot(
      ClassTypes.IntegrationEventHandler,
    );

    const importPathIntegrationEventHandlers = `./${integrationEventHandlers.filePath}`;
    return `
    import { 
      ${HandlersAggregator.IDENTIFIERS.PUB_SUB_COMMAND_HANDLERS}, 
      ${HandlersAggregator.IDENTIFIERS.STREAMING_COMMAND_HANDLERS} 
    } from '${importPathCommandHandlers}'
    import { ${HandlersAggregator.IDENTIFIERS.QUERY_HANDLERS} } from '${importPathQueryHandlers}'
    import { ${HandlersAggregator.IDENTIFIERS.STREAMING_DOMAIN_EVENT_HANDLERS} } from '${importPathDomainEventHandlers}'
    import { ${HandlersAggregator.IDENTIFIERS.STREAMING_INTEGRATION_EVENT_HANDLERS} } from '${importPathIntegrationEventHandlers}'
    `;
  }
}
