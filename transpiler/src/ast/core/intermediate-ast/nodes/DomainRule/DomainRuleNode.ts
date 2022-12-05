import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainRuleNode extends ClassTypeNode {
  private static classType = ClassTypes.Rules;
  private static classNodeName = 'Rule';

  constructor(metadata: TNodeMetadata) {
    super({
      classType: DomainRuleNode.classType,
      nodeType: BitloopsTypesMapping.TRules,
      metadata,
      classNodeName: DomainRuleNode.classNodeName,
    });
  }
}
