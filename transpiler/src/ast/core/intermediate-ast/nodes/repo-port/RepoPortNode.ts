import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class RepoPortNode extends ClassTypeNode {
  private static classType = ClassTypes.RepoPort;
  private static classNodeName = 'RepoPort';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RepoPortNode.classType,
      nodeType: BitloopsTypesMapping.TProps,
      metadata,
      classNodeName: RepoPortNode.classNodeName,
    });
  }
}
