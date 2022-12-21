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
import { hasOkErrorReturnType } from '../../../../../helpers/typeGuards.js';
import { TDomainPrivateMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const domainPrivateMethod = (methodInfo: TDomainPrivateMethod): TTargetDependenciesTypeScript => {
  const { privateMethod } = methodInfo;
  if (!privateMethod) return { output: '', dependencies: [] };
  const { statements } = privateMethod;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const parametersTarget = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters: methodInfo.privateMethod.parameters },
  });
  const privateMethodValues = methodInfo.privateMethod;
  let mappedReturnType;

  if (hasOkErrorReturnType(privateMethodValues)) {
    const resOkErrorReturnType = modelToTargetLanguage({
      type: BitloopsTypesMapping.TOkErrorReturnType,
      value: { returnType: privateMethodValues.returnType },
    });
    mappedReturnType = {
      output: resOkErrorReturnType.output,
      dependencies: resOkErrorReturnType.dependencies,
    };
  } else {
    mappedReturnType = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: privateMethodValues.type },
    });
  }

  const methodName = privateMethod.identifier;
  const parametersString = parametersTarget.output;
  const returnType = mappedReturnType.output;
  const methodStatements = statementsString.output;

  return {
    output: `private ${methodName}${parametersString}: ${returnType} { ${methodStatements} }`,
    dependencies: [
      ...parametersTarget.dependencies,
      ...statementsString.dependencies,
      ...mappedReturnType.dependencies,
    ],
  };
};
export { domainPrivateMethod };
