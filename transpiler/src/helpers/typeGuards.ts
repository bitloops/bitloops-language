import {
  TConstDeclaration,
  TExpression,
  TReturnStatement,
  TStatement,
  TSwitchStatement,
  TVariableDeclaration,
  TGraphQLServerInstance,
  TRESTServerInstance,
  TIfStatement,
  TDomainPrivateMethodValuesOkErrorReturnType,
  TDomainPrivateMethodValuesPrimaryReturnType,
  TRESTController,
  TGraphQLController,
  TAssignmentExpression,
  expressionKey,
  TMemberDotExpression,
  TThisExpression,
} from '../types.js';

const isUndefined = (variable) => {
  if (typeof variable === 'undefined') return true;
  else return false;
};

const isArray = (list) => {
  if (Array.isArray(list)) return true;
  else return false;
};

export const isObject = (value: any): boolean => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

export const isPrimitive = (value: any): boolean => {
  return value !== Object(value);
};

const isRestServerInstance = (
  serverInstance: TRESTServerInstance | TGraphQLServerInstance,
): serverInstance is TRESTServerInstance => {
  if ('routers' in serverInstance) return true;
  else return false;
};

const isGraphQLController = (
  controller: TRESTController | TGraphQLController,
): controller is TGraphQLController => {
  if (controller['type'] === 'graphql') return true;
  else return false;
};

// const controllerDefinitionIsRest = (
//   controller: TRestControllerDefinitions | TGraphQLControllerInstances,
// ): controller is TRestControllerDefinitions => {
//   if (controller['type'] === ControllerTypeOfDefinition.REST) return true;
//   else return false;
// };

// const controllerDefinitionIsGraphQL = (
//   controller: TRestControllerDefinitions | TGraphQLControllerInstances,
// ): controller is TGraphQLControllerInstances => {
//   if (controller['type'] === ControllerTypeOfDefinition.GRAPHQL) return true;
//   else return false;
// };

const hasOkErrorReturnType = (
  privateMethodValues:
    | TDomainPrivateMethodValuesPrimaryReturnType
    | TDomainPrivateMethodValuesOkErrorReturnType,
): privateMethodValues is TDomainPrivateMethodValuesOkErrorReturnType => {
  if ('returnType' in privateMethodValues) return true;
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

const isThisDeclaration = (
  value: TStatement,
): value is { [expressionKey]: TAssignmentExpression } => {
  if (!isExpression(value) || !isAssignmentExpression(value)) {
    return false;
  }
  const leftExpression = value[expressionKey].assignmentExpression.left;
  if (!isMemberDotExpression(leftExpression)) {
    return false;
  }
  const leftMost = getMemberDotExpressionLeftMostExpression(leftExpression);
  if (isThisExpression(leftMost)) {
    return true;
  }
  return false;
};

const isVariableDeclaration = (value: TStatement): value is TVariableDeclaration => {
  if (typeof value === 'string') return false;
  if ('variableDeclaration' in value) return true;
  return false;
};

const isExpression = (value: TStatement): value is TExpression => {
  if (typeof value === 'string') return false;
  if ('expression' in value) return true;
  return false;
};
const isAssignmentExpression = (
  value: TExpression,
): value is { [expressionKey]: TAssignmentExpression } => {
  if ('assignmentExpression' in value[expressionKey]) return true;
  return false;
};

const isMemberDotExpression = (
  value: TExpression,
): value is { [expressionKey]: TMemberDotExpression } => {
  if ('memberDotExpression' in value[expressionKey]) return true;
  return false;
};
const getMemberDotExpressionLeftMostExpression = (value: {
  [expressionKey]: TMemberDotExpression;
}): TExpression => {
  const { expression } = value[expressionKey].memberDotExpression;
  const leftExpression = { expression };
  if (isMemberDotExpression(leftExpression)) {
    return getMemberDotExpressionLeftMostExpression(leftExpression);
  }
  return leftExpression;
};
const isThisExpression = (value: TExpression): value is { [expressionKey]: TThisExpression } => {
  if ('thisExpression' in value[expressionKey]) return true;
  return false;
};

const isSwitchStatement = (value: TStatement): value is TSwitchStatement => {
  if (typeof value === 'string') return false;
  if ('switchStatement' in value) return true;
  return false;
};

const isReturnStatement = (value: TStatement): value is TReturnStatement => {
  if (typeof value === 'string') return false;
  if ('return' in value) return true;
  return false;
};

const isVO = (name): name is string => {
  return name.endsWith('VO');
};

const isExpressionAValueObjectEvaluation = (expressionStatement: TExpression): boolean => {
  const { expression } = expressionStatement;
  if (expression?.['evaluation']?.valueObject) {
    return true;
  }

  return false;
};

const isExpressionAnEntityEvaluation = (expressionStatement: TExpression): boolean => {
  const { expression } = expressionStatement;
  if (expression?.['evaluation']?.entity) {
    return true;
  }

  return false;
};
const isExpressionAVariableRegularEvaluation = (expressionStatement: TExpression): boolean => {
  const { expression } = expressionStatement;
  if (expression?.['evaluation']?.regularEvaluation?.type === 'variable') {
    return true;
  }

  return false;
};

const isExpressionAMethodRegularEvaluation = (expressionStatement: TExpression): boolean => {
  const { expression } = expressionStatement;
  if (expression?.['evaluation']?.regularEvaluation?.type === 'method') {
    return true;
  }

  return false;
};

export {
  isUndefined,
  isArray,
  isRestServerInstance,
  isGraphQLController,
  hasOkErrorReturnType,
  isIfStatement,
  isConstDeclaration,
  isExpression,
  isSwitchStatement,
  isReturnStatement,
  isVO,
  isVariableDeclaration,
  isExpressionAValueObjectEvaluation,
  isExpressionAnEntityEvaluation,
  isExpressionAVariableRegularEvaluation,
  isExpressionAMethodRegularEvaluation,
  isThisDeclaration,
};
