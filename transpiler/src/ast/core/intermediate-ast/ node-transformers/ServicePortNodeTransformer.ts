import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { ServicePortNode } from '../nodes/service-port/ServicePortNode.js';
import { AddApplicationUnexpectedErrorTransformer } from './generic/AddApplicationUnexpectedErrorTransformer.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ServicePortNodeTransformer extends NodeModelToTargetASTTransformer<ServicePortNode> {
  private addApplicationUnexpectedErrorTransformer: AddApplicationUnexpectedErrorTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: ServicePortNode) {
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
