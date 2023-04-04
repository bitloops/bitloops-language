import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { RepoPortNode } from '../nodes/repo-port/RepoPortNode.js';
import { AddApplicationUnexpectedErrorTransformer } from './generic/AddApplicationUnexpectedErrorTransformer.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class RepoPortNodeTransformer extends NodeModelToTargetASTTransformer<RepoPortNode> {
  private addApplicationUnexpectedErrorTransformer: AddApplicationUnexpectedErrorTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: RepoPortNode) {
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
