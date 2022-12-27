import { BitloopsLanguageSetupAST } from '../../parser/setup/types.js';
import { ISetupData } from '../../types.js';
import BitloopsSetupVisitor from './BitloopsSetupVisitor/BitloopsSetupVisitor.js';
import {
  BitloopsIntermediateSetupASTParserError,
  IBitloopsIntermediateSetupASTParser,
} from './types.js';

export class BitloopsIntermediateSetupASTParser implements IBitloopsIntermediateSetupASTParser {
  parse(ast: BitloopsLanguageSetupAST): ISetupData | BitloopsIntermediateSetupASTParserError {
    const bitloopsVisitor = new BitloopsSetupVisitor();
    const result = bitloopsVisitor.visit(ast);
    return result;
  }
}
