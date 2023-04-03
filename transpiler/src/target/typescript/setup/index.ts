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
import prettier from 'prettier';
import path from 'path';
import { SetupTypeScript } from './SetupTypeScript.js';

import {
  IIntermediateSetupASTToTarget,
  TargetSetupGeneratorError,
  TTargetSetupContent,
} from '../../types.js';
import { IntermediateAST } from '../../../ast/core/types.js';
import { TTranspileOptions } from '../../../transpilerTypes.js';
import { setupTypeMapper, TSetupFileType } from './fileDestinations.js';
import { DITokensGenerator } from './dependency-injection-tokens/di-tokens.handler.js';
import { HandlersAggregator } from './handlers-aggregation/handlers-aggregation.handler.js';
import { NestModuleDeclaration } from './module-declaration/module-declaration.handler.js';

export type TSetupOutput = {
  fileId: string;
  fileType: TSetupFileType;
  content: string;
  context?: any;
};

const license = `/**
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
`; // TODO get this dynamically from the config file

export class IntermediateSetupASTToTarget implements IIntermediateSetupASTToTarget {
  generateSetupFiles = (
    params: IntermediateAST,
    options: TTranspileOptions,
  ): TTargetSetupContent[] | TargetSetupGeneratorError => {
    const { setup: _setup, core } = params;
    const bitloopsModel = core;

    const formatterConfig = options.formatterConfig ?? {
      semi: true,
      parser: 'typescript',
      singleQuote: true,
    };

    const result: TTargetSetupContent[] = [];
    // console.log('Generating system files...');
    const setupGenerator = new SetupTypeScript();
    const pathsAndContents: TSetupOutput[] = [];

    // Step 1 Generate DI Tokens
    const diTokensGenerator = new DITokensGenerator(bitloopsModel, setupTypeMapper, license);
    pathsAndContents.push(...diTokensGenerator.handle());
    // console.log('--------------------------------');

    // Step 2 Generate index files for every handler type
    const indexHandlerAggregator = new HandlersAggregator(bitloopsModel, setupTypeMapper, license);
    pathsAndContents.push(...indexHandlerAggregator.handle());

    // Step 3 Generate nestjs module
    const nestjsModule = new NestModuleDeclaration(bitloopsModel, setupTypeMapper, license);
    pathsAndContents.push(...nestjsModule.handle());

    // Step 4. Generate domain and application errors
    const appDomainErrors = setupGenerator.generateAppDomainErrors(core);
    appDomainErrors.forEach((appDomainError) => {
      // console.log('appDomainError:', appDomainError);
      pathsAndContents.push(appDomainError);
    });

    // Step 5. Generate rules
    const rules = setupGenerator.generateRules(core);
    rules.forEach((rule) => {
      // console.log('rule:', rule);
      pathsAndContents.push(rule);
    });

    // Step 6. Write files
    pathsAndContents.forEach((pathAndContent) => {
      const { fileType, content, fileId } = pathAndContent;
      if (setupTypeMapper[fileType] === undefined)
        throw new Error(`File type ${fileType} not supported!`);
      result.push({
        fileId: path.normalize(`./${setupTypeMapper[fileType]}${fileId}`),
        fileType: fileType,
        fileContent: prettier.format(content, formatterConfig),
      });
    });

    return result;
  };
}
