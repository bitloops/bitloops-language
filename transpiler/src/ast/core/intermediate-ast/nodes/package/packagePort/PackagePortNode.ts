import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { PackagePortIdentifierNode } from './PackagePortIdentifierNode.js';
import { ClassTypeNode } from '../../ClassTypeNode.js';

export class PackagePortNode extends ClassTypeNode {
  private static classNodeName = 'PackagePort';
  private static classType = ClassTypes.PackagePort;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: PackagePortNode.classType,
      nodeType: BitloopsTypesMapping.TPackagePort,
      metadata,
      classNodeName: PackagePortNode.classNodeName,
    });
  }

  get identifier(): string {
    const identifierNode = this.identifierNode;
    if (!identifierNode) {
      throw new Error('PackagePortNode has no identifier node');
    }
    return identifierNode.name;
  }

  get identifierNode(): PackagePortIdentifierNode | undefined {
    return this.getChildren().find(
      (child) => child instanceof IntermediateASTIdentifierNode,
    ) as PackagePortIdentifierNode;
  }
}
