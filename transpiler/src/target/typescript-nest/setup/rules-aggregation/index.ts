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
import { TDomainRule } from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';

import {
  getTargetFileDestination,
  getTargetFileName,
} from '../../helpers/getTargetFileDestination.js';
import { TSetupOutput } from '../setup-typescript.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../helpers/mappings.js';

interface IRulesAggregator {
  generateRules(model: TBoundedContexts): TSetupOutput[];
}

// const esmEnabled = false;

export class RulesAggregator implements IRulesAggregator {
  constructor(
    private readonly bitloopsModel: TBoundedContexts,
    private readonly license?: string,
  ) {}
  generateRules(): TSetupOutput[] {
    const classTypeName = ClassTypes.DomainRule;
    const namespaceName = `${classTypeName}s`;
    const output = [];
    for (const [boundedContextName, boundedContext] of Object.entries(this.bitloopsModel)) {
      for (const [moduleName, module] of Object.entries(boundedContext)) {
        // Gather all domain rules of the module
        const domainRules = module.getRootChildrenNodesValueByType<TDomainRule>(
          BitloopsTypesMapping.TDomainRule,
        );

        let imports = '';
        let content = `export namespace ${namespaceName} {`;
        const filePathObj = getTargetFileDestination(
          boundedContextName,
          moduleName,
          classTypeName,
          namespaceName,
        );

        for (const domainRule of domainRules) {
          const className = domainRule.DomainRule.domainRuleIdentifier;
          const classNameWithoutRule = className.split('Rule')[0];
          const fileName = getTargetFileName(className, classTypeName);
          imports += `import { ${className} as ${classNameWithoutRule} } from './${fileName}';`;
          content += `export class ${className} extends ${classNameWithoutRule} {}`;
        }
        content += '}';
        const finalContent = imports + content;
        output.push({
          fileType: classTypeName,
          fileId: `${filePathObj.path}index.ts`,
          content: (this.license || '') + finalContent,
        });
      }
    }
    return output;
  }
}
