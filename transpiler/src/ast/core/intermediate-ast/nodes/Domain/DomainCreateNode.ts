import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';

export class DomainCreateNode extends IntermediateASTNode {
  private static classNodeName = 'create';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainCreateMethod, metadata, DomainCreateNode.classNodeName);
  }

  getParameterNode(): ParameterNode {
    return this.getChildNodeByType<ParameterNode>(BitloopsTypesMapping.TParameter);
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }
}
