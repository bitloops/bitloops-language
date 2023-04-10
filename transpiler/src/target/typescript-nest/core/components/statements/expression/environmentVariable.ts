import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import {
  TEnvironmentVariableExpression,
  TLiteral,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

export const environmentVariableToTargetLanguage = (
  variable: TEnvironmentVariableExpression,
): TTargetDependenciesTypeScript => {
  const { identifier, defaultValue } = variable.environmentVariable;
  if (!defaultValue) {
    return {
      output: `process.env.${identifier}`,
      dependencies: [],
    };
  }
  const literal: TLiteral = {
    literal: defaultValue,
  };
  const defaultValueTarget = modelToTargetLanguage({
    type: BitloopsTypesMapping.TLiteral,
    value: literal,
  });

  return {
    output: `process.env.${identifier} || ${defaultValueTarget.output}`,
    dependencies: defaultValueTarget.dependencies,
  };
};
