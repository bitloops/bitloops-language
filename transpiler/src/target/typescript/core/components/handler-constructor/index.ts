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
  TBitloopsPrimaryType,
  TEventHandlerBusDependencies,
  TParameter,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { getChildDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { INJECT_TOKEN_NEST_DEPENDENCY, getTokenName } from '../token-injections/index.js';
import { getDefaultBusConstructorStatements } from './buses.js';

export const createHandlerConstructor = (
  parameters: TParameter[],
  eventHandlerStandardDependencies?: TEventHandlerBusDependencies,
): TTargetDependenciesTypeScript => {
  let constructorParameters = '';
  const allDependencies = [];
  for (const parameter of parameters) {
    const { output, dependencies } = addRegularConstructorParameterStatement(parameter);
    constructorParameters += output;
    allDependencies.push(...dependencies);
  }

  if (eventHandlerStandardDependencies) {
    const busConstructorStatements = getDefaultBusConstructorStatements(
      eventHandlerStandardDependencies,
    );
    constructorParameters += busConstructorStatements.output;
    allDependencies.push(...busConstructorStatements.dependencies);
  }

  return {
    output: `constructor(${constructorParameters}) {}`,
    dependencies: allDependencies,
  };
};

const addRegularConstructorParameterStatement = (
  parameter: TParameter,
): TTargetDependenciesTypeScript => {
  const { value: identifier, type } = parameter.parameter;
  const primaryType: TBitloopsPrimaryType = { type };

  const mappedType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: primaryType,
  });
  const token = getTokenName(mappedType.output);
  const tokenDependency = getChildDependencies(token);
  const decorator = `@Inject(${token})`;
  const parameterDeclaration = `private readonly ${identifier}: ${mappedType.output}`;
  return {
    output: `${decorator}\n${parameterDeclaration}, `,
    dependencies: [
      ...INJECT_TOKEN_NEST_DEPENDENCY(),
      ...tokenDependency,
      ...mappedType.dependencies,
    ],
  };
};
