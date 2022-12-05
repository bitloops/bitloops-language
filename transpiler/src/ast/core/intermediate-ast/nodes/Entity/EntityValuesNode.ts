import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class EntityValuesNode extends IntermediateASTNode {
  private static classNodeName = 'entityValues';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEntityValues, metadata, EntityValuesNode.classNodeName);
  }
}
