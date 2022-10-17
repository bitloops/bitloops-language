// import { BitloopsLanguageSetupAST } from '../../index.js';
import { ISetupData } from '../../types.js';
// TODO This is a temporary solution.
export type BitloopsLanguageSetupAST = any;

/**
 * Parser
 * bl code to AST
 */
export class BitloopsSetupParserError extends Error {}

export interface IBitloopsSetupParser {
  parse: (blCode: string) => BitloopsLanguageSetupAST | BitloopsSetupParserError;
}

export class BitloopsSetupParser implements IBitloopsSetupParser {
  parse(_blCode: string): BitloopsLanguageSetupAST | BitloopsSetupParserError {
    return 'TODO' as any;
  }
}

/**
 * AST To Intermediate Model
 */
export interface IBitloopsIntermediateSetupASTParser {
  parse: (ast: BitloopsLanguageSetupAST) => ISetupData | BitloopsIntermediateSetupASTParserError;
}

export class BitloopsIntermediateSetupASTParserError extends Error {}

export class BitloopsIntermediateSetupASTParser implements IBitloopsIntermediateSetupASTParser {
  parse(_ast: BitloopsLanguageSetupAST): ISetupData | BitloopsIntermediateSetupASTParserError {
    // TODO
    return 'TODO' as any;
  }
}
