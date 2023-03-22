import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { DomainRuleIdentifierNode } from './DomainRuleIdentifierNode.js';

export class DomainRuleNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainRule;
  private static classNodeName = 'DomainRule';

  constructor(metadata: TNodeMetadata) {
    super({
      classType: DomainRuleNode.classType,
      nodeType: BitloopsTypesMapping.TDomainRule,
      metadata,
      classNodeName: DomainRuleNode.classNodeName,
    });
  }
  public getIdentifier(): DomainRuleIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TDomainRuleIdentifier,
    ) as DomainRuleIdentifierNode;
    return identifier;
  }
}
