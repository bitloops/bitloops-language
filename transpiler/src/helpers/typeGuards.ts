import {
  TExpression,
  TStatement,
  TPrivateMethodValuesOkErrorReturnType,
  TPrivateMethodValuesPrimaryReturnType,
  expressionKey,
  TMemberDotExpression,
  TDefinitionMethodOkErrorReturnType,
  TDefinitionMethodPrimaryReturnType,
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

const hasOkErrorReturnType = (
  privateMethodValues:
    | TPrivateMethodValuesPrimaryReturnType
    | TPrivateMethodValuesOkErrorReturnType,
): privateMethodValues is TPrivateMethodValuesOkErrorReturnType => {
  if ('returnType' in privateMethodValues) return true;
  else return false;
};

const hasDefinitionMethodOkErrorReturnType = (
  methodDefinitionValues: TDefinitionMethodPrimaryReturnType | TDefinitionMethodOkErrorReturnType,
): methodDefinitionValues is TDefinitionMethodOkErrorReturnType => {
  if ('returnType' in methodDefinitionValues) return true;
  else return false;
};

const isExpression = (value: TStatement): value is TExpression => {
  if (typeof value === 'string') return false;
  if ('expression' in value) return true;
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

const isVO = (name: string): boolean => {
  return name.endsWith('VO');
};

const isEntity = (name: string): boolean => {
  return name.endsWith('Entity');
};

const isProps = (name: string): boolean => {
  return name.endsWith('Props');
};

export {
  isUndefined,
  isArray,
  hasOkErrorReturnType,
  hasDefinitionMethodOkErrorReturnType,
  isExpression,
  isVO,
  isProps,
  isEntity,
};
