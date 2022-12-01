import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class StatementsNode extends IntermediateASTNode {
  private static classNodeName = 'statements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStatements, metadata, StatementsNode.classNodeName);
  }
}
