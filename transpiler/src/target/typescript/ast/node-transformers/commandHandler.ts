import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { CommandHandlerNode } from '../../../../ast/core/intermediate-ast/nodes/command/CommandHandlerNode.js';
import { AppendDotValueNodeTSTransformer } from './generic/appendDotValue.js';

export class CommandHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<CommandHandlerNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;
  private appendDotValueTransformer: AppendDotValueNodeTSTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: CommandHandlerNode) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
    this.appendDotValueTransformer = new AppendDotValueNodeTSTransformer(node, tree);
  }

  run(): void {
    this.prependAwaitToAllDependencyCalls();
    this.transformDotValue();
  }

  private prependAwaitToAllDependencyCalls(): void {
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls();
    this.prependAwaitTransformer.prependAwaitToDomainServiceEvaluationNode();
  }

  private transformDotValue(): void {
    this.appendDotValueTransformer.transformDotValueOfDomainEvaluations();
    this.appendDotValueTransformer.transformDotValueOfThisMethodCallExpressions();
    this.appendDotValueTransformer.transformDotValueOfDomainServiceResults();
  }
}
