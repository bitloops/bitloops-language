import { BitloopsLanguageASTContext } from '../../index.js';
import { TBoundedContexts } from '../../types.js';
import BitloopsVisitor from './BitloopsVisitor/BitloopsVisitor.js';

export interface IBitloopsIntermediateASTParser {
  parse: (ast: BitloopsLanguageASTContext) => TBoundedContexts | BitloopsIntermediateASTParserError;
}

export class BitloopsIntermediateASTParserError extends Error {}

export class BitloopsIntermediateASTParser implements IBitloopsIntermediateASTParser {
  parse(ast: BitloopsLanguageASTContext): TBoundedContexts | BitloopsIntermediateASTParserError {
    const bitloopsVisitor = new BitloopsVisitor();
    bitloopsVisitor.visit(ast);
    return bitloopsVisitor.result;
  }
}
