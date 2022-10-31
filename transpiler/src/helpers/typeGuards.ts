import { TConstDeclaration, TStatement } from './../types.js';
import {
  TGraphQLControllerInstances,
  TGraphQLControllerValues,
  TGraphQLServerInstance,
  TRestControllerDefinitions,
  TRESTControllerValues,
  TRESTServerInstance,
  ControllerTypeOfDefinition,
  TOkErrorReturnType,
  TIfStatement,
} from '../types.js';

const isUndefined = (variable) => {
  if (typeof variable === 'undefined') return true;
  else return false;
};

const isArray = (list) => {
  if (Array.isArray(list)) return true;
  else return false;
};

const isRestServerInstance = (
  serverInstance: TRESTServerInstance | TGraphQLServerInstance,
): serverInstance is TRESTServerInstance => {
  if ('routers' in serverInstance) return true;
  else return false;
};

const isGraphQLServerInstance = (
  serverInstance: TRESTServerInstance | TGraphQLServerInstance,
): serverInstance is TGraphQLServerInstance => {
  if ('resolvers' in serverInstance) return true;
  else return false;
};

const isGraphQLController = (
  controller: TRESTControllerValues | TGraphQLControllerValues,
): controller is TGraphQLControllerValues => {
  if (controller['type'] === 'graphql') return true;
  else return false;
};

const controllerDefinitionIsRest = (
  controller: TRestControllerDefinitions | TGraphQLControllerInstances,
): controller is TRestControllerDefinitions => {
  if (controller['type'] === ControllerTypeOfDefinition.REST) return true;
  else return false;
};

const controllerDefinitionIsGraphQL = (
  controller: TRestControllerDefinitions | TGraphQLControllerInstances,
): controller is TGraphQLControllerInstances => {
  if (controller['type'] === ControllerTypeOfDefinition.GRAPHQL) return true;
  else return false;
};

// returnType: string | TOkErrorReturnType,
const isOkErrorReturnType = (
  returnType: string | TOkErrorReturnType,
): returnType is TOkErrorReturnType => {
  if (typeof returnType !== 'string' && 'ok' in returnType) return true;
  else return false;
};

const isIfStatement = (value: TStatement): value is TIfStatement => {
  if (typeof value === 'string') return false;
  if ('ifStatement' in value) return true;
  return false;
};

const isConstDeclaration = (value: TStatement): value is TConstDeclaration => {
  if (typeof value === 'string') return false;
  if ('constDeclaration' in value) return true;
  return false;
};

export {
  isUndefined,
  isArray,
  isRestServerInstance,
  isGraphQLServerInstance,
  isGraphQLController,
  controllerDefinitionIsRest,
  controllerDefinitionIsGraphQL,
  isOkErrorReturnType,
  isIfStatement,
  isConstDeclaration,
};
