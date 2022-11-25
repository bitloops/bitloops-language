import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { TStatements, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

//TODO props now must always have an id field (fix this not to be mandatory)
export const internalConstructor = (
  propsName: string,
  statements: TStatements,
  classType: string,
): TTargetDependenciesTypeScript => {
  let superString;
  if (classType === ClassTypes.Entities) {
    superString = 'super(props, props.id)';
  } else {
    superString = 'super(props)';
  }
  let res = `private constructor(props: ${propsName}) { ${superString}; `;
  let dependencies = [];
  if (statements) {
    const statementsResult = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: statements,
    });
    res += statementsResult.output;
    dependencies = statementsResult.dependencies;
  }
  res += '}';
  return { output: res, dependencies };
};
