import { BitloopsLanguageSetupAST } from '../..';
import { ISetupData } from '../../types';
import BitloopsSetupVisitor from './BitloopsSetupVisitor/BitloopsSetupVisitor';

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
