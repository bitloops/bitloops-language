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
import { DomainEvaluationNode } from '../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { ValueObjectConstructorEvaluationNode } from '../../../nodes/Expression/Evaluation/ValueObjectConstructorEvaluationNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ValueObjectConstructorEvaluationNodeBuilder
  implements IBuilder<ValueObjectConstructorEvaluationNode>
{
  private valueObjectConstructorEvaluationNode: ValueObjectConstructorEvaluationNode;
  private evaluation: DomainEvaluationNode;

  constructor(metadata?: TNodeMetadata) {
    this.valueObjectConstructorEvaluationNode = new ValueObjectConstructorEvaluationNode(metadata);
  }

  public withEvaluation(
    evaluation: DomainEvaluationNode,
  ): ValueObjectConstructorEvaluationNodeBuilder {
    this.evaluation = evaluation;
    return this;
  }

  public build(): ValueObjectConstructorEvaluationNode {
    this.valueObjectConstructorEvaluationNode.addChild(this.evaluation);

    this.valueObjectConstructorEvaluationNode.buildObjectValue();

    return this.valueObjectConstructorEvaluationNode;
  }
}
