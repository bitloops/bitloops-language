import { IntermediateASTTree } from '../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTNode } from '../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';

interface IIntermediateModelToASTTargetLanguageTransformer {
  run(): void;
}

export abstract class NodeModelToTargetASTTransformer<Node extends IntermediateASTNode>
  implements IIntermediateModelToASTTargetLanguageTransformer
{
  constructor(protected tree: IntermediateASTTree, protected node: Node) {}

  abstract run(): void;
}
