import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementListNode } from '../statements/StatementList.js';
import { ReturnOkTypeNode } from './ReturnOkTypeNode.js';

export class ReturnOkErrorTypeNode extends IntermediateASTNode {
  private static classNodeName = 'returnType';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TOkErrorReturnType, metadata, ReturnOkErrorTypeNode.classNodeName);
  }

  getStatementListOfParent(): StatementListNode | null {
    let parent = this.getParent();
    let statementList = parent.getStatementListNode();
    while (!statementList && !parent.isRoot()) {
      statementList = parent.getStatementListNode();
      parent = parent.getParent();
    }
    return statementList;
  }

  getReturnOkType(): ReturnOkTypeNode {
    return this.getChildNodeByType<ReturnOkTypeNode>(BitloopsTypesMapping.TReturnOkType);
  }

  isReturnTypeVoid(): boolean {
    const returnOk = this.getReturnOkType();
    const returnOkType = returnOk
      .getBitloopsPrimaryType()
      .getChildren()[0] as BitloopsPrimaryTypeNode;
    if (returnOkType.isPrimitiveType()) {
      const typeValue = returnOkType.getTypeValue();
      if (typeValue === 'void') {
        return true;
      }
    }
    return false;
  }
}
