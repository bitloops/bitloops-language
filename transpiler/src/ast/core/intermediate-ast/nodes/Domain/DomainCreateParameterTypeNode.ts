import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainCreateParameterTypeNode extends IntermediateASTNode {
  private static classNodeName = 'parameterType';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDomainCreateParameterType,
      metadata,
      DomainCreateParameterTypeNode.classNodeName,
    );
  }

  getType(): string {
    const value = this.getValue();
    return value[this.getClassNodeName()];
  }
}
