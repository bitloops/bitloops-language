import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { DomainCreateParameterNode } from './DomainCreateParameterNode.js';

export class DomainCreateNode extends IntermediateASTNode {
  private static classNodeName = 'create';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainCreateMethod, metadata, DomainCreateNode.classNodeName);
  }

  getParameterNode(): DomainCreateParameterNode {
    return this.getChildNodeByType<DomainCreateParameterNode>(
      BitloopsTypesMapping.TDomainCreateMethod,
    );
  }
}
