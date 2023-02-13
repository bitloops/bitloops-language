import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class QueryDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.Query;
  private static classNodeName = 'Query';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: QueryDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TQuery,
      metadata,
      classNodeName: QueryDeclarationNode.classNodeName,
    });
  }
}
