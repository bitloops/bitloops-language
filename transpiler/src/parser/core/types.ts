import { TBoundedContextName, TModuleName } from '../../types.js';
import Parser from './grammar/BitloopsParser.js';

export class ASTContext extends Parser.ProgramContext {}

export type OriginalAST = {
  core: OriginalASTCore;
  setup?: OriginalASTSetup;
};

export type OriginalASTSetup = {
  [fileId: string]: {
    ASTContext: ASTContext;
  };
};

export type OriginalASTCore = {
  [boundedContext: TBoundedContextName]: {
    [moduleName: TModuleName]: {
      [fileId: string]: {
        ASTContext: ASTContext;
      };
    };
  };
};

export type TFileId = string;
type TFileContents = string;

export type TParserInputData = {
  core: TParserCoreInputData;
  setup?: TParserSetupInputData;
};

export type TParserSetupInputData = {
  fileId: TFileId;
  fileContents: TFileContents;
}[];

export type TParserCoreInputData = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  fileId: TFileId;
  fileContents: TFileContents;
}[];

export interface IOriginalParser {
  parse: (inputData: TParserInputData) => OriginalAST | OriginalParserError[];
}

export class OriginalParserError extends Error {}
