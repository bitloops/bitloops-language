import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { EntityIdentifierNode } from '../../../Entity/EntityIdentifierNode.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { ValueObjectIdentifierNode } from '../../../valueObject/ValueObjectIdentifierNode.js';
import { EvaluationNode } from '../EvaluationNode.js';
import { DomainEvaluationPropsNode } from './DomainEvaluationProps.js';

export class DomainEvaluationNode extends EvaluationNode {
  private static domainEvaluationNodeName = 'domainEvaluation';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDomainEvaluation;
    this.classNodeName = DomainEvaluationNode.domainEvaluationNodeName;
  }

  getEntityIdentifier(): string {
    const entityIdentifier = this.getChildNodeByType<EntityIdentifierNode>(
      BitloopsTypesMapping.TEntityIdentifier,
    );
    if (!entityIdentifier) {
      throw new Error('Entity identifier not found');
    }
    return entityIdentifier.getIdentifierName();
  }

  getValueObjectIdentifierNode(): ValueObjectIdentifierNode {
    const valueObjectIdentifierNode = this.getChildNodeByType<ValueObjectIdentifierNode>(
      BitloopsTypesMapping.TValueObjectIdentifier,
    );
    if (!valueObjectIdentifierNode) {
      throw new Error('Value object identifier not found');
    }
    return valueObjectIdentifierNode;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    for (const child of this.getChildren()) {
      if (child instanceof DomainEvaluationPropsNode) {
        return child.addToSymbolTable(symbolTableManager);
      }
    }
  }
}
