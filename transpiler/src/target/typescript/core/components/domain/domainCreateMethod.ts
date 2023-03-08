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
import {
  BitloopsTypesMapping,
  ClassTypes,
  TClassTypesValues,
} from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { internalConstructor } from './index.js';
import { keysToTypeMapping } from '../statements/index.js';

export const domainCreate = (
  variable: TDomainCreateMethod,
  classType: TClassTypesValues = ClassTypes.ValueObject,
): TTargetDependenciesTypeScript => {
  const { parameter, returnType, statements } = variable.create;

  const parameterType = parameter.type;
  const returnOkType = returnType.ok.type;

  const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: parameterType },
  });

  const { output: returnOkTypeName, dependencies: returnOkTypeDependencies } =
    modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: returnOkType },
    });

  const producedConstructor = internalConstructor(propsName, classType);

  let statementsModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const returnTypeModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: { returnType },
  });

  // TODO move this to model to model
  const hasReturnStatements: boolean =
    statements.filter(
      (statement) =>
        keysToTypeMapping[Object.keys(statement)[0]] === BitloopsTypesMapping.TReturnStatement ||
        keysToTypeMapping[Object.keys(statement)[0]] === BitloopsTypesMapping.TReturnOKStatement ||
        keysToTypeMapping[Object.keys(statement)[0]] === BitloopsTypesMapping.TReturnErrorStatement,
    ).length > 0;
  if (!hasReturnStatements || statements.length === 0) {
    statementsModel = {
      output: statementsModel.output.concat(`return ok(new ${returnOkTypeName}(props));`),
      dependencies: statementsModel.dependencies,
    };
  }

  const parameterValue = parameter.value;
  const result = `${producedConstructor} public static create(${parameterValue}: ${propsName}): ${returnTypeModel.output} { ${statementsModel.output} }`;

  return {
    output: result,
    dependencies: [
      ...returnTypeModel.dependencies,
      ...statementsModel.dependencies,
      ...propsTypeDependencies,
      ...returnOkTypeDependencies,
    ],
  };
};
