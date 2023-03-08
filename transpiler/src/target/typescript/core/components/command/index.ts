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
  TCommand,
  TContextData,
  TDependenciesTypeScript,
  TTargetDependenciesTypeScript,
  TVariable,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';

const COMMAND_DEPENDENCIES: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'Application',
    from: '@bitloops/bl-boilerplate-core',
  },
];

const commandToTargetLanguage = (
  command: TCommand,
  contextData: TContextData,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = COMMAND_DEPENDENCIES;
  const commandValues = command.command;
  const commandName = commandValues[identifierKey];

  const commandTopicExpression = commandValues.commandTopic;
  const commandTopicResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: commandTopicExpression,
  });

  dependencies = [...dependencies, ...commandTopicResult.dependencies];

  const commandTopic = commandTopicResult.output;
  const fields = commandValues[fieldsKey];

  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: fields,
  });
  dependencies = [...dependencies, ...variablesResult.dependencies];

  const CommandInterface = 'Application.Command';
  const contextId = `'${contextData.boundedContext}'`;

  const commandNameDeclaration = `public static readonly commandName = ${commandTopic};`;
  const getCommandTopic = `static getCommandTopic(): string {
    return super.getCommandTopic(${commandName}.commandName, ${contextId});
  }`;

  const dtoTypeName = commandName;
  const commandTypeName = getCommandTypeName(dtoTypeName);
  const commandType = getCommandType(commandTypeName, variablesResult.output);

  const constructorProduced = getConstructor(commandTypeName, commandName, fields, contextId);
  const classProperties = variablesToClassProperties(variablesResult.output);

  result += commandType;
  result += `export class ${commandName} extends ${CommandInterface} {`;
  result += classProperties;
  result += commandNameDeclaration;
  result += constructorProduced;
  result += getCommandTopic;
  result += '}';
  dependencies.push(...variablesResult.dependencies);

  dependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.Command,
    className: commandName,
  });

  return { output: result, dependencies };
};

const getCommandTypeName = (dtoTypeName: string): string => {
  return `T${dtoTypeName}`;
};

const getCommandType = (commandTypeName: string, variablesString: string): string => {
  const type = `type ${commandTypeName} = {
    ${variablesString}
  }
  `;
  return type;
};

const getConstructor = (
  dtoTypeName: string,
  commandName: string,
  fields: TVariable[],
  contextId: string,
): string => {
  const commandNameWithoutSuffix = commandName.replace('Command', '');
  const commandWithLowerCaseStartLetter =
    commandNameWithoutSuffix.charAt(0).toLowerCase() + commandNameWithoutSuffix.slice(1);

  const dtoName = `${commandWithLowerCaseStartLetter}RequestDTO`;
  let constructorValue = `constructor(${dtoName}: ${dtoTypeName}) {
    super(${commandName}.commandName, ${contextId});
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

export { commandToTargetLanguage };
