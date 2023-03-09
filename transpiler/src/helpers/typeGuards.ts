import {
  TExpression,
  TStatement,
  TDomainMethodValuesOkErrorReturnType,
  TDomainMethodValuesPrimaryReturnType,
  expressionKey,
  TMemberDotExpression,
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
  methodValues: TDomainMethodValuesPrimaryReturnType | TDomainMethodValuesOkErrorReturnType,
): methodValues is TDomainMethodValuesOkErrorReturnType => {
  if ('returnType' in methodValues) return true;
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

export { isUndefined, isArray, hasOkErrorReturnType, isExpression, isVO, isProps, isEntity };
