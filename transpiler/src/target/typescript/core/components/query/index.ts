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
  fieldKey,
  fieldsKey,
  identifierKey,
  TQuery,
  TContextData,
  TDependenciesTypeScript,
  TTargetDependenciesTypeScript,
  TVariable,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';

const QUERY_DEPENDENCIES: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'Application',
    from: '@bitloops/bl-boilerplate-core',
  },
];

const queryToTargetLanguage = (
  query: TQuery,
  contextData: TContextData,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = QUERY_DEPENDENCIES;
  const queryValues = query.query;
  const queryName = queryValues[identifierKey];

  const queryTopicExpression = queryValues.queryTopic;
  const queryTopicResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: queryTopicExpression,
  });

  dependencies = [...dependencies, ...queryTopicResult.dependencies];

  const queryTopic = queryTopicResult.output;
  const fields = queryValues[fieldsKey];

  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: fields,
  });
  dependencies = [...dependencies, ...variablesResult.dependencies];

  const QueryInterface = 'Application.Query';
  const contextId = `'${contextData.boundedContext}'`;

  const queryNameDeclaration = `public static readonly queryName = ${queryTopic};`;

  const getQueryTopic = `static getQueryTopic(): string {
      return super.getQueryTopic(${queryName}.queryName, ${contextId});
    }`;

  const dtoTypeName = queryName;
  const queryTypeName = getQueryTypeName(dtoTypeName);
  const queryType = getQueryType(queryTypeName, variablesResult.output);

  const constructorProduced = getConstructor(queryTypeName, queryName, fields, contextId);
  const classProperties = variablesToClassProperties(variablesResult.output);

  result += queryType;
  result += `export class ${queryName} extends ${QueryInterface} {`;
  result += classProperties;
  result += queryNameDeclaration;
  result += constructorProduced;
  result += getQueryTopic;
  result += '}';
  dependencies.push(...variablesResult.dependencies);

  dependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.Query,
    className: queryName,
  });

  return { output: result, dependencies };
};

const getQueryTypeName = (dtoTypeName: string): string => {
  return `T${dtoTypeName}`;
};

const getQueryType = (queryTypeName: string, variablesString: string): string => {
  const type = `type ${queryTypeName} = {
      ${variablesString}
    }
    `;
  return type;
};

const getConstructor = (
  dtoTypeName: string,
  queryName: string,
  fields: TVariable[],
  contextId: string,
): string => {
  const queryNameWithoutSuffix = queryName.replace('Query', '');
  const queryWithLowerCaseStartLetter =
    queryNameWithoutSuffix.charAt(0).toLowerCase() + queryNameWithoutSuffix.slice(1);

  const dtoName = `${queryWithLowerCaseStartLetter}RequestDTO`;
  let constructorValue = `constructor(${dtoName}: ${dtoTypeName}) {
      super(${queryName}.queryName, ${contextId});
    `;

  for (const field of fields) {
    const fieldName = field[fieldKey][identifierKey];
    constructorValue += `this.${fieldName} = ${dtoName}.${fieldName}  \n`;
  }
  constructorValue += '}';
  return constructorValue;
};

const variablesToClassProperties = (variableString: string): string => {
  const variablesSplitted = variableString.split(';', -1);

  let classProperties = '';
  for (const variable of variablesSplitted) {
    if (variable.trim().length > 0) {
      classProperties += `public readonly ${variable}; `;
    }
  }
  return classProperties;
};

export { queryToTargetLanguage };
