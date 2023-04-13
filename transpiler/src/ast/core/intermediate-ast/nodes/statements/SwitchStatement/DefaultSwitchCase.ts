import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';

export class DefaultSwitchCaseNode extends IntermediateASTNode {
  private static classNodeName = 'defaultCase';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDefaultCase, metadata, DefaultSwitchCaseNode.classNodeName);
  }

  getStatements(): StatementNode[] {
    return this.getChildrenNodesByType<StatementNode>(BitloopsTypesMapping.TStatement);
  }
}
