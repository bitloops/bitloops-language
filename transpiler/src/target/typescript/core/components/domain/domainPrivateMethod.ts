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
import { bitloopsTypeToLangMapping } from '../../../../../helpers/bitloopsPrimitiveToLang.js';
import { isBitloopsPrimitive } from '../../../../../helpers/isBitloopsPrimitive.js';
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { isOkErrorReturnType } from '../../../../../helpers/typeGuards.js';
import { TDomainPrivateMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const domainPrivateMethod = (
  methodName: string,
  methodInfo: TDomainPrivateMethod,
): TTargetDependenciesTypeScript => {
  const { privateMethod } = methodInfo;
  if (!privateMethod) return { output: '', dependencies: [] };
  const { statements } = privateMethod;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });
  const parametersString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: methodInfo.privateMethod.parameterDependencies,
  });
  let mappedReturnType = { output: methodInfo.privateMethod.returnType, dependencies: [] };

  if (isOkErrorReturnType(mappedReturnType.output)) {
    mappedReturnType = modelToTargetLanguage({
      type: BitloopsTypesMapping.TOkErrorReturnType,
      value: mappedReturnType,
    });
  } else {
    if (isBitloopsPrimitive(mappedReturnType.output)) {
      mappedReturnType = {
        output: bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](mappedReturnType.output),
        dependencies: [],
      };
    }
  }
  const ToLanguageMapping = (
    methodName: string,
    returnType: string,
    parametersString: string,
    methodStatements: string,
  ): string => {
    return `private ${methodName}${parametersString}: ${returnType} { ${methodStatements} }`;
  };
  const result = ToLanguageMapping(
    methodName,
    mappedReturnType.output as string,
    parametersString.output,
    statementsString.output,
  );
  return {
    output: result,
    dependencies: [...parametersString.dependencies, ...statementsString.dependencies],
  };
};
export { domainPrivateMethod };
