import {
  TAndSingleExpression,
  TEnvironmentVariableExpression,
  TEnvVarWithDefaultValueExpression,
  TIdentifierExpression,
  TLiteralExpression,
  TLogicalSingleExpression,
  TNotSingleExpression,
  TOrSingleExpression,
  TSingleExpressionValue,
  TXorSingleExpression,
} from '../../../../../types.js';
const isLogicalSingleExpression = (
  expression: TSingleExpressionValue,
): expression is TLogicalSingleExpression => {
  if ('logicalExpression' in expression) return true;
  else return false;
};
const isLiteralSingleExpression = (
  expression: TSingleExpressionValue,
): expression is TLiteralExpression => {
  if ('literal' in expression) return true;
  else return false;
};

const isIdentifierSingleExpression = (
  expression: TSingleExpressionValue,
): expression is TIdentifierExpression => {
  if ('identifier' in expression) return true;
  else return false;
};

const isEnvVarWithDefaultValueExpression = (
  expression: TSingleExpressionValue,
): expression is TEnvVarWithDefaultValueExpression => {
  if ('envVarDefault' in expression) return true;
  else return false;
};

const isEnvironmentVariableExpression = (
  expression: TSingleExpressionValue,
): expression is TEnvironmentVariableExpression => {
  if ('envVariable' in expression) return true;
  else return false;
};

const isLogicalORExpression = (
  logicalExpression:
    | TNotSingleExpression
    | TAndSingleExpression
    | TOrSingleExpression
    | TXorSingleExpression,
): logicalExpression is TOrSingleExpression => {
  if ('orExpression' in logicalExpression) return true;
  else return false;
};
export {
  isLogicalSingleExpression,
  isLiteralSingleExpression,
  isIdentifierSingleExpression,
  isEnvVarWithDefaultValueExpression,
  isEnvironmentVariableExpression,
  isLogicalORExpression,
};
