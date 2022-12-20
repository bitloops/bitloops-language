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
import { TDomainCreateMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { internalConstructor } from './index.js';
import { isThisDeclaration } from '../../../../../helpers/typeGuards.js';

export const domainCreate = (variable: TDomainCreateMethod): TTargetDependenciesTypeScript => {
  const { parameter, returnType, statements } = variable.create;

  const statementsResult = {
    thisStatements: [],
    restStatements: [],
  };
  /**
   * this.name = props
   */

  for (const statement of statements) {
    if (isThisDeclaration(statement)) {
      // TODO change to isThis expression??
      statementsResult.thisStatements.push(statement);
    } else {
      statementsResult.restStatements.push(statement);
    }
  }

  const propsNameType = parameter.type;
  const returnOkType = returnType.ok.type;

  const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: propsNameType,
  });

  const { output: returnOkTypeName, dependencies: returnOkTypeDependencies } =
    modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: returnOkType,
    });

  const producedConstructor = internalConstructor(
    propsName,
    statementsResult.thisStatements,
    ClassTypes.ValueObject,
  );

  let statementsModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statementsResult.restStatements,
  });

  const parameterModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameter,
    value: { parameter },
  });

  const returnTypeModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: { returnType },
  });

  const statementValues = statements.map((statement) => statement.valueOf());
  const hasReturnStatements: boolean =
    statementValues.filter(
      (statement) => Object.keys(statement)[0] === BitloopsTypesMapping.TReturnStatement,
    ).length === 0;
  if (hasReturnStatements || statements.length === 0) {
    statementsModel = {
      output: statementsModel.output.concat(`return ok(new ${returnOkTypeName}(props));`),
      dependencies: statementsModel.dependencies,
    };
  }

  const result = `${producedConstructor.output} public static create(${parameterModel.output}): ${returnTypeModel.output} { ${statementsModel.output} }`;

  return {
    output: result,
    dependencies: [
      ...parameterModel.dependencies,
      ...producedConstructor.dependencies,
      ...returnTypeModel.dependencies,
      ...statementsModel.dependencies,
      ...propsTypeDependencies,
      ...returnOkTypeDependencies,
    ],
  };
};
