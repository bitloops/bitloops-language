import antlr4 from 'antlr4';
// import { AntlerParser } from './grammar/AntlerParser';
import BitloopsLexer from './grammar/BitloopsLexer.js';
import Parser from './grammar/BitloopsParser.js';
// class ProgramContext extends antlr4.ParserRuleContext {
export class BitloopsLanguageAST extends Parser.ProgramContext {}

export interface IBitloopsParser {
  parse: (code: string) => BitloopsLanguageAST | BitloopsParserError;
}

export class BitloopsParserError extends Error {}
export class BitloopsParser implements IBitloopsParser {
  // private static getTree(code: string) {
  //   const parser: any = new AntlerParser(code);
  //   antlr4.tree.ParseTreeWalker.DEFAULT.walk(parser, parser.tree);
  //   return parser.bitloopsTree;
  // }

  parse(blCode: string): BitloopsLanguageAST | BitloopsParserError {
    const chars = new antlr4.InputStream(blCode);
    const lexer = new BitloopsLexer(chars) as any;
    const tokens = new antlr4.CommonTokenStream(lexer);
    try {
      const parser = new Parser(tokens);
      const tree = parser.program();
      return tree;
    } catch (error: any) {
      return new BitloopsParserError(JSON.stringify(error));
    }
  }
}
