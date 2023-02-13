import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { CommandDeclarationNode } from '../../nodes/command/CommandDeclarationNode.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class CommandNodeBuilder implements IBuilder<CommandDeclarationNode> {
  private commandNode: CommandDeclarationNode;
  private identifierNode: IdentifierNode;
  private fieldListNode: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.commandNode = new CommandDeclarationNode(metadata);
  }

  public withIdentifier(commandIdentifierNode: IdentifierNode): CommandNodeBuilder {
    this.identifierNode = commandIdentifierNode;
    const commandName = commandIdentifierNode.getIdentifierName();
    this.commandNode.setClassName(commandName);
    return this;
  }

  public withFieldList(fieldListNode: FieldListNode): CommandNodeBuilder {
    this.fieldListNode = fieldListNode;
    return this;
  }

  public build(): CommandDeclarationNode {
    this.intermediateASTTree.insertChild(this.commandNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.fieldListNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.commandNode.buildObjectValue();

    return this.commandNode;
  }
}
