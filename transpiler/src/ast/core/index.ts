import { OriginalASTCore, OriginalASTSetup } from '../../parser/core/types.js';
import { OriginalAST } from '../../parser/index.js';
import { TBoundedContexts } from '../../types.js';
import BitloopsVisitor from './BitloopsVisitor/BitloopsVisitor.js';
import { isIntermediateASTParserError, isIntermediateASTValidationErrors } from './guards/index.js';
import { IntermediateASTToCompletedIntermediateASTTransformer } from './intermediate-ast/IntermediateASTToAST.js';
import { IntermediateASTValidator } from './intermediate-ast/IntermediateASTValidator.js';
import {
  IntermediateASTParserError,
  IntermediateASTValidationError,
  IIntermediateASTParser,
  IntermediateASTError,
  IIntermediateASTValidator,
  IntermediateAST,
  IntermediateASTSetup,
} from './types.js';

export class IntermediateASTParser implements IIntermediateASTParser {
  private validator: IIntermediateASTValidator;
  private intermediateASTTransformer: IntermediateASTToCompletedIntermediateASTTransformer;

  constructor() {
    this.validator = new IntermediateASTValidator();
    this.intermediateASTTransformer = new IntermediateASTToCompletedIntermediateASTTransformer();
  }

  parse(ast: OriginalAST): IntermediateAST | IntermediateASTError {
    const intermediateAST = this.originalASTToIntermediateASTTree(ast);
    if (isIntermediateASTParserError(intermediateAST)) {
      return intermediateAST;
    }

    const validationResult = this.validateIntermediateASTTree(intermediateAST);
    if (isIntermediateASTValidationErrors(validationResult)) {
      return validationResult;
    }

    const completedASTTree = this.completeIntermediateASTTree(intermediateAST);

    return completedASTTree;
  }

  private originalASTToIntermediateASTTree(
    ast: OriginalAST,
  ): IntermediateAST | IntermediateASTParserError[] {
    const intermediateASTCoreTree = this.originalASTCoreToIntermediateASTTree(ast.core);
    if (isIntermediateASTParserError(intermediateASTCoreTree)) {
      return intermediateASTCoreTree;
    }
    if (!ast.setup) {
      return {
        core: intermediateASTCoreTree,
      };
    }
    const intermediateASTSetupTree = this.originalASTSetupToIntermediateASTTree(ast.setup);
    return {
      core: intermediateASTCoreTree,
      setup: intermediateASTSetupTree,
    };
  }

  private originalASTSetupToIntermediateASTTree(astSetup: OriginalASTSetup): IntermediateASTSetup {
    const setupAST: IntermediateASTSetup = {};
    for (const [fileId, ASTData] of Object.entries(astSetup)) {
      const bitloopsVisitor = new BitloopsVisitor(fileId);
      bitloopsVisitor.visit(ASTData.ASTContext);
      const { intermediateASTTree } = bitloopsVisitor;

      setupAST[fileId] = intermediateASTTree;
    }
    return setupAST;
  }

  private originalASTCoreToIntermediateASTTree(
    astCore: OriginalASTCore,
    // TODO IntermediateASTParserError will be generated in previous step if it exists, visitor is not expected to generate it
    // TODO Remove this when error listener for syntax errors is implemented
  ): TBoundedContexts | IntermediateASTParserError[] {
    const boundedContexts: TBoundedContexts = {};
    for (const [boundedContextName, boundedContext] of Object.entries(astCore)) {
      for (const [moduleName, module] of Object.entries(boundedContext)) {
        for (const [fileId, ASTData] of Object.entries(module)) {
          const bitloopsVisitor = new BitloopsVisitor(fileId);
          bitloopsVisitor.visit(ASTData.ASTContext);
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

  private completeIntermediateASTTree(intermediateAST: IntermediateAST): IntermediateAST {
    return this.intermediateASTTransformer.complete(intermediateAST);
  }

  private validateIntermediateASTTree(
    intermediateAST: IntermediateAST,
  ): void | IntermediateASTValidationError[] {
    return this.validator.validate(intermediateAST);
  }
}
