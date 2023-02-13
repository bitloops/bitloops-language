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
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { IntegrationEventIdentifierNode } from '../../nodes/integration-event/IntegrationEventIdentifierNode.js';
import { IntegrationEventNode } from '../../nodes/integration-event/IntegrationEventNode.js';
import { IntegrationVersionMapperListNode } from '../../nodes/integration-event/IntegrationVersionMapperListNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../nodes/ParameterList/ParameterNode.js';
import { IBuilder } from '../IBuilder.js';

export class IntegrationEventNodeBuilder implements IBuilder<IntegrationEventNode> {
  private integrationEventNode: IntegrationEventNode;
  private identifierNode: IntegrationEventIdentifierNode;
  private inputNode: ParameterNode;
  private versionMapperListNode: IntegrationVersionMapperListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.integrationEventNode = new IntegrationEventNode(metadata);
  }

  withIdentifier(identifier: IntegrationEventIdentifierNode): IntegrationEventNodeBuilder {
    this.identifierNode = identifier;
    return this;
  }

  withInput(input: ParameterNode): IntegrationEventNodeBuilder {
    this.inputNode = input;
    return this;
  }

  withVersionMappers(
    versionMappers: IntegrationVersionMapperListNode,
  ): IntegrationEventNodeBuilder {
    this.versionMapperListNode = versionMappers;
    return this;
  }

  public build(): IntegrationEventNode {
    this.intermediateASTTree.insertChild(this.integrationEventNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.inputNode);
    this.intermediateASTTree.insertSibling(this.versionMapperListNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.integrationEventNode.buildObjectValue();

    return this.integrationEventNode;
  }
}
