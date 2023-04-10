import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { QueryHandlerNode } from '../../../../ast/core/intermediate-ast/nodes/query/QueryHandlerNode.js';
import { AppendDotValueNodeTSTransformer } from './generic/appendDotValue.js';

export class QueryHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<QueryHandlerNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;
  private appendDotValueTransformer: AppendDotValueNodeTSTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: QueryHandlerNode) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
    this.appendDotValueTransformer = new AppendDotValueNodeTSTransformer(node, tree);
  }

  run(): void {
    this.transformDotValue();
    this.prependAwaitToAllDependencyCalls();
  }

  private prependAwaitToAllDependencyCalls(): void {
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls();
    this.prependAwaitTransformer.prependAwaitToDomainServiceEvaluationNode();
  }

  private transformDotValue(): void {
    this.appendDotValueTransformer.transformDotValueOfDomainMethodResults();
    this.appendDotValueTransformer.transformDotValueOfDomainEvaluations();
    this.appendDotValueTransformer.transformDotValueOfThisMethodCallExpressions();
    this.appendDotValueTransformer.transformDotValueOfDomainServiceResults();
  }
}
