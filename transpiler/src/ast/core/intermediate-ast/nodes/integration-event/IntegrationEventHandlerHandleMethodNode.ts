import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';

export class IntegrationEventHandlerHandleMethodNode extends IntermediateASTNode {
  private static NAME = 'integrationEventHandlerHandleMethod';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationEventHandlerHandleMethod,
      metadata,
      IntegrationEventHandlerHandleMethodNode.NAME,
    );
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }

  getParameters(): ParameterNode[] {
    const parameterNode = this.getChildrenNodesByType<ParameterNode>(
      BitloopsTypesMapping.TParameter,
    );
    return parameterNode;
  }
}
