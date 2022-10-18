import { TSingleExpression } from '../../../../types.js';
import { BitloopsTypesMapping } from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { literalSingleExpressionToTargetLanguage } from './literal-single-expression.js';
import { logicalSingleExpressionToTargetLanguage } from './logical-single-expression.js';
import {
  isEnvironmentVariableExpression,
  isEnvVarWithDefaultValueExpression,
  isIdentifierSingleExpression,
  isLiteralSingleExpression,
  isLogicalSingleExpression,
} from './type-guards/index.js';

const singleExpressionToTargetLanguage = (value: TSingleExpression, language: string): string => {
  if (isLogicalSingleExpression(value.expression)) {
    return logicalSingleExpressionToTargetLanguage(value.expression, language);
  }

  if (isLiteralSingleExpression(value.expression)) {
    return literalSingleExpressionToTargetLanguage(value.expression, language);
  }

  if (isIdentifierSingleExpression(value.expression)) {
    return value.expression.identifier.value;
  }

  if (isEnvVarWithDefaultValueExpression(value.expression)) {
    const { defaultValue, envVariable } = value.expression.envVarDefault;
    const expression: TSingleExpression = {
      expression: defaultValue,
    };
    const evaluatedLiteral = modelToTargetLanguage({
      type: BitloopsTypesMapping.TSingleExpression,
      value: expression,
      targetLanguage: language,
    });
    return `process.env.${envVariable.value} || ${evaluatedLiteral}`;
  }
  if (isEnvironmentVariableExpression(value.expression)) {
    const rawValue = value.expression.envVariable.value.replace(/env\./g, '');
    // console.log('rawValue:', rawValue);
    return `process.env.${rawValue}`;
  }
  throw new Error('Expression not supported');
};

// const test: TSingleExpression = {
//   expression: {
//     envVarDefault: {
//       envVariable: {
//         value: 'FASTIFY_PORT',
//       },
//       defaultValue: {
//         literal: {
//           type: 'number' as any,
//           value: '5001',
//         },
//       },
//     },
//   },
// };
// console.log(singleExpressionToTargetLanguage(test, 'TypeScript'));

export default singleExpressionToTargetLanguage;
