import {
  TAndExpression,
  TEnvironmentVariableExpression,
  // TEnvVarWithDefaultValueExpression,
  TIdentifierExpr,
  TLiteralExpression,
  TLogicalExpression,
  TNotExpression,
  TObjectLiteral,
  TOrExpression,
  TExpressionValues,
  TXorExpression,
} from '../../../../../types.js';
const isLogicalSingleExpression = (
  expression: TExpressionValues,
): expression is TLogicalExpression => {
  if ('logicalExpression' in expression) return true;
  else return false;
};
const isLiteralSingleExpression = (
  expression: TExpressionValues,
): expression is TLiteralExpression => {
  if ('literal' in expression) return true;
  else return false;
};

const isIdentifierSingleExpression = (
  expression: TExpressionValues,
): expression is TIdentifierExpr => {
  if ('identifier' in expression) return true;
  else return false;
};

// const isEnvVarWithDefaultValueExpression = (
//   expression: TExpressionValues,
// ): expression is TEnvVarWithDefaultValueExpression => {
//   if ('envVarDefault' in expression) return true;
//   else return false;
// };

const isEnvironmentVariableExpression = (
  expression: TExpressionValues,
): expression is TEnvironmentVariableExpression => {
  if ('envVariable' in expression) return true;
  else return false;
};

const isObjectLiteralExpression = (expression: TExpressionValues): expression is TObjectLiteral => {
  if ('objectLiteral' in expression) return true;
  else return false;
};

const isLogicalORExpression = (
  logicalExpression: TNotExpression | TAndExpression | TOrExpression | TXorExpression,
): logicalExpression is TOrExpression => {
  if ('orExpression' in logicalExpression) return true;
  else return false;
};
export {
  isLogicalSingleExpression,
  isLiteralSingleExpression,
  isIdentifierSingleExpression,
  // isEnvVarWithDefaultValueExpression,
  isEnvironmentVariableExpression,
  isLogicalORExpression,
  isObjectLiteralExpression,
};
