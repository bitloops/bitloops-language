import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ElseStatementsNode extends IntermediateASTNode {
  private static classNodeName = 'elseStatements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TElseStatements, metadata, ElseStatementsNode.classNodeName);
  }
}
