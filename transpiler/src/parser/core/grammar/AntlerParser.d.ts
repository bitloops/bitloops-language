export class AntlerParser extends BitloopsParserListener {
  constructor(string: any);
  parser: BitloopsParser;
  _tree: BitloopsParser.ProgramContext;
  getBitloopsModel: any;
  get test(): any;
  get tree(): BitloopsParser.ProgramContext;
  get bitloopsTree(): any;
  enterProgram(ctx: any): void;
}
import BitloopsParserListener from './BitloopsParserListener.js';
import BitloopsParser from './BitloopsParser.js';
