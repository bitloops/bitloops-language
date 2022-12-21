import { TPropsIdentifier, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { getChildDependencies } from '../../dependencies.js';

export const domainConstructorParameterToTargetLanguage = (
  type: TPropsIdentifier,
): TTargetDependenciesTypeScript => {
  const dependencies = getChildDependencies(type);

  return {
    output: type,
    dependencies,
  };
};
