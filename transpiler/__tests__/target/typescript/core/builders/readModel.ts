import { FieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { ReadModelIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/readModel/ReadModelIdentifierNodeBuilder.js';
import { ReadModelNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/readModel/ReadModelNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { ReadModelNode } from '../../../../../src/ast/core/intermediate-ast/nodes/readModel/ReadModelNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class ReadModelBuilderDirector {
  buildReadModel({
    identifier,
    fields,
  }: {
    identifier: string;
    fields: FieldNode[];
  }): ReadModelNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const readModelIdentifier = new ReadModelIdentifierNodeBuilder().withName(identifier).build();
    const fieldListNode = new FieldListNodeBuilder().withFields(fields).build();
    return new ReadModelNodeBuilder(tree)
      .withIdentifier(readModelIdentifier)
      .withFields(fieldListNode)
      .build();
  }
}
