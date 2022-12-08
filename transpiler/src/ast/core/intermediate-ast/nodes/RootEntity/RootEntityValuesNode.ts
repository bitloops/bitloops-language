import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { RootEntityValuesKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RootEntityValuesNode extends IntermediateASTNode {
  private static classNodeName = RootEntityValuesKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEntityValues, metadata, RootEntityValuesNode.classNodeName);
  }
}
