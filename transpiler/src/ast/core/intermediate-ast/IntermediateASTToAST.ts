import { BitloopsTypesMapping, TBitloopsTypesValues } from '../../../helpers/mappings.js';
import { TBoundedContexts } from '../../../types.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTNode } from './nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from './nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOKErrorNodeTransformer } from './ node-transformers/ReturnOkErrorNodeTransformer.js';
import { IASTToCompletedASTTransformer } from './ node-transformers/index.js';

export class IntermediateASTToCompletedIntermediateASTTransformer {
  complete(intermediateASTTree: TBoundedContexts): TBoundedContexts {
    let boundedContexts: TBoundedContexts;
    for (const [boundedContextName, boundedContext] of Object.entries(intermediateASTTree)) {
      for (const [moduleName, ASTTree] of Object.entries(boundedContext)) {
        const treeUpdated = ASTTree.copy();
        treeUpdated.traverse(
          treeUpdated.getRootNode(),
          (intermediateASTNode: IntermediateASTNode) => {
            const transformer = this.getNodeTransformer({
              intermediateASTNode,
              intermediateASTTree: treeUpdated,
            });

            if (transformer) {
              transformer.run();
            }
          },
        );
        if (!boundedContexts) {
          boundedContexts = {
            [boundedContextName]: {
              [moduleName]: treeUpdated,
            },
          };
        } else if (!boundedContexts[boundedContextName]) {
          boundedContexts[boundedContextName] = {
            [moduleName]: treeUpdated,
          };
        } else if (!boundedContexts[boundedContextName][moduleName]) {
          boundedContexts[boundedContextName][moduleName] = treeUpdated;
        }
      }
    }
    return boundedContexts;
  }

  private getNodeTransformer(factoryParams: {
    intermediateASTNode: IntermediateASTNode;
    intermediateASTTree: IntermediateASTTree;
  }): IASTToCompletedASTTransformer | null {
    const { intermediateASTNode, intermediateASTTree } = factoryParams;

    const type: TBitloopsTypesValues = intermediateASTNode.getNodeType();

    switch (type) {
      case BitloopsTypesMapping.TOkErrorReturnType: {
        const returnOkErrorNode = intermediateASTNode as ReturnOkErrorTypeNode;
        return new ReturnOKErrorNodeTransformer(intermediateASTTree, returnOkErrorNode);
      }
      default:
        return null;
    }
  }
}
