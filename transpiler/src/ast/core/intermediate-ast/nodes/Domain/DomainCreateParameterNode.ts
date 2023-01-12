import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { DomainCreateParameterTypeNode } from './DomainCreateParameterTypeNode.js';

export class DomainCreateParameterNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'domainCreateParameter';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDomainConstructorParameter,
      DomainCreateParameterNode.classNodeName,
      metadata,
    );
  }

  public static getClassNodeName() {
    return DomainCreateParameterNode.classNodeName;
  }

  public getTypeNode(): DomainCreateParameterTypeNode {
    const createParameterNode: DomainCreateParameterTypeNode = this.getChildNodeByType(
      BitloopsTypesMapping.TDomainCreateParameterType,
    );
    return createParameterNode;
  }
}
