/**
 *  Bitloops Language CLI
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
import { StandardVOEvaluationNode } from '../../../nodes/Expression/Evaluation/StandardVOEvaluationNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class StandardVOEvaluationNodeBuilder implements IBuilder<StandardVOEvaluationNode> {
  private standardVOEvaluationNode: StandardVOEvaluationNode;
  private identifier: IdentifierNode;
  private evaluationFieldListNode: EvaluationFieldListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.standardVOEvaluationNode = new StandardVOEvaluationNode(nodeMetadata);
  }

  public withIdentifier(identifier: IdentifierNode): StandardVOEvaluationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): StandardVOEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): StandardVOEvaluationNode {
    this.standardVOEvaluationNode.addChild(this.identifier);
    this.standardVOEvaluationNode.addChild(this.evaluationFieldListNode);

    this.standardVOEvaluationNode.buildObjectValue();

    return this.standardVOEvaluationNode;
  }
}
