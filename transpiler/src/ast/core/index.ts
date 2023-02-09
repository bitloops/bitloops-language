import { OriginalASTCore, OriginalASTSetup } from '../../parser/core/types.js';
import { OriginalAST } from '../../parser/index.js';
import BitloopsVisitor from './BitloopsVisitor/BitloopsVisitor.js';
import { IntermediateASTToCompletedIntermediateASTTransformer } from './intermediate-ast/IntermediateASTToAST.js';
import {
  IIntermediateASTParser,
  IntermediateAST,
  IntermediateASTSetup,
  TBoundedContexts,
} from './types.js';

export class IntermediateASTParser implements IIntermediateASTParser {
  private intermediateASTTransformer: IntermediateASTToCompletedIntermediateASTTransformer;

  constructor() {
    this.intermediateASTTransformer = new IntermediateASTToCompletedIntermediateASTTransformer();
  }

  parse(ast: OriginalAST): IntermediateAST {
    const intermediateAST = this.originalASTToIntermediateASTTree(ast);
    return intermediateAST;
  }

  complete(intermediateAST: IntermediateAST): IntermediateAST {
    const completedASTTree = this.completeIntermediateASTTree(intermediateAST);

    return completedASTTree;
  }

  private originalASTToIntermediateASTTree(ast: OriginalAST): IntermediateAST {
    const intermediateASTCoreTree = this.originalASTCoreToIntermediateASTTree(ast.core);
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

  private originalASTCoreToIntermediateASTTree(astCore: OriginalASTCore): TBoundedContexts {
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
}

export { IntermediateASTValidator } from './intermediate-ast/IntermediateASTValidator.js';
