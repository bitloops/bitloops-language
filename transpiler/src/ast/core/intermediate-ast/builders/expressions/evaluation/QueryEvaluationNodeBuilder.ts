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
import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { QueryEvaluationNode } from '../../../nodes/Expression/Evaluation/QueryEvaluationNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class QueryEvaluationNodeBuilder implements IBuilder<QueryEvaluationNode> {
  private queryEvaluationNode: QueryEvaluationNode;
  private identifierNode: IdentifierNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor(metadata?: TNodeMetadata) {
    this.queryEvaluationNode = new QueryEvaluationNode(metadata);
  }

  public withIdentifier(name: IdentifierNode): QueryEvaluationNodeBuilder {
    this.identifierNode = name;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): QueryEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): QueryEvaluationNode {
    this.queryEvaluationNode.addChild(this.identifierNode);
    if (this.evaluationFieldListNode) {
      this.queryEvaluationNode.addChild(this.evaluationFieldListNode);
    }

    this.queryEvaluationNode.buildObjectValue();

    return this.queryEvaluationNode;
  }
}
