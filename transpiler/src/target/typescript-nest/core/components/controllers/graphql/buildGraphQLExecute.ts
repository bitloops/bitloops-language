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
import {
  TGraphQLControllerExecute,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const buildExecuteMethod = (execute: TGraphQLControllerExecute): TTargetDependenciesTypeScript => {
  // We know that graphql controller takes only 1 object parameter - the incoming args/context etc.
  // aka request - (request.args, ...)
  const paramsString = `(${execute.dependencies.map((dep) => `${dep}: any`).join(', ')})`;
  const model = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: execute.statements,
  });
  const statementsString = model.output;
  return {
    output: `async executeImpl${paramsString}: Promise<any> { ${statementsString} }`,
    dependencies: [...model.dependencies],
  };
};

export { buildExecuteMethod };
