import {
  TDomainMethods,
  TDomainMethod,
  TDomainPrivateMethod,
  TDomainPublicMethod,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { domainPublicMethod } from './domainPublicMethod.js';
import { domainPrivateMethod } from './index.js';

/**
 * Public & private methods
 */
export const domainMethods = (domainMethods: TDomainMethods): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  for (const [methodName, methodInfo] of Object.entries(domainMethods)) {
    if (isPrivateMethod(methodInfo)) {
      const model = domainPrivateMethod(methodName, methodInfo);
      result += model.output;
      dependencies = [...dependencies, ...model.dependencies];
    } else if (isPublicMethod(methodInfo)) {
      const model = domainPublicMethod(methodName, methodInfo);
      result += model.output;
      dependencies = [...dependencies, ...model.dependencies];
    } else {
      throw new Error(`Unknown method type for method ${methodName}`);
    }
  }
  return {
    output: result,
    dependencies,
  };
};

const isPrivateMethod = (methodInfo: TDomainMethod): methodInfo is TDomainPrivateMethod => {
  return 'privateMethod' in methodInfo;
};

const isPublicMethod = (methodInfo: TDomainMethod): methodInfo is TDomainPublicMethod => {
  return 'publicMethod' in methodInfo;
};
