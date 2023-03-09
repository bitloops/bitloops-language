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
  TReadModel,
  TTargetDependenciesTypeScript,
  TVariables,
  fieldKey,
  fieldsKey,
  identifierKey,
  optionalKey,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { isArray, isUndefined } from '../../../../../helpers/typeGuards.js';
import { getParentDependencies } from '../../dependencies.js';

const readModelToTargetLanguage = (readModel: TReadModel): TTargetDependenciesTypeScript => {
  let result = '';
  const dependencies = [];

  const { fields, readModelIdentifier } = readModel.ReadModel;
  guardAgainstUndefinedAndArray({ fields });

  const readModelTypeName = getReadModelTypeName(readModelIdentifier);

  const fieldIntermediateModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: fields,
  });
  dependencies.push(...fieldIntermediateModel.dependencies);
  const readModelAttributes = generateReadModelAttributes({ fields });
  dependencies.push(...readModelAttributes.dependencies);

  result += `export type ${readModelTypeName} = { ${fieldIntermediateModel.output} };`;

  result += `export class ${readModelIdentifier} { `;
  result += readModelAttributes.output;
  result += `constructor(public props: ${readModelTypeName}) {
    ${generateConstructorBody({ fields })}
  }`;
  result += getFromPrimitivesResult(readModelIdentifier, readModelTypeName);
  result += '}';

  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.ReadModel,
    className: readModelIdentifier,
  });

  return { output: result, dependencies: parentDependencies };
};

const generateReadModelAttributes = (fields: TVariables): TTargetDependenciesTypeScript => {
  let result = '';
  const dependencies = [];
  for (const field of fields[fieldsKey]) {
    const isOptional = field[fieldKey][optionalKey];
    const fieldIdentifier = field[fieldKey][identifierKey];
    const { type } = field[fieldKey];

    const mappedType = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type },
    });
    result += `public ${fieldIdentifier}${isOptional ? '?' : ''}: ${mappedType.output};`;
    dependencies.push(...mappedType.dependencies);
  }
  return {
    output: result,
    dependencies,
  };
};

const generateConstructorBody = (fields: TVariables): string => {
  let result = '';
  for (const field of fields[fieldsKey]) {
    const fieldIdentifier = field[fieldKey][identifierKey];
    result += `this.${fieldIdentifier} = props.${fieldIdentifier};`;
  }
  return result;
};

const guardAgainstUndefinedAndArray = (variables: TVariables): void => {
  if (isUndefined(variables)) {
    throw new Error('Variables of Read Model are not defined');
  }
  if (!isArray(variables[fieldsKey])) {
    throw new Error('Variables of Read Model are not array');
  }
};

const getReadModelTypeName = (readModelIdentifier: string): string => {
  return `T${readModelIdentifier}Snapshot`;
};

const getFromPrimitivesResult = (
  readModelIdentifier: string,
  readModelTypeName: string,
): string => {
  let result = `static fromPrimitives(snapshot: ${readModelTypeName}): ${readModelIdentifier} {`;
  result += `return new ${readModelIdentifier}(snapshot);`;
  result += '}';
  return result;
};

export { readModelToTargetLanguage };
