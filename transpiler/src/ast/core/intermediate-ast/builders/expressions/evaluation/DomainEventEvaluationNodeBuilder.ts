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
import { DomainEventIdentifierNode } from '../../../nodes/DomainEvent/DomainEventIdentifierNode.js';
import { DomainEventEvaluationNode } from '../../../nodes/Expression/Evaluation/DomainEventEvaluationNode.js';
import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class DomainEventEvaluationNodeBuilder implements IBuilder<DomainEventEvaluationNode> {
  private domainEventEvaluationNode: DomainEventEvaluationNode;
  private identifierNode: DomainEventIdentifierNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainEventEvaluationNode = new DomainEventEvaluationNode(metadata);
  }

  public withIdentifier(name: DomainEventIdentifierNode): DomainEventEvaluationNodeBuilder {
    this.identifierNode = name;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): DomainEventEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): DomainEventEvaluationNode {
    this.domainEventEvaluationNode.addChild(this.identifierNode);
    if (this.evaluationFieldListNode) {
      this.domainEventEvaluationNode.addChild(this.evaluationFieldListNode);
    }

    this.domainEventEvaluationNode.buildObjectValue();

    return this.domainEventEvaluationNode;
  }
}
