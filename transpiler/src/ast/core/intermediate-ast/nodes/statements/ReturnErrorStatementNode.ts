import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { returnErrorKey } from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';

export class ReturnErrorStatementNode extends StatementNode {
  private static classNodeName = returnErrorKey;

  constructor(metadata: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TReturnErrorStatement,
      metadata,
      ReturnErrorStatementNode.classNodeName,
    );
  }
}
