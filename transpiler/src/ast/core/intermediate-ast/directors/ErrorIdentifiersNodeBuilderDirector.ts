import { ErrorIdentifierNodeBuilder } from '../builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ErrorIdentifierNode } from '../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { ErrorIdentifiersNode } from '../nodes/ErrorIdentifiers/ErrorIdentifiersNode.js';

export class ErrorIdentifiersNodeBuilderDirector {
  private builder: ErrorIdentifiersNodeBuilder;
  public static readonly unexpectedRepoErrorName = 'Application.Repo.Errors.Unexpected';

  constructor() {
    this.builder = new ErrorIdentifiersNodeBuilder();
  }

  public buildWithApplicationRepoUnexpectedError(
    errorIdentifierNodes?: ErrorIdentifierNode[],
  ): ErrorIdentifiersNode {
    const errorIdentifierNode = new ErrorIdentifierNodeBuilder()
      .withName(ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName)
      .build();
    const errorNodes = [errorIdentifierNode];
    if (errorIdentifierNodes) {
      errorNodes.push(...errorIdentifierNodes);
    }
    return this.builder.withErrors(errorNodes).build();
  }
}
