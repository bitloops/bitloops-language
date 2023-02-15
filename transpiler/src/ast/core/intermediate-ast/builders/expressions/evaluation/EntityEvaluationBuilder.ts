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
import { DomainEvaluationNode } from '../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { EntityEvaluationNode } from '../../../nodes/Expression/Evaluation/EntityEvaluation.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class EntityEvaluationNodeBuilder implements IBuilder<EntityEvaluationNode> {
  private entityEvaluationNode: EntityEvaluationNode;
  private domainEvaluation: DomainEvaluationNode;

  constructor(metadata?: TNodeMetadata) {
    this.entityEvaluationNode = new EntityEvaluationNode(metadata);
  }

  public withDomainEvaluation(domainEvaluation: DomainEvaluationNode): EntityEvaluationNodeBuilder {
    this.domainEvaluation = domainEvaluation;
    return this;
  }

  public build(): EntityEvaluationNode {
    this.entityEvaluationNode.addChild(this.domainEvaluation);

    this.entityEvaluationNode.buildObjectValue();

    return this.entityEvaluationNode;
  }
}
