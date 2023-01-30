import antlr from 'antlr4';
import { ParserSyntacticError } from './types.js';

export class VerboseErrorListener extends (antlr as any).error.ErrorListener {
  private errors: ParserSyntacticError[];
  constructor() {
    super();
    this.errors = [];
  }
  syntaxError = (
    _recognizer: any,
    offendingToken: any,
    line: number,
    column: number,
    msg: string,
    _e: any,
  ): void => {
    // const stack: any = recognizer.getTokenErrorDisplay(offendingSymbol);
    const start = offendingToken.start;
    const stop = offendingToken.stop;

    const error = new ParserSyntacticError(msg, offendingToken, line, column, start, stop);
    this.errors.push(error);
  };

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public getErrors(): ParserSyntacticError[] {
    return this.errors;
  }
}
