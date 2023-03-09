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
import { TDomainPublicMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getDomainMethodReturnTypeTarget } from './domainPrivateMethod.js';

const domainPublicMethod = (methodInfo: TDomainPublicMethod): TTargetDependenciesTypeScript => {
  const { publicMethod } = methodInfo;
  const { statements, parameters } = publicMethod;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const parametersString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters },
  });

  const mappedReturnType = getDomainMethodReturnTypeTarget(methodInfo.publicMethod);

  const methodName = publicMethod.identifier;
  const returnTypeOutput = mappedReturnType.output;
  const parametersOutput = parametersString.output;
  const methodStatements = statementsString.output;

  const isStatic = publicMethod.static;
  const staticKeyWord = isStatic ? 'static ' : '';

  return {
    output: `public ${staticKeyWord} ${methodName}${parametersOutput}: ${returnTypeOutput} { ${methodStatements} }`,
    dependencies: [
      ...statementsString.dependencies,
      ...parametersString.dependencies,
      ...mappedReturnType.dependencies,
    ],
  };
};
export { domainPublicMethod };
