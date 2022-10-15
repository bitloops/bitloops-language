import { BitloopsLanguageSetupAST } from '../../index.js';
import { ISetupData } from '../../types.js';
import BitloopsSetupVisitor from './BitloopsSetupVisitor/BitloopsSetupVisitor.js';

export interface IBitloopsIntermediateSetupASTParser {
  parse: (ast: BitloopsLanguageSetupAST) => ISetupData | BitloopsIntermediateSetupASTParserError;
}

export class BitloopsIntermediateSetupASTParserError extends Error {}

export class BitloopsIntermediateSetupASTParser implements IBitloopsIntermediateSetupASTParser {
  parse(ast: BitloopsLanguageSetupAST): ISetupData | BitloopsIntermediateSetupASTParserError {
    const bitloopsVisitor = new BitloopsSetupVisitor();
    bitloopsVisitor.visit(ast);
    return bitloopsVisitor.result;
  }
}
