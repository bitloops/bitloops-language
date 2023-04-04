import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { ExecuteNode } from '../nodes/ExecuteNode.js';
import { AddApplicationUnexpectedErrorTransformer } from './generic/AddApplicationUnexpectedErrorTransformer.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ExecuteNodeTransformer extends NodeModelToTargetASTTransformer<ExecuteNode> {
  private addApplicationUnexpectedErrorTransformer: AddApplicationUnexpectedErrorTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: ExecuteNode) {
    super(tree, node);
    this.addApplicationUnexpectedErrorTransformer = new AddApplicationUnexpectedErrorTransformer(
      node,
    );
  }

  run(): void {
    this.addApplicationUnexpectedError();
  }

  private addApplicationUnexpectedError(): void {
    this.addApplicationUnexpectedErrorTransformer.addApplicationUnexpectedErrorToReturnErrorType();
  }
}
