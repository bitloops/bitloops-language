import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';

export class IntegrationVersionMapperNode extends IntermediateASTNode {
  private static classNodeName = 'integrationVersionMapper';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationVersionMapper,
      metadata,
      IntegrationVersionMapperNode.classNodeName,
    );
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }
}
