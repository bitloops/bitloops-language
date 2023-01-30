import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { ApplicationErrorNode } from '../../nodes/Error/ApplicationError.js';
import { ErrorIdNode } from '../../nodes/Error/errorId.js';
import { ErrorMessageNode } from '../../nodes/Error/message.js';
import { EvaluationFieldNode } from '../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from '../IBuilder.js';
import { ErrorIdNodeBuilder } from './ErrorIdNodeBuilder.js';
import { ErrorMessageNodeBuilder } from './ErrorMessageNodeBuilder.js';
// import { ErrorParametersNodeBuilder } from './ErrorParametersBuilder.js';

export class ApplicationErrorBuilder implements IBuilder<ApplicationErrorNode> {
  public readonly NAME = 'ApplicationErrors';

  private applicationErrorNode: ApplicationErrorNode;
  private message: ErrorMessageNode;
  private errorId: ErrorIdNode;
  private parameters: ParameterListNode;
  private identifierName: IdentifierNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.applicationErrorNode = new ApplicationErrorNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): ApplicationErrorBuilder {
    this.identifierName = identifierNode;
    const applicationErrorName = identifierNode.getIdentifierName();
    this.applicationErrorNode.setClassName(applicationErrorName);
    return this;
  }

  public withMessage(messageNode: EvaluationFieldNode): ApplicationErrorBuilder {
    const expression = messageNode.getExpression();
    this.message = new ErrorMessageNodeBuilder().withExpression(expression).build();
    return this;
  }
  public withErrorId(idNode: EvaluationFieldNode): ApplicationErrorBuilder {
    const expression = idNode.getExpression();
    this.errorId = new ErrorIdNodeBuilder().withExpression(expression).build();
    return this;
  }
  public withParameters(parameters: ParameterListNode): ApplicationErrorBuilder {
    this.parameters = parameters;
    return this;
  }
  public build(): ApplicationErrorNode {
    this.intermediateASTTree.insertChild(this.applicationErrorNode);
    this.intermediateASTTree.insertChild(this.identifierName);
    this.intermediateASTTree.insertSibling(this.parameters);
    this.intermediateASTTree.insertSibling(this.message);
    this.intermediateASTTree.insertSibling(this.errorId);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.applicationErrorNode.buildObjectValue();

    return this.applicationErrorNode;
  }
}
