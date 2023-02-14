/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { TContextInfo } from '../../../BitloopsVisitor/BitloopsVisitor.js';
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { CommandDeclarationNode } from '../../nodes/command/CommandDeclarationNode.js';
import { CommandTopicNode } from '../../nodes/command/CommandTopicNode.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { CommandTopicNodeBuilder } from './CommandTopicNodeBuilder.js';

// produce the QueryNodeBuilder builder
export class CommandNodeBuilder implements IBuilder<CommandDeclarationNode> {
  private commandNode: CommandDeclarationNode;
  private identifierNode: IdentifierNode;
  private fieldListNode: FieldListNode;
  private topicNode: CommandTopicNode;
  private contextInfo: TContextInfo;
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

  public withTopic(topicNode: CommandTopicNode): CommandNodeBuilder {
    this.topicNode = topicNode;
    return this;
  }

  public withContextInfo(contextInfo: TContextInfo): CommandNodeBuilder {
    this.contextInfo = contextInfo;
    return this;
  }

  private getDefaultTopicNode(): CommandTopicNode {
    const topicNode = new CommandTopicNodeBuilder()
      .generateTopicName(this.identifierNode.getValue().identifier, this.contextInfo)
      .build();
    return topicNode;
  }

  public build(): CommandDeclarationNode {
    this.intermediateASTTree.insertChild(this.commandNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.fieldListNode);
    if (this.topicNode) {
      this.intermediateASTTree.insertSibling(this.topicNode);
    } else {
      this.intermediateASTTree.insertSibling(this.getDefaultTopicNode());
    }
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.commandNode.buildObjectValue();

    return this.commandNode;
  }
}
