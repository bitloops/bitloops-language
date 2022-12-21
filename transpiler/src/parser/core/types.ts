import { TBoundedContextName, TModuleName } from '../../types.js';
import Parser from './grammar/BitloopsParser.js';

export class BitloopsLanguageAST extends Parser.ProgramContext {}

export type BitloopsLanguageASTContext = {
  core: BitloopsLanguageASTCoreContext;
  setup?: BitloopsLanguageAST;
};

export type BitloopsLanguageASTCoreContext = {
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

export type TParserInputData = {
  core: TParserCoreInputData;
  setup?: string;
};

export type TParserCoreInputData = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  fileId: TFileId;
  fileContents: TFileContents;
}[];

export interface IBitloopsParser {
  parse: (inputData: TParserInputData) => BitloopsLanguageASTContext | BitloopsParserError[];
}

export class IntermediateASTValidationError extends Error {}

export class BitloopsParserError extends Error {}
