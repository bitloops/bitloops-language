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
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import {
  TAnonymousFunction,
  TReturnStatement,
  TStatementsObj,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

class ArrowFunctionGuards {
  static hasReturnStatementBody(
    arrowFunctionBody: TReturnStatement | TStatementsObj,
  ): arrowFunctionBody is TReturnStatement {
    return 'return' in arrowFunctionBody;
  }

  static hasStatementsBody(
    arrowFunctionBody: TReturnStatement | TStatementsObj,
  ): arrowFunctionBody is TStatementsObj {
    return 'statements' in arrowFunctionBody;
  }
}

export const anonymousFunctionToTargetLanguage = (
  variable: TAnonymousFunction,
): TTargetDependenciesTypeScript => {
  const { arrowFunctionBody, parameters } = variable.anonymousFunction;

  const parametersString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters },
  });
  const parametersOutput = parametersString.output;

  if (ArrowFunctionGuards.hasReturnStatementBody(arrowFunctionBody)) {
    const { return: returnExpr } = arrowFunctionBody;
    const returnExprString = modelToTargetLanguage({
      type: BitloopsTypesMapping.TExpression,
      value: returnExpr,
    });
    const returnExprOutput = returnExprString.output;
    return {
      output: `${parametersOutput} => (${returnExprOutput})`,
      dependencies: [...returnExprString.dependencies, ...parametersString.dependencies],
    };
  } else if (ArrowFunctionGuards.hasStatementsBody(arrowFunctionBody)) {
    const { statements } = arrowFunctionBody;
    const statementsString = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: statements,
    });
    const methodStatements = statementsString.output;

    return {
      output: `${parametersOutput} => { ${methodStatements} }`,
      dependencies: [...statementsString.dependencies, ...parametersString.dependencies],
    };
  } else {
    throw new Error('Invalid anonymous function body');
  }
};
