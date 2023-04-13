import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';
import { ConditionNode } from './ConditionNode.js';
import { ElseStatementsNode } from './ElseStatements.js';
import { ThenStatementsNode } from './ThenStatements.js';

export class IfStatementNode extends StatementNode {
  private static classNodeName = 'ifStatement';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TIfStatement, metadata, IfStatementNode.classNodeName);
  }

  getThenStatements(): StatementNode[] {
    const thenNode = this.getThenNode();
    if (!thenNode) throw new Error('No then node found');
    return thenNode.getStatements();
  }

  hasElseBlock(): boolean {
    return !!this.getElseNode();
  }

  getElseStatements(): StatementNode[] {
    const elseNode = this.getElseNode();
    return elseNode.getStatements();
  }

  public getConditionNode(): ConditionNode {
    return this.getChildNodeByType<ConditionNode>(BitloopsTypesMapping.TCondition);
  }

  private getThenNode(): ThenStatementsNode {
    return this.getChildNodeByType<ThenStatementsNode>(BitloopsTypesMapping.TThenStatements);
  }
  private getElseNode(): ThenStatementsNode {
    return this.getChildNodeByType<ElseStatementsNode>(BitloopsTypesMapping.TElseStatements);
  }
}
