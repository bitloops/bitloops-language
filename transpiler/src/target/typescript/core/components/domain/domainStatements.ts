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
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import {
  TStatements,
  TTargetDependenciesTypeScript,
  TThisDeclaration,
} from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

// TODO move this.props addition to second model
// if else wrapping of evaluations is not working in domain statements
export const domainStatementsToTargetLanguage = (
  statements: TStatements,
): TTargetDependenciesTypeScript => {
  let finalDependencies = [];
  let finalOutput = '';
  for (const statement of statements) {
    let result;
    // eslint-disable-next-line no-prototype-builtins
    if (statement.hasOwnProperty('thisDeclaration')) {
      result = domainThisDeclarationToTargetLanguage(statement as TThisDeclaration);
    } else {
      result = modelToTargetLanguage({
        type: BitloopsTypesMapping.TStatement,
        value: statement,
      });
    }
    finalDependencies = [...finalDependencies, ...result.dependencies];
    finalOutput += result.output + ';';
  }
  return { output: finalOutput, dependencies: finalDependencies };
};

const domainThisDeclarationToTargetLanguage = (
  variable: TThisDeclaration,
): TTargetDependenciesTypeScript => {
  const { name: variableName, expression } = variable.thisDeclaration;

  const expressionResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: { expression },
  });
  const thisDeclarationName = variableName.split('this.')[1];
  const finalName = `this.props.${thisDeclarationName}`;

  const thisResult = `${finalName} = ${expressionResult.output}`;

  return { output: thisResult, dependencies: expressionResult.dependencies };
};