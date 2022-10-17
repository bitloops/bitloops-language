import {
  TDomainMethods,
  TDomainMethod,
  TDomainPrivateMethod,
  TDomainPublicMethod,
} from '../../../../../types.js';
import { domainPublicMethod } from './domainPublicMethod.js';
import { domainPrivateMethod } from './index.js';

/**
 * Public & private methods
 */
export const domainMethods = (domainMethods: TDomainMethods, language: string): string => {
  let result = '';
  for (const [methodName, methodInfo] of Object.entries(domainMethods)) {
    if (isPrivateMethod(methodInfo)) {
      result += domainPrivateMethod(methodName, methodInfo, language);
    } else if (isPublicMethod(methodInfo)) {
      result += domainPublicMethod(methodName, methodInfo, language);
    } else {
      throw new Error(`Unknown method type for method ${methodName}`);
    }
  }
  return result;
};

const isPrivateMethod = (methodInfo: TDomainMethod): methodInfo is TDomainPrivateMethod => {
  return 'privateMethod' in methodInfo;
};

const isPublicMethod = (methodInfo: TDomainMethod): methodInfo is TDomainPublicMethod => {
  return 'publicMethod' in methodInfo;
};
