import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';

export class StatementListNode extends IntermediateASTNode {
  private static classNodeName = 'statements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStatements, metadata, StatementListNode.classNodeName);
  }

  get statements(): StatementNode[] {
    return this.getChildren() as StatementNode[];
  }
}
