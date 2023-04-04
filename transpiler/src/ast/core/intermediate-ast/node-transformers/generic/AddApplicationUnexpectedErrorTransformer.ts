import { IntermediateASTNode } from '../../nodes/IntermediateASTNode.js';
import { ErrorIdentifiersNodeBuilderDirector } from '../../directors/ErrorIdentifiersNodeBuilderDirector.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';

interface NodeWithDependencies extends IntermediateASTNode {
  getReturnOkErrorTypeNodes(): ReturnOkErrorTypeNode[];
}

export class AddApplicationUnexpectedErrorTransformer {
  constructor(private node: NodeWithDependencies) {}

  public addApplicationUnexpectedErrorToReturnErrorType(): void {
    const returnOkErrorNodes = this.node.getReturnOkErrorTypeNodes();
    for (const returnOkErrorNode of returnOkErrorNodes) {
      const returnErrorsNode = returnOkErrorNode.getReturnErrorsType();
      const errorIdentifierNodes = returnErrorsNode.getErrorIdentifierNodes();
      const errosWithApplicationUnexpectedError =
        new ErrorIdentifiersNodeBuilderDirector().buildWithApplicationRepoUnexpectedError(
          errorIdentifierNodes,
        );
      returnOkErrorNode.replaceChild(returnErrorsNode, errosWithApplicationUnexpectedError);
    }
  }
}
