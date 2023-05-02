import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTNode, TNodeType } from './nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from './nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOKErrorNodeTransformer } from './node-transformers/ReturnOkErrorNodeTransformer.js';
import { IASTToCompletedASTTransformer } from './node-transformers/index.js';
import { IntermediateAST, TBoundedContexts } from '../types.js';
import { DomainEventHandlerNodeTransformer } from './node-transformers/DomainEventHandlerNodeTransformer.js';
import { DomainEventHandlerDeclarationNode } from './nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { IntegrationEventHandlerDeclarationNode } from './nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { IntegrationEventHandlerNodeTransformer } from './node-transformers/IntegrationEventHandlerNodeTransformer.js';
import { IntegrationEventNode } from './nodes/integration-event/IntegrationEventNode.js';
import { IntegrationEventNodeTransformer } from './node-transformers/IntegrationEventNodeTransformer.js';
import { ExecuteNode } from './nodes/ExecuteNode.js';
import { ExecuteNodeTransformer } from './node-transformers/ExecuteNodeTransformer.js';
import { RepoPortNode } from './nodes/repo-port/RepoPortNode.js';
import { RepoPortNodeTransformer } from './node-transformers/RepoPortNodeTransformer.js';
import { ServicePortNode } from './nodes/service-port/ServicePortNode.js';
import { ServicePortNodeTransformer } from './node-transformers/ServicePortNodeTransformer.js';
import { DomainServiceNode } from './nodes/domain-service/DomainServiceNode.js';
import { DomainServiceNodeTransformer } from './node-transformers/DomainServiceNodeTransformer.js';
import { IfErrorExpressionNode } from './nodes/Expression/IfErrorExpressionNode.js';
import { IfErrorExpressionNodeTransformer } from './node-transformers/IfErrorExpressionNodeTransformer.js';

export class IntermediateASTToCompletedIntermediateASTTransformer {
  complete(intermediateAST: IntermediateAST): IntermediateAST {
    const boundedContexts = this.completeCore(intermediateAST.core);
    const intermediateASTSetup = intermediateAST.setup;
    return {
      core: boundedContexts,
      setup: intermediateASTSetup,
    };
  }

  private completeCore(core: TBoundedContexts): TBoundedContexts {
    let boundedContexts: TBoundedContexts = {};
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const [moduleName, ASTTree] of Object.entries(boundedContext)) {
        const treeUpdated = ASTTree.copy(); // TODO implement copy method
        const rootNode = treeUpdated.getRootNode();
        treeUpdated.traverse(rootNode, (node: IntermediateASTNode) => {
          const transformer = this.getNodeTransformer({
            intermediateASTNode: node,
            intermediateASTTree: treeUpdated,
          });

          if (transformer) {
            transformer.run();
          }
        });
        treeUpdated.buildValueRecursiveBottomUp(rootNode);

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

    const type: TNodeType = intermediateASTNode.getNodeType();

    switch (type) {
      case BitloopsTypesMapping.TIfErrorExpression: {
        const ifErrorExpressionNode = intermediateASTNode as IfErrorExpressionNode;
        return new IfErrorExpressionNodeTransformer(intermediateASTTree, ifErrorExpressionNode);
      }
      case BitloopsTypesMapping.TOkErrorReturnType: {
        const returnOkErrorNode = intermediateASTNode as ReturnOkErrorTypeNode;
        return new ReturnOKErrorNodeTransformer(intermediateASTTree, returnOkErrorNode);
      }
      case BitloopsTypesMapping.TDomainEventHandler: {
        const domainEventHandlerNode = intermediateASTNode as DomainEventHandlerDeclarationNode;
        return new DomainEventHandlerNodeTransformer(intermediateASTTree, domainEventHandlerNode);
      }
      case BitloopsTypesMapping.TIntegrationEventHandler: {
        const integrationEventHandlerNode =
          intermediateASTNode as IntegrationEventHandlerDeclarationNode;
        return new IntegrationEventHandlerNodeTransformer(
          intermediateASTTree,
          integrationEventHandlerNode,
        );
      }
      case BitloopsTypesMapping.TIntegrationEvent: {
        const integrationEventNode = intermediateASTNode as IntegrationEventNode;
        return new IntegrationEventNodeTransformer(intermediateASTTree, integrationEventNode);
      }
      case BitloopsTypesMapping.TExecute: {
        const executeNode = intermediateASTNode as ExecuteNode;
        return new ExecuteNodeTransformer(intermediateASTTree, executeNode);
      }
      case BitloopsTypesMapping.TRepoPort: {
        const repoPortNode = intermediateASTNode as RepoPortNode;
        return new RepoPortNodeTransformer(intermediateASTTree, repoPortNode);
      }
      case BitloopsTypesMapping.TServicePort: {
        const servicePortNode = intermediateASTNode as ServicePortNode;
        return new ServicePortNodeTransformer(intermediateASTTree, servicePortNode);
      }
      case BitloopsTypesMapping.TDomainService: {
        const servicePortNode = intermediateASTNode as DomainServiceNode;
        return new DomainServiceNodeTransformer(intermediateASTTree, servicePortNode);
      }
      default:
        return null;
    }
  }
}
