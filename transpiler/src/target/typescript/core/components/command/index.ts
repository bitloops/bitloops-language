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
  TTargetDependenciesTypeScript,
  TVariable,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';

const commandToTargetLanguage = (command: TCommand): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];
  const commandValues = command.command;
  const commandName = commandValues[identifierKey];
  const fields = commandValues[fieldsKey];

  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: fields,
  });

  const CommandInterface = 'Application.Command';

  const commandNameDeclaration = `public static readonly commandName = ${commandName};`;
  const getCommandTopic = `static getCommandTopic(): string {
    return super.getCommandTopic(InsertPINCommand.commandName, contextId);
  }`;

  const dtoTypeName = commandName;
  const commandType = getCommandType(dtoTypeName, variablesResult.output);

  const constructorProduced = getConstructor(dtoTypeName, commandName, fields);
  const classProperties = variablesToClassProperties(variablesResult.output);

  result += commandType;
  result += `export class ${commandName} extends ${CommandInterface} {`;
  result += classProperties;
  result += commandNameDeclaration;
  result += constructorProduced;
  result += getCommandTopic;
  result += '}';
  console.log('result', result);
  dependencies.push(...variablesResult.dependencies);

  dependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.Command,
    className: commandName,
  });

  return { output: result, dependencies };
};

const getCommandType = (dtoTypeName: string, variablesString: string): string => {
  const type = `type T${dtoTypeName} = {
    ${variablesString}
  }
  `;
  return type;
};

//dtoName should have lowercase first letter
const getConstructor = (dtoTypeName: string, commandName: string, fields: TVariable[]): string => {
  const commandNameWithoutSuffix = commandName.replace('Command', '');
  const commandWithLowerCaseStartLetter =
    commandNameWithoutSuffix.charAt(0).toLowerCase() + commandNameWithoutSuffix.slice(1);

  const dtoName = `${commandWithLowerCaseStartLetter}RequestDTO`;
  let constructorValue = `constructor(${dtoName}: ${dtoTypeName}) {
    super(${commandName}.commandName, contextId);
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
