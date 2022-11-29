// import { TTargetDependenciesTypeScript, TToStringExpression } from '../../../../../types.js';

import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TTargetDependenciesTypeScript, TToStringExpression } from '../../../../../../types.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

export const toStringToTarget = (variable: TToStringExpression): TTargetDependenciesTypeScript => {
  const { toString } = variable;
  const result = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: toString,
  });
  return {
    output: result.output + '.toString()',
    dependencies: result.dependencies,
  };
};
