import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReadModelNode } from '../../nodes/readModel/ReadModel.js';
import { ReadModelIdentifierNode } from '../../nodes/readModel/ReadModelIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class ReadModelNodeBuilder implements IBuilder<ReadModelNode> {
  private readModel: ReadModelNode;
  private identifierNode: ReadModelIdentifierNode;
  private fieldListNode: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.readModel = new ReadModelNode(metadata);
  }

  public withIdentifier(readModelIdentifier: ReadModelIdentifierNode): ReadModelNodeBuilder {
    this.identifierNode = readModelIdentifier;
    const readModelName = readModelIdentifier.getIdentifierName();
    this.readModel.setClassName(readModelName);
    return this;
  }

  public withFields(fieldListNode: FieldListNode): ReadModelNodeBuilder {
    this.fieldListNode = fieldListNode;
    return this;
  }

  public build(): ReadModelNode {
    this.intermediateASTTree.insertChild(this.readModel);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.fieldListNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.readModel.buildObjectValue();

    return this.readModel;
  }
}
