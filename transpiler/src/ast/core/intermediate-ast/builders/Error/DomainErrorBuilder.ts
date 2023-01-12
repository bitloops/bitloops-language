import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { DomainErrorNode } from '../../nodes/Error/DomainErrorNode.js';
import { ErrorIdNode } from '../../nodes/Error/errorId.js';
import { ErrorMessageNode } from '../../nodes/Error/message.js';
import { EvaluationFieldNode } from '../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from '../IBuilder.js';
import { ErrorIdNodeBuilder } from './ErrorIdNodeBuilder.js';
import { ErrorMessageNodeBuilder } from './ErrorMessageNodeBuilder.js';

export class DomainErrorBuilder implements IBuilder<DomainErrorNode> {
  public readonly NAME = 'DomainErrors';

  private domainErrorNode: DomainErrorNode;
  private message: ErrorMessageNode;
  private errorId: ErrorIdNode;
  private parameters: ParameterListNode;
  private identifierName: IdentifierNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.domainErrorNode = new DomainErrorNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): DomainErrorBuilder {
    this.identifierName = identifierNode;
    const domainErrorName = identifierNode.getIdentifierName();
    this.domainErrorNode.setClassName(domainErrorName);
    return this;
  }

  public withMessage(messageNode: EvaluationFieldNode): DomainErrorBuilder {
    const expression = messageNode.getExpression();
    this.message = new ErrorMessageNodeBuilder().withExpression(expression).build();
    return this;
  }
  public withErrorId(idNode: EvaluationFieldNode): DomainErrorBuilder {
    const expression = idNode.getExpression();
    this.errorId = new ErrorIdNodeBuilder().withExpression(expression).build();
    return this;
  }
  public withParameters(parametersList: ParameterListNode): DomainErrorBuilder {
    this.parameters = parametersList;
    return this;
  }
  public build(): DomainErrorNode {
    this.intermediateASTTree.insertChild(this.domainErrorNode);
    this.intermediateASTTree.insertChild(this.identifierName);
    this.intermediateASTTree.insertSibling(this.parameters);
    this.intermediateASTTree.insertSibling(this.message);
    this.intermediateASTTree.insertSibling(this.errorId);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.domainErrorNode.buildObjectValue();

    return this.domainErrorNode;
  }
}
