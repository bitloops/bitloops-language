import { TOriginalASTToIntermediateModel } from '../../refactoring-arch/types.js';
import { TBoundedContextName, TModuleName } from '../../types.js';
import Parser from './grammar/BitloopsParser.js';

export class BitloopsLanguageAST extends Parser.ProgramContext {}

export type BitloopsLanguageASTContext = {
  [boundedContext: TBoundedContextName]: {
    [moduleName: TModuleName]: {
      [fileId: string]: {
        initialAST: BitloopsLanguageAST;
      };
    };
  };
};

export type TFileId = string;
type TFileContents = string;

export type TParserCoreInputData = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  fileId: TFileId;
  fileContents: TFileContents;
}[];

export interface IBitloopsParser {
  parse: (inputData: TParserCoreInputData) => BitloopsLanguageASTContext | BitloopsParserError;
  validate: (model: TOriginalASTToIntermediateModel) => void | IntermediateASTValidationError;
}

export class IntermediateASTValidationError extends Error {}

export class BitloopsParserError extends Error {}
