import { TBitloopsTargetContent } from '../../../types.js';
import {
  BitloopsTargetGeneratorError,
  BitloopsTargetSetupGeneratorError,
  TBitloopsOutputTargetContent,
  TBitloopsTargetSetupContent,
} from '../../types.js';

const isBitloopsTargetGeneratorError = (
  value: TBitloopsOutputTargetContent | TBitloopsTargetContent | BitloopsTargetGeneratorError,
): value is BitloopsTargetGeneratorError => {
  if (value instanceof BitloopsTargetGeneratorError) {
    return true;
  }
  return false;
};

const isBitloopsTargetSetupGeneratorError = (
  value: TBitloopsTargetSetupContent | BitloopsTargetSetupGeneratorError,
): value is BitloopsTargetSetupGeneratorError => {
  if (value instanceof BitloopsTargetSetupGeneratorError) {
    return true;
  }
  return false;
};
export { isBitloopsTargetGeneratorError, isBitloopsTargetSetupGeneratorError };
