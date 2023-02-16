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
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { ExecuteNode } from '../../nodes/ExecuteNode.js';
import { IBuilder } from '../IBuilder.js';
import { QueryHandlerNode } from '../../nodes/query/QueryHandlerNode.js';

export class QueryHandlerNodeBuilder implements IBuilder<QueryHandlerNode> {
  private queryHandlerNode: QueryHandlerNode;
  private identifierNode: IdentifierNode;
  private intermediateASTTree: IntermediateASTTree;
  private executeNode: ExecuteNode;
  private parameterListNode: ParameterListNode;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.queryHandlerNode = new QueryHandlerNode(metadata);
  }

  public withIdentifier(queryIdentifierNode: IdentifierNode): QueryHandlerNodeBuilder {
    this.identifierNode = queryIdentifierNode;
    const queryName = queryIdentifierNode.getIdentifierName();
    this.queryHandlerNode.setClassName(queryName);
    return this;
  }

  public withParameterList(parameterListNode: ParameterListNode): QueryHandlerNodeBuilder {
    this.parameterListNode = parameterListNode;
    return this;
  }

  public withExecute(executeNode: ExecuteNode): QueryHandlerNodeBuilder {
    this.executeNode = executeNode;
    return this;
  }

  public build(): QueryHandlerNode {
    this.intermediateASTTree.insertChild(this.queryHandlerNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.executeNode);
    this.intermediateASTTree.insertSibling(this.parameterListNode);

    this.intermediateASTTree.setCurrentNodeToRoot();

    this.queryHandlerNode.buildObjectValue();

    return this.queryHandlerNode;
  }
}
