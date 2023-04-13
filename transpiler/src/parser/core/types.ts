import { ValidationError, TBoundedContextName, TModuleName } from '../../ast/core/types.js';
import Parser from './grammar/BitloopsParser.js';

export class ASTContext extends Parser.ProgramContext {}

export class ASTSetupContext extends Parser.SetupProgramContext {}

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
export type TFileName = string;
type TFileContents = string;

export type TParserInputData = {
  core: TParserCoreInputData;
  setup?: TParserSetupInputData;
};

export type TParserSetupInputData = {
  fileId: TFileId;
  fileName?: TFileName;
  fileContents: TFileContents;
}[];

export type TParserCoreInputData = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  fileId: TFileId;
  fileName?: TFileName;
  fileContents: TFileContents;
}[];

export interface IOriginalParser {
  parse: (inputData: TParserInputData) => OriginalAST | ParserSyntacticError[];
}

export type OriginalParserError = ParserSyntacticError[];
export type OriginalValidatorError = ValidationError[];

export class TranspilerError extends Error {}

export class ParserSyntacticError extends TranspilerError {
  private _offendingToken: any;
  private _line: number;
  private _column: number;
  private _start: number;
  private _stop: number;
  private _fileId: string;
  constructor(
    message: string,
    offendingToken: any,
    line: number,
    column: number,
    start: number,
    stop: number,
    fileId: string,
  ) {
    super(message);

    this._offendingToken = offendingToken;
    this._line = line;
    this._column = column;
    this._start = start;
    this._stop = stop;
    this._fileId = fileId;
  }

  get offendingToken(): any {
    return this._offendingToken;
  }

  get line(): number {
    return this._line;
  }

  get column(): number {
    return this._column;
  }

  get start(): number {
    return this._start;
  }

  get stop(): number {
    return this._stop;
  }

  get fileId(): string {
    return this._fileId;
  }
}
