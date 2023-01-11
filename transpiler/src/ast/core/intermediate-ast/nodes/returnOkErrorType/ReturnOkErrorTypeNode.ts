import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementListNode } from '../statements/StatementList.js';

export class ReturnOkErrorTypeNode extends IntermediateASTNode {
  private static classNodeName = 'returnType';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TOkErrorReturnType, metadata, ReturnOkErrorTypeNode.classNodeName);
  }

  getStatementList(): StatementListNode | null {
    let parent = this.getParent();
    let statementList = parent.getStatementListNode();
    while (!statementList && !parent.isRoot()) {
      statementList = parent.getStatementListNode();
      parent = parent.getParent();
    }
    return statementList;
  }

  //TODO ok/primary/primitive
  isReturnTypeVoid(): boolean {
    if (this.getValue() === 'void') {
      return true;
    }
    return false;
  }
}
