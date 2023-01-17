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
  ) => {
    // const stack: any = recognizer.getTokenErrorDisplay(offendingSymbol);
    // console.log("rule stack: "+stack);
    // console.log(`line: ${line}:${column}, offendingSymbol : ${offendingToken.text}, msg: ${msg}`);
    const start = offendingToken.start;
    const stop = offendingToken.stop;
    // console.log(`start: ${start}, stop: ${stop}`);
    // let range = new Range(error.line - 1, error.startColumn, error.line - 1, error.endColumn);

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
