import Parser from './grammar/BitloopsSetupParser.js';

export class BitloopsLanguageSetupAST extends Parser.ProgramContext {}
export class BitloopsSetupParserError extends Error {}

export interface IBitloopsSetupParser {
  parse: (blCode: string) => BitloopsLanguageSetupAST | BitloopsSetupParserError;
}
