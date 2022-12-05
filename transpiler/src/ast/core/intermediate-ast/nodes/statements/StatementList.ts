import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class StatementListNode extends IntermediateASTNode {
  private static classNodeName = 'statements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStatements, metadata, StatementListNode.classNodeName);
  }
}
