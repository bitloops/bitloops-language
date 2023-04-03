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
  TServicePort,
  TRepoPort,
  ServicePortIdentifierKey,
  repoPortIdentifierKey,
} from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';
import { TSetupOutput } from '../setup-typescript.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { getTokenName } from '../../core/components/token-injections/index.js';
import { BUSES_TOKENS } from '../../core/components/handler-constructor/buses.js';

interface IDependencyInjectionsGenerator {
  handle(): TSetupOutput[];
}

export class DITokensGenerator implements IDependencyInjectionsGenerator {
  private readonly FILE_NAME = 'constants.ts';
  constructor(
    private readonly bitloopsModel: TBoundedContexts,
    private readonly setupTypeMapper: Record<string, string>,
  ) {}
  handle(): TSetupOutput[] {
    const result: TSetupOutput[] = [];
    // For each module in each bounded context generate 1 DI file that contains all
    // the use cases and controllers of that module that are concreted in the setup.bl

    for (const [boundedContextName, boundedContext] of Object.entries(this.bitloopsModel)) {
      for (const [moduleName, moduleTree] of Object.entries(boundedContext)) {
        const diFileName = `./src/${this.setupTypeMapper.BOUNDED_CONTEXTS}/${kebabCase(
          boundedContextName,
        )}/${kebabCase(moduleName)}/${this.FILE_NAME}`;
        // Gather all imports

        const diContent = this.generateDIFileBody(moduleTree);

        result.push({
          fileId: diFileName,
          fileType: 'DI.Tokens',
          content: diContent,
          context: {
            boundedContextName,
            moduleName,
          },
        });
      }
    }
    return result;
  }

  private generateDIFileBody(moduleTree: IntermediateASTTree): string {
    let result = this.generateBusTokens();
    const servicePorts = moduleTree.getRootChildrenNodesValueByType<TServicePort>(
      BitloopsTypesMapping.TServicePort,
    );
    for (const servicePort of servicePorts) {
      const servicePortIdentifier = servicePort.ServicePort[ServicePortIdentifierKey];
      result += this.generateToken(servicePortIdentifier);
      result += '\n';
    }
    const repoPorts = moduleTree.getRootChildrenNodesValueByType<TRepoPort>(
      BitloopsTypesMapping.TRepoPort,
    );
    for (const repoPort of repoPorts) {
      const repoPortIdentifier = repoPort.RepoPort[repoPortIdentifierKey];
      result += this.generateToken(repoPortIdentifier);
      result += '\n';
    }
    return result;
  }

  private generateBusTokens(): string {
    let result = '';
    for (const busType of Object.values(BUSES_TOKENS)) {
      const token = getTokenName(busType);
      result += `export const ${token} = Symbol('${token}');`;
      result += '\n';
    }
    return result;
  }

  private generateToken(identifier: string): string {
    const token = getTokenName(identifier);
    return `export const ${token} = Symbol('${token}');`;
  }
}
