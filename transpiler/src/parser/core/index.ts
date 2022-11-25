import antlr4 from 'antlr4';
import {
  TBoundedContextName,
  TClassName,
  TClassType,
  TModuleName,
  TParserCoreInputData,
} from '../../types.js';
import { AntlerParser } from './grammar/AntlerParser.js';
import BitloopsLexer from './grammar/BitloopsLexer.js';
import Parser from './grammar/BitloopsParser.js';
import { isBitloopsParserError } from './guards/index.js';

export class BitloopsLanguageAST extends Parser.ProgramContext {}

export type BitloopsLanguageASTContext = {
  [boundedContext: TBoundedContextName]: Partial<{
    [classType in TClassType]: {
      [className: TClassName]: {
        initialAST: BitloopsLanguageAST;
        module: TModuleName;
        fileId: string;
      };
    };
  }>;
};

export interface IBitloopsParser {
  parse: (inputData: TParserCoreInputData) => BitloopsLanguageASTContext | BitloopsParserError;
}

export class BitloopsParserError extends Error {}
export class BitloopsParser implements IBitloopsParser {
  /**
   * Simple initial AST.
   * @param blCode
   * @returns
   */
  private static getSimpleAST(blCode: string): any {
    const parser: any = new AntlerParser(blCode);
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(parser, parser.tree);
    return parser.bitloopsTree;
  }

  /**
   * Initial AST. Should be used instead of the deprecated simple initial AST.
   * @param blCode string
   * @returns Parser.ProgramContext
   */
  private static getInitialAST(blCode: string): BitloopsLanguageAST | BitloopsParserError {
    const chars = new antlr4.InputStream(blCode);
    const lexer: any = new BitloopsLexer(chars) as any;
    const tokens = new antlr4.CommonTokenStream(lexer);
    try {
      const parser = new Parser(tokens);
      const tree = parser.program() as BitloopsLanguageAST;
      return tree;
    } catch (error: any) {
      return new BitloopsParserError(JSON.stringify(error));
    }
  }

  parse(inputData: TParserCoreInputData): BitloopsLanguageASTContext | BitloopsParserError {
    /**
     * For each file, we need to extract the classes and their types
     * and then we need to create the trees of the classes.
     * We should return for each bounded context and class type
     * an array of classes with their ASTs and module name.
     *
     * @TODO: We currently use the deprecated AST but in the future we will
     * use the visitors based initial AST.
     */
    const boundedContexts: BitloopsLanguageASTContext = {};
    inputData.map((data) => {
      const { boundedContext, module, fileId, fileContents } = data;
      try {
        if (boundedContexts[boundedContext] === undefined) {
          boundedContexts[boundedContext] = null;
        }
        const myTree = BitloopsParser.getSimpleAST(fileContents);
        try {
          myTree.children.map((child: any) => {
            const bitloopsClass = child.children[0];
            const { classType, className } = getBitloopsClassFromGrammarType(bitloopsClass);
            // TODO - this can be optimized, since we are creating the same file-tree for each source element of the file
            const initialAST = BitloopsParser.getInitialAST(fileContents);
            if (isBitloopsParserError(initialAST)) {
              throw initialAST;
            }
            const classNameObject = {
              initialAST,
              module,
              fileId,
            };
            if (boundedContexts[boundedContext] === null) {
              // first time we come across this boundedContext
              boundedContexts[boundedContext] = {
                [classType]: { [className]: classNameObject },
              };
            } else if (boundedContexts[boundedContext][classType] === undefined) {
              // first time we come across this classType
              boundedContexts[boundedContext][classType] = { [className]: classNameObject };
            } else {
              // we already have this classType and we must check if
              // this className is unique in the bounded context
              if (boundedContexts[boundedContext][classType][className] !== undefined) {
                throw new BitloopsParserError(
                  `Duplicate class name ${className} found in bounded context ${boundedContext} in file ${fileId}`,
                );
              } else {
                boundedContexts[boundedContext][classType][className] = classNameObject;
              }
            }
            return null;
          });
        } catch (error) {
          return error as BitloopsParserError;
        }
      } catch (error) {
        return error as BitloopsParserError;
      }
      return null;
    });
    return boundedContexts;
  }
}

// TODO Use a mapper instead of this function
const getBitloopsClassFromGrammarType = (
  node: any,
): { classType: TClassType; className: TClassName } => {
  if (node.children[0].value === 'Props') {
    return { classType: 'Props', className: node.children[1].value };
  }
  return {
    classType:
      node.children[0].value === 'Root'
        ? ((node.children[1].value + 's') as TClassType)
        : ((node.children[0].value + 's') as TClassType),
    className:
      node.children[0].value === 'Root'
        ? (node.children[2].value as TClassType)
        : (node.children[1].value as TClassType),
  };
};
