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
import { SupportedLanguages } from '../../../../../../helpers/supportedLanguages.js';
import { TRESTControllerExecute } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const getDependencyType = (dependency: string): string => {
  if (dependency === 'request' || dependency === 'req') return 'FastifyRequest';
  else if (dependency === 'response' || dependency === 'reply' || dependency === 'rep')
    return 'FastifyReply';
  else return 'any';
};

const buildExecuteMethod = (
  execute: TRESTControllerExecute,
  targetLanguage: string,
  contextData?: { boundedContext: string; module: string },
): string => {
  const typedExecuteDependencies = execute.dependencies.map(
    (dependency) => `${dependency}: ${getDependencyType(dependency)}`,
  );
  const paramsString = `(${typedExecuteDependencies.join(', ')})`;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: execute.statements,
    targetLanguage,
    contextData,
  });

  const executeToLangMapping = {
    [SupportedLanguages.TypeScript]: (paramsString: string, statementsString: string): string => {
      return `async executeImpl${paramsString}: Promise<void> { ${statementsString} }`;
    },
  };

  return executeToLangMapping[targetLanguage](paramsString, statementsString);
};

export { buildExecuteMethod };
