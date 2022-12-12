import { BitloopsLanguageASTContext } from '../../index.js';
import { TBoundedContexts } from '../../types.js';
import BitloopsVisitor from './BitloopsVisitor/BitloopsVisitor.js';
import { isIntermediateASTParserError, isIntermediateASTValidationErrors } from './guards/index.js';
import { IntermediateASTToCompletedIntermediateASTTransformer } from './intermediate-ast/IntermediateASTToAST.js';
import { IntermediateASTValidator } from './intermediate-ast/IntermediateASTValidator.js';
import {
  IntermediateASTParserError,
  IntermediateASTValidationError,
  IBitloopsIntermediateASTParser,
  BitloopsIntermediateASTError,
  IIntermediateASTValidator,
} from './types.js';

export class BitloopsIntermediateASTParser implements IBitloopsIntermediateASTParser {
  private validator: IIntermediateASTValidator;
  private intermediateASTTransformer: IntermediateASTToCompletedIntermediateASTTransformer;

  constructor() {
    this.validator = new IntermediateASTValidator();
    this.intermediateASTTransformer = new IntermediateASTToCompletedIntermediateASTTransformer();
  }

  parse(ast: BitloopsLanguageASTContext): TBoundedContexts | BitloopsIntermediateASTError {
    const intermediateASTTree = this.originalASTToIntermediateASTTree(ast);
    if (isIntermediateASTParserError(intermediateASTTree)) {
      return intermediateASTTree;
    }

    const completedASTTree = this.completeIntermediateASTTree(intermediateASTTree);

    const validationResult = this.validateIntermediateASTTree(completedASTTree);
    if (isIntermediateASTValidationErrors(validationResult)) {
      return validationResult;
    }

    return intermediateASTTree;
  }

  private originalASTToIntermediateASTTree(
    ast: BitloopsLanguageASTContext,
  ): TBoundedContexts | IntermediateASTParserError {
    const boundedContexts: TBoundedContexts = {};
    for (const [boundedContextName, boundedContext] of Object.entries(ast)) {
      for (const [moduleName, module] of Object.entries(boundedContext)) {
        for (const [fileId, ASTData] of Object.entries(module)) {
          const bitloopsVisitor = new BitloopsVisitor(fileId);
          bitloopsVisitor.visit(ASTData.initialAST);
          const { intermediateASTTree } = bitloopsVisitor;

          if (boundedContexts[boundedContextName] === undefined) {
            boundedContexts[boundedContextName] = {
              [moduleName]: intermediateASTTree,
            };
          } else if (boundedContexts[boundedContextName][moduleName] === undefined) {
            boundedContexts[boundedContextName][moduleName] = intermediateASTTree;
          } else {
            // merge trees
            const existingTree = boundedContexts[boundedContextName][moduleName];
            boundedContexts[boundedContextName][moduleName] =
              existingTree.mergeWithTree(intermediateASTTree);
          }
        }
      }
    }
    return boundedContexts;
  }

  private completeIntermediateASTTree(intermediateASTTree: TBoundedContexts): TBoundedContexts {
    return this.intermediateASTTransformer.complete(intermediateASTTree);
  }

  private validateIntermediateASTTree(
    intermediateASTTree: TBoundedContexts,
  ): void | IntermediateASTValidationError[] {
    return this.validator.validate(intermediateASTTree);
  }
}
