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

  /**
   * prependAwait should run after transformDotValue, since it alters the value of some identifiers by prepending 'await '
   * and that would prevent transformDotValue from finding the identifiers
   */
  run(): void {
    this.transformDotValue();
    this.prependAwaitToAllDependencyCalls();
  }

  /**
   * finds allDependency calls and alters thisNode's value by prepending 'await '
   */
  private prependAwaitToAllDependencyCalls(): void {
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls();
    this.prependAwaitTransformer.prependAwaitToDomainServiceEvaluationNode();
  }

  /**
   * transform of domain method results should be first,
   * before the alteration of domain entity identifiers(which would alter the entity identifier by appending '.value')
   * and therefore we couldn't find the entity identifier when looking for its methods
   */
  private transformDotValue(): void {
    this.appendDotValueTransformer.transformDotValueOfDomainMethodResults();
    this.appendDotValueTransformer.transformDotValueOfDomainEvaluations();
    this.appendDotValueTransformer.transformDotValueOfThisMethodCallExpressions();
    this.appendDotValueTransformer.transformDotValueOfDomainServiceResults();
  }
}
