import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class PackageNode extends ClassTypeNode {
  private static classType = ClassTypes.Package;
  private static nodeType = BitloopsTypesMapping.TPackage;
  private static classNodeName = 'Package';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: PackageNode.classType,
      nodeType: PackageNode.nodeType,
      metadata,
      classNodeName: PackageNode.classNodeName,
    });
  }
}
