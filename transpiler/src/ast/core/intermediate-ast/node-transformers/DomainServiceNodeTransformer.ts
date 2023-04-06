import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { DomainServiceNode } from '../nodes/domain-service/DomainServiceNode.js';
import { AddApplicationUnexpectedErrorTransformer } from './generic/AddApplicationUnexpectedErrorTransformer.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class DomainServiceNodeTransformer extends NodeModelToTargetASTTransformer<DomainServiceNode> {
  private addApplicationUnexpectedErrorTransformer: AddApplicationUnexpectedErrorTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: DomainServiceNode) {
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
