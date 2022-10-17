/**
 *  Bitloops Language CLI
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
// import antlr4 from 'antlr4';

import { ClassTypes } from '../../target/typescript/modelToTargetLanguage/helpers/mappings.js';
import { TBoundedContexts } from '../../types.js';
// import { TGetUseCasesResponse } from '../../parser/bitloopsFilesToString/index.js';
import {
  formalParameterList,
  controllerDeclaration,
  restControllerExecuteDeclaration,
  statement,
  restControllerParameters,
  formalParameterArg,
  typeAnnotation,
  statementList,
  evaluation,
  expression,
  structDeclaration,
  functionBody,
  restControllerMethodDeclaration,
  structEvaluation,
  regularIntegerEvaluation,
  regularBooleanEvaluation,
  regularDecimalEvaluation,
  returnOkErrorType,
  regularStructEvaluation,
  useCaseDeclaration,
  dtoEvaluation,
  regularDTOEvaluation,
  useCaseExecuteDeclaration,
  returnStatement,
  constDeclaration,
  methodDefinitionList,
  methodDefinition,
  packagePortDeclaration,
  valueObjectDeclaration,
  entityDeclaration,
  domainConstructorDeclaration,
  privateMethodDeclaration,
  publicMethodDeclaration,
  returnPrivateMethodType,
  returnPublicMethodType,
  repoPortDeclaration,
  valueObjectEvaluation,
  evaluationFieldList,
  evaluationField,
  entityEvaluation,
  domainEvaluationInput,
  ruleDeclaration,
  aggregateDeclaration,
} from './bitloopsParserHelpers/index.js';

export type TSourceElementContext = {
  returnType: any;
};

const getBitloopsModel = (
  subtree: any,
  contextSourceElement?: TSourceElementContext,
): { classType: string; classModel: { key: string; subModel: any } } | any => {
  const value = subtree?.value ? subtree.value : subtree;
  const type = subtree.type;
  const children = subtree.children;
  const numOfChildren = subtree.numOfChildren ? subtree.numOfChildren : 0;
  switch (type) {
    case 'sourceElement':
      return getBitloopsModel(children[0]);
    case 'jestTestDeclaration':
      console.log('children', children);
      return {
        classType: 'Tests',
        classModel: { key: 'jestTest', subModel: getBitloopsModel(children[2]) },
      };
    case 'dtoDeclaration':
      return { classType: ClassTypes.DTOs, classModel: dtoDeclaration(children) };
    case 'domainErrorDeclaration':
      return {
        classType: ClassTypes.DomainErrors,
        classModel: domainAndApplicationErrorDeclaration(children),
      };
    case 'applicationErrorDeclaration':
      return {
        classType: ClassTypes.ApplicationErrors,
        classModel: domainAndApplicationErrorDeclaration(children),
      };
    case 'useCaseDeclaration':
      return {
        classType: ClassTypes.UseCases,
        classModel: useCaseDeclaration(subtree),
      };
    case 'packagePortDeclaration':
      return {
        classType: ClassTypes.Packages,
        classModel: packagePortDeclaration(subtree),
      };
    case 'aggregateDeclaration':
      return {
        classType: ClassTypes.RootEntities,
        classModel: aggregateDeclaration(subtree),
      };
    case 'useCaseExecuteDeclaration':
      return useCaseExecuteDeclaration(subtree);
    case 'returnOkErrorType':
      return returnOkErrorType(subtree);
    case 'constDeclaration':
      return constDeclaration(subtree);
    case 'methodDefinitionList':
      return methodDefinitionList(subtree);
    case 'methodDefinition':
      return methodDefinition(subtree);
    case 'objectLiteral':
      return objectLiteral(children);
    case 'controllerDeclaration':
      return { classType: ClassTypes.Controllers, classModel: controllerDeclaration(children) };
    case 'restControllerExecuteDeclaration':
      return { execute: restControllerExecuteDeclaration(children) };
    case 'formalParameterList':
      return formalParameterList(children);
    case 'formalParameterArg':
      return formalParameterArg(children);
    case 'typeAnnotation':
      return typeAnnotation(children);
    case 'statement':
      return statement(children, contextSourceElement);
    case 'structDeclaration':
      return { classType: ClassTypes.Structs, classModel: structDeclaration(children) };
    case 'restControllerParameters':
      return restControllerParameters(children);
    case 'regularEvaluation':
      return { regularEvaluation: getBitloopsModel(children[0]) };
    case 'regularMethodEvaluation':
      return regularMethodEvaluation(children);
    case 'structEvaluation':
      return structEvaluation(subtree);
    case 'dtoEvaluation':
      return dtoEvaluation(subtree);
    case 'methodArguments':
      return getBitloopsModel(children[1]);
    case 'argumentList':
      return argumentList(children);
    case 'propertyAssignment':
      return propertyAssignment(children);
    case 'statementList':
      return statementList(children, contextSourceElement);
    case 'regularStringEvaluation':
      return { type: 'string', value: value.substring(1, value.length - 1) };
    case 'regularVariableEvaluation':
      return { type: 'variable', value };
    case 'regularIntegerEvaluation':
      return regularIntegerEvaluation(value);
    case 'regularDecimalEvaluation':
      return regularDecimalEvaluation(value);
    case 'regularBooleanEvaluation':
      return regularBooleanEvaluation(value);
    case 'regularStructEvaluation':
      return regularStructEvaluation(subtree);
    case 'regularDTOEvaluation':
      return regularDTOEvaluation(subtree);
    case 'argument':
      return getBitloopsModel(children[0]);
    case 'regularVariableEvaluationORliteralORexpression':
      return getBitloopsModel(children[0]);
    case 'identifierName':
      return { type: 'variable', value };
    case 'literal':
      return literal(value);
    case 'fieldList':
      return fieldList(children, numOfChildren);
    case 'field':
      return field(subtree, children, numOfChildren);
    case 'identifier':
      return identifier(children);
    case 'LEAF':
      return leaf(value);
    case 'expression':
      return { expression: expression(children) };
    case 'evaluation':
      return { evaluation: evaluation(children) };
    case 'functionBody':
      return functionBody(children, contextSourceElement);
    case 'returnStatement':
      return returnStatement(subtree, contextSourceElement);
    case 'restControllerMethodDeclaration':
      return restControllerMethodDeclaration(children);
    case 'valueObjectDeclaration':
      return {
        classType: ClassTypes.ValueObjects,
        classModel: valueObjectDeclaration(subtree),
      };
    case 'entityDeclaration':
      return {
        classType: ClassTypes.Entities,
        classModel: entityDeclaration(subtree),
      };
    case 'domainConstructorDeclaration':
      return domainConstructorDeclaration(subtree);
    case 'privateMethodDeclaration':
      return privateMethodDeclaration(subtree);
    case 'publicMethodDeclaration':
      return publicMethodDeclaration(subtree);
    case 'returnPrivateMethodType':
      return returnPrivateMethodType(subtree);
    case 'returnPublicMethodType':
      return returnPublicMethodType(subtree);
    case 'repoPortDeclaration':
      return { classType: ClassTypes.RepoPorts, classModel: repoPortDeclaration(subtree) };
    case 'valueObjectEvaluation':
      return valueObjectEvaluation(subtree);
    case 'evaluationFieldList':
      return evaluationFieldList(subtree);
    case 'evaluationField':
      return evaluationField(subtree);
    case 'entityEvaluation':
      return entityEvaluation(subtree);
    case 'domainEvaluationInput':
      return domainEvaluationInput(subtree);
    case 'ruleDeclaration':
      return ruleDeclaration(subtree);
    default:
      console.log(type, 'subtree', subtree);
      throw new Error(`Unknown type: ${type}`);
  }
};

const domainAndApplicationErrorDeclaration = (children: any[]): any => {
  const domainErrorIdentifier = children[1].value;
  let domainErrorArgs: any;
  let domainErrorProperties: any;
  for (let i = 0; i < children.length; i++) {
    if (children[i].type === 'formalParameterList') {
      domainErrorArgs = getBitloopsModel(children[i]);
    }
    if (children[i].type === 'objectLiteral') {
      domainErrorProperties = objectLiteral(children[i].children);
    }
  }
  if (Object.keys(domainErrorProperties).length != 2) {
    throw new TypeError('Domain error: only message and errorId are allowed');
  }
  if (!domainErrorProperties.message) {
    throw new TypeError('Domain error: must have message property');
  }
  if (!domainErrorProperties.errorId) {
    throw new TypeError('Domain error: must have errorId property');
  }
  const { message, errorId } = domainErrorProperties;
  return {
    key: domainErrorIdentifier,
    subModel: {
      message: { [message.type]: message.value },
      errorId: { [errorId.type]: errorId.value },
      parameters: domainErrorArgs,
    },
  };
};
const objectLiteral = (children: any[]): any => {
  let objectLiteral = {};
  for (const child of children) {
    if (child.type === 'propertyAssignment') {
      objectLiteral = { ...objectLiteral, ...getBitloopsModel(child) };
    }
  }
  return objectLiteral;
};
const regularMethodEvaluation = (children: any[]): any => {
  if (children[1].value != '()') {
    return {
      type: 'method',
      value: children[0].value,
      argumentDependencies: getBitloopsModel(children[1]),
    };
  } else {
    return {
      type: 'method',
      value: children[0].value,
    };
  }
};

const argumentList = (children: any[]): any[] => {
  const argumentsList = [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].type !== 'LEAF') argumentsList.push(getBitloopsModel(children[i]));
  }
  return argumentsList;
};

// TODO regularVariableEvaluationORliteralORexpression is a hack solution, needs fix
const propertyAssignment = (children: any[]): any => {
  let assignement: { type: string; value: string };
  let assignmentName: string;
  for (let i = 0; i < children.length; i++) {
    if (children[i].type === 'propertyName') {
      assignmentName = children[i].value;
    }
    if (
      children[i].type === 'regularVariableEvaluationORliteralORexpression' &&
      children[i].children[0].type === 'literal'
    ) {
      assignement = getBitloopsModel(children[i]);
    }
  }
  return { [assignmentName]: assignement };
};
const literal = (value: string): { type: string; value: string } => {
  let type = '';
  if (value.substring(0, 1) === '"' || value.substring(0, 1) === "'") {
    type = 'string';
    return { type, value: value.substring(1, value.length - 1) };
  } else if (value.substring(0, 1) === '`') {
    type = 'backTickString';
    return { type, value: value.substring(1, value.length - 1) };
  } else {
    throw new Error(`Literal type for ${value} not implemented yet`);
  }
};

const dtoDeclaration = (children: any[]): any => {
  const dtoIdentifier = children[1].value;
  const dtoFields = getBitloopsModel(children[3]);
  return { key: dtoIdentifier, subModel: { fields: dtoFields } };
};

const fieldList = (children: any[], numOfChildren: number): any[] => {
  const fieldArray = [];
  for (let i = 0; i < numOfChildren; i++) {
    if (children[i].type === 'field') {
      fieldArray.push(getBitloopsModel(children[i]));
    }
  }
  return fieldArray;
};

const field = (subtree: any, children: any[], numOfChildren): any => {
  let optional = false;
  let fieldType;
  let fieldName;
  for (let i = 0; i < numOfChildren; i++) {
    if (children[i].type === 'LEAF' && children[i].value === 'optional') {
      optional = true;
    }
    if (children[i].type === 'primitives' || children[i].type === 'struct') {
      fieldType = children[i].value;
    }
    if (children[i].type === 'identifier') {
      fieldName = children[i].value;
      if (optional === true) {
        return { optional: true, type: fieldType, name: fieldName };
      } else {
        return { type: fieldType, name: fieldName };
      }
    }
  }
  throw new Error('Invalid field data', subtree);
};

const identifier = (children: any): any => {
  if (children.length === 1 && children[0].type === 'LEAF') {
    return { value: children[0].value };
  } else {
    throw new Error('Identifier not supported yet');
  }
};

const leaf = (value: string): { value: string } => {
  return { value };
};

const parseBitloops = (boundedContext: string, moduleName: string, tree: any): TBoundedContexts => {
  const result: TBoundedContexts = { [boundedContext]: { [moduleName]: {} } };
  const { classType, classModel } = getBitloopsModel(tree);
  const { key, subModel } = classModel;

  if (!result[boundedContext][moduleName][classType]) {
    result[boundedContext][moduleName][classType] = {};
  }
  result[boundedContext][moduleName][classType][key] = subModel;
  return result;
};

export { parseBitloops, getBitloopsModel };
