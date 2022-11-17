import { DTONodeBuilder } from '../../src/refactoring-arch/intermediate-ast/builders/DTONodeBuilder.js';
import { FieldListNodeBuilder } from '../../src/refactoring-arch/intermediate-ast/builders/FieldListNodeBuilder.js';
import { FieldNodeBuilder } from '../../src/refactoring-arch/intermediate-ast/builders/FieldNodeBuilder.js';
import { IntermediateASTTree } from '../../src/refactoring-arch/intermediate-ast/IntermediateASTTree.js';
import { DTONode } from '../../src/refactoring-arch/intermediate-ast/nodes/DTONode.js';
import { FieldListNode } from '../../src/refactoring-arch/intermediate-ast/nodes/FieldListNode.js';
import { FieldNode } from '../../src/refactoring-arch/intermediate-ast/nodes/FieldNode.js';
import { IntermediateASTRootNode } from '../../src/refactoring-arch/intermediate-ast/nodes/RootNode.js';
import { TVariables } from '../../src/types.js';

const buildFieldListNode = (tree: IntermediateASTTree, fields: TVariables): FieldListNode => {
  const fieldNodes: FieldNode[] = [];
  fields.forEach((field) => {
    const { type, name, optional } = field;
    const fieldNode = new FieldNodeBuilder(tree)
      .withType(type)
      .withName(name)
      .withOptional(optional)
      .build();
    fieldNodes.push(fieldNode);
  });
  const fieldListNode = new FieldListNodeBuilder(tree).withFields(fieldNodes).build();
  return fieldListNode;
};

const buildDTONode = (identifierName: string, fields: TVariables): DTONode => {
  const tree = new IntermediateASTTree(new IntermediateASTRootNode());
  const fieldListNode = buildFieldListNode(tree, fields);
  const dtoNode = new DTONodeBuilder(tree)
    .withIdentifier(identifierName)
    .withVariables(fieldListNode)
    .build();
  return dtoNode;
};

export { buildDTONode };
