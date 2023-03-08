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
import { EntityConstructorEvaluationNode } from '../../../nodes/Expression/Evaluation/EntityConstructorEvaluationNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class EntityConstructorEvaluationNodeBuilder
  implements IBuilder<EntityConstructorEvaluationNode>
{
  private entityConstructorEvaluationNode: EntityConstructorEvaluationNode;
  private domainEvaluation: DomainEvaluationNode;

  constructor(metadata?: TNodeMetadata) {
    this.entityConstructorEvaluationNode = new EntityConstructorEvaluationNode(metadata);
  }

  public withDomainEvaluation(
    domainEvaluation: DomainEvaluationNode,
  ): EntityConstructorEvaluationNodeBuilder {
    this.domainEvaluation = domainEvaluation;
    return this;
  }

  public build(): EntityConstructorEvaluationNode {
    this.entityConstructorEvaluationNode.addChild(this.domainEvaluation);

    this.entityConstructorEvaluationNode.buildObjectValue();

    return this.entityConstructorEvaluationNode;
  }
}
