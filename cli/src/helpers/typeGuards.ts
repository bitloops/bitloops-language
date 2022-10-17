import {
  BitloopsIntermediateASTParserError,
  BitloopsParserError,
} from '../functions/core/index.js';
import { BitloopsTargetGeneratorError } from '../functions/target/index.js';
import { TBitloopsTargetContent, TBoundedContexts } from '../types.js';

const isUndefined = (variable) => {
  if (typeof variable === 'undefined') return true;
  else return false;
};
// const intermediateModelOrError:
const isBitloopsParserError = (
  modelOrError: TBoundedContexts | BitloopsIntermediateASTParserError,
): modelOrError is BitloopsIntermediateASTParserError => {
  if (modelOrError instanceof BitloopsParserError) return true;
  else return false;
};
// const output: TBitloopsTargetContent | BitloopsTargetGeneratorError
const isBitloopsTargetGeneratorError = (
  output: TBitloopsTargetContent | BitloopsTargetGeneratorError,
): output is BitloopsTargetGeneratorError => {
  if (output instanceof BitloopsTargetGeneratorError) return true;
  else return false;
};

const isArray = (list) => {
  if (Array.isArray(list)) return true;
  else return false;
};

export { isUndefined, isArray, isBitloopsParserError, isBitloopsTargetGeneratorError };
