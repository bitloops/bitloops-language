import { StructNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Struct/StructNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/FieldList/FieldListNode.js';
import { IdentifierNode } from '../../../../../src/ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StructNode } from '../../../../../src/ast/core/intermediate-ast/nodes/struct/StructNode.js';

export class StructBuilderDirector {
  buildStructWithRequiredFields({
    name,
    fields,
  }: {
    name: IdentifierNode;
    fields: FieldListNode;
  }): StructNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new StructNodeBuilder(tree).withIdentifier(name).withVariables(fields).build();
  }
  buildStructWithoutFields(name: IdentifierNode): StructNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new StructNodeBuilder(tree).withIdentifier(name).build();
  }
}
