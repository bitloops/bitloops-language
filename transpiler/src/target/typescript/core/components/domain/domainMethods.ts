import {
  TTargetDependenciesTypeScript,
  TDomainPrivateMethods,
  TDomainPublicMethods,
} from '../../../../../types.js';
import { domainPublicMethod } from './domainPublicMethod.js';
import { domainPrivateMethod } from './index.js';

/**
 * Public & private methods
 */
export const domainMethods = (
  publicMethods: TDomainPublicMethods,
  privateMethods: TDomainPrivateMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  if (privateMethods) {
    const privateResult = domainPrivateMethods(privateMethods);
    result += privateResult.output;
    dependencies = [...dependencies, ...privateResult.dependencies];
  }

  if (publicMethods) {
    const publicResult = domainPublicMethods(publicMethods);
    result += publicResult.output;
    dependencies = [...dependencies, ...publicResult.dependencies];
  }

  return {
    output: result,
    dependencies,
  };
};

export const domainPrivateMethods = (
  domainPrivateMethods: TDomainPrivateMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  for (const method of domainPrivateMethods) {
    const model = domainPrivateMethod(method);
    result += model.output;
    dependencies = [...dependencies, ...model.dependencies];
  }
  return {
    output: result,
    dependencies,
  };
};

const domainPublicMethods = (
  domainPublicMethods: TDomainPublicMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  for (const method of domainPublicMethods) {
    const model = domainPublicMethod(method);
    result += model.output;
    dependencies = [...dependencies, ...model.dependencies];
  }
  return {
    output: result,
    dependencies,
  };
};
