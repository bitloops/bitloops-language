import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TSingleExpression, TTargetDependenciesTypeScript } from '../../../../types.js';
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

const singleExpressionToTargetLanguage = (
  value: TSingleExpression,
): TTargetDependenciesTypeScript => {
  if (isLogicalSingleExpression(value.expression)) {
    const model = logicalSingleExpressionToTargetLanguage(value.expression);
    return {
      output: model.output,
      dependencies: model.dependencies,
    };
  }

  if (isLiteralSingleExpression(value.expression)) {
    const model = literalSingleExpressionToTargetLanguage(value.expression);
    return {
      output: model.output,
      dependencies: model.dependencies,
    };
  }

  if (isIdentifierSingleExpression(value.expression)) {
    return { output: value.expression.identifier.value, dependencies: [] };
  }

  if (isEnvVarWithDefaultValueExpression(value.expression)) {
    const { defaultValue, envVariable } = value.expression.envVarDefault;
    const expression: TSingleExpression = {
      expression: defaultValue,
    };
    const evaluatedLiteral = modelToTargetLanguage({
      type: BitloopsTypesMapping.TSingleExpression,
      value: expression,
    });
    return {
      output: `process.env.${envVariable.value} || ${evaluatedLiteral.output}`,
      dependencies: evaluatedLiteral.dependencies,
    };
  }
  if (isEnvironmentVariableExpression(value.expression)) {
    const rawValue = value.expression.envVariable.value.replace(/env\./g, '');
    // console.log('rawValue:', rawValue);
    return { output: `process.env.${rawValue}`, dependencies: [] };
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
