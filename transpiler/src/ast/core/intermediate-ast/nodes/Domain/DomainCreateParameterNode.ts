import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { PropsIdentifierNode } from '../Props/PropsIdentifierNode.js';

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

  // public getIdentifierNode(): IdentifierNode {
  //   const identifierNode: IdentifierNode = this.getChildNodeByType(
  //     BitloopsTypesMapping.TIdentifier,
  //   );
  //   return identifierNode;
  // }

  public getTypeNode(): PropsIdentifierNode {
    const identifierNode: PropsIdentifierNode = this.getChildNodeByType(
      BitloopsTypesMapping.TPropsIdentifier,
    );
    return identifierNode;
  }
}
