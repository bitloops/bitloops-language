import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PropsIdentifierNode } from '../../nodes/Props/PropsIdentifierNode.js';
import { PropsNode } from '../../nodes/Props/PropsNode.js';
import { IBuilder } from '../IBuilder.js';

export class PropsNodeBuilder implements IBuilder<PropsNode> {
  private propsNode: PropsNode;
  private identifierNode: PropsIdentifierNode;
  private variablesNode: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.propsNode = new PropsNode(metadata);
  }

  public withIdentifier(propsIdentifierNode: PropsIdentifierNode): PropsNodeBuilder {
    this.identifierNode = propsIdentifierNode;
    const propsName = propsIdentifierNode.getIdentifierName();
    this.propsNode.setClassName(propsName);
    return this;
  }

  public withVariables(fieldListNode: FieldListNode): PropsNodeBuilder {
    this.variablesNode = fieldListNode;
    return this;
  }

  public build(): PropsNode {
    this.intermediateASTTree.insertChild(this.propsNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.variablesNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.propsNode.buildObjectValue();

    return this.propsNode;
  }
}
