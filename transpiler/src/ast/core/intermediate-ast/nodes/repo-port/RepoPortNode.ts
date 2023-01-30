import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { RepoPortIdentifierNode } from './RepoPortIdentifierNode.js';

export class RepoPortNode extends ClassTypeNode {
  private static classType = ClassTypes.RepoPort;
  private static classNodeName = 'RepoPort';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RepoPortNode.classType,
      nodeType: BitloopsTypesMapping.TRepoPort,
      metadata,
      classNodeName: RepoPortNode.classNodeName,
    });
  }

  public getIdentifier(): IdentifierNode {
    return this.getChildNodeByType<RepoPortIdentifierNode>(BitloopsTypesMapping.TRepoPort);
  }
}
