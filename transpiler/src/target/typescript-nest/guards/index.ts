import { TranspilerErrors } from '../../../transpilerTypes.js';
import {
  TargetCoreGeneratorError,
  TargetGeneratorError,
  TTargetCoreContent,
  TargetSetupGeneratorError,
  TTargetCoreFinalContent,
  TTargetSetupContent,
  TOutputTargetContent,
} from '../../types.js';

const isTargetGeneratorError = (
  value: TOutputTargetContent | TranspilerErrors | TargetGeneratorError[],
): value is TargetGeneratorError[] => {
  if (Array.isArray(value)) {
    for (const err of value) {
      if (!isTargetCoreGeneratorError(err) && !isTargetSetupGeneratorError(err)) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

const isTargetCoreGeneratorError = (
  value:
    | TTargetCoreFinalContent[]
    | TTargetCoreContent[]
    | TargetCoreGeneratorError
    | TranspilerErrors,
): value is TargetCoreGeneratorError => {
  if (value instanceof TargetCoreGeneratorError) {
    return true;
  }
  return false;
};

const isTargetSetupGeneratorError = (
  value: TTargetSetupContent[] | TargetSetupGeneratorError | TranspilerErrors,
): value is TargetSetupGeneratorError => {
  if (value instanceof TargetSetupGeneratorError) {
    return true;
  }
  return false;
};

export { isTargetCoreGeneratorError, isTargetSetupGeneratorError, isTargetGeneratorError };
