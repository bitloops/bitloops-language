// import { TTargetDependenciesTypeScript, TToStringExpression } from '../../../../../types.js';

import { TTargetDependenciesTypeScript, TToStringExpression } from '../../../../../../types.js';

export const toStringToTarget = (variable: TToStringExpression): TTargetDependenciesTypeScript => {
  const { toString } = variable;
  return {
    output: toString.value + '.toString()',
    dependencies: [],
  };
};
