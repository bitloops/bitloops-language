// import BitloopsParser from '../../../../../grammar/BitloopsParser.js';
// // import BitloopsL
import antlr4 from 'antlr4';
// import { BufferedTokenStream } from 'antlr4/BufferedTokenStream.js';
import BitloopsLexer from '../../../parser/core/grammar/BitloopsLexer.js';
import BitloopsParser from '../../../parser/core/grammar/BitloopsParser.js';
// import BitloopsVisitor from './BitloopsVisitor.js';

export default function main(_input: string): void {
  const chars = new antlr4.InputStream(_input);
  const lexer: any = new BitloopsLexer(chars);
  const tokens: any = new antlr4.CommonTokenStream(lexer);
  const parser: any = new BitloopsParser(tokens);
  // parser.setBuildParseTree(true);
  const tree = parser.program();
  console.log(tree.toStringTree(parser.ruleNames));
  // const bitloopsVisitor = new BitloopsVisitor();
  // const result = bitloopsVisitor.visit(tree);
  // // console.log('input:', input, 'RESULT:', JSON.stringify(result[0][0][2]));
  // return result[0][0][2];
}
