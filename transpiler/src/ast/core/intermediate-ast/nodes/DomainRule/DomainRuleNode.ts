import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

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
}
