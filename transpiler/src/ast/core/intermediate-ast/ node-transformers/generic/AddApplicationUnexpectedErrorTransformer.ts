import { IntermediateASTNode } from '../../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { ErrorIdentifiersNodeBuilderDirector } from '../../directors/ErrorIdentifiersNodeBuilderDirector.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';

interface NodeWithDependencies extends IntermediateASTNode {
  getReturnOkErrorTypeNode(): ReturnOkErrorTypeNode;
}

export class AddApplicationUnexpectedErrorTransformer {
  constructor(private node: NodeWithDependencies) {}

  public addApplicationUnexpectedErrorToReturnErrorType(): void {
    const returnOkErrorNode = this.node.getReturnOkErrorTypeNode();
    const returnErrorsNode = returnOkErrorNode.getReturnErrorsType();
    const errorIdentifierNodes = returnErrorsNode.getErrorIdentifierNodes();
    const errosWithApplicationUnexpectedError =
      new ErrorIdentifiersNodeBuilderDirector().buildWithApplicationRepoUnexpectedError(
        errorIdentifierNodes,
      );
    returnOkErrorNode.replaceChild(returnErrorsNode, errosWithApplicationUnexpectedError);
  }
}
