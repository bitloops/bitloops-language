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
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { EntityIdentifierNode } from '../../Entity/EntityIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { DomainEvaluationNode } from './DomainEvaluation/DomainEvaluation.js';
import { EvaluationNode } from './EvaluationNode.js';

export class EntityConstructorEvaluationNode extends EvaluationNode {
  private static nodeName = 'entityConstructor';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TEntityConstructorEvaluation;
    this.classNodeName = EntityConstructorEvaluationNode.nodeName;
  }
  public override getIdentifierNode(): EntityIdentifierNode {
    const domainEvaluationNode = this.getChildNodeByType<DomainEvaluationNode>(
      BitloopsTypesMapping.TDomainEvaluation,
    );
    const identifier = domainEvaluationNode.getChildren().find((child) => {
      return child.getNodeType() === BitloopsTypesMapping.TEntityIdentifier;
    }) as EntityIdentifierNode;
    return identifier;
  }

  public getInferredType(): string {
    const entityEvaluationIdentifier = this.getIdentifierNode().getValue().entityIdentifier;
    return entityEvaluationIdentifier;
  }
}
