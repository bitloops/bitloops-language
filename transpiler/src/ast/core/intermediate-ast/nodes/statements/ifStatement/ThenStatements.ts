import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ThenStatementsNode extends IntermediateASTNode {
  private static classNodeName = 'thenStatements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TThenStatements, metadata, ThenStatementsNode.classNodeName);
  }
}
