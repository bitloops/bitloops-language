import { BitloopsLanguageASTContext } from '../../parser/index.js';
import { TBoundedContexts } from '../../types.js';

export type BitloopsIntermediateASTError =
  | IntermediateASTParserError
  | IntermediateASTValidationError[];

export interface IBitloopsIntermediateASTParser {
  parse: (ast: BitloopsLanguageASTContext) => TBoundedContexts | BitloopsIntermediateASTError;
}

export class IntermediateASTParserError extends Error {}
export class IntermediateASTValidationError extends Error {}

export interface IIntermediateASTValidator {
  validate: (ast: TBoundedContexts) => IntermediateASTValidationError[];
}
