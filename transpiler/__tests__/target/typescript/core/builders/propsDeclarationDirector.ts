import { PropsIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Props/PropsIdentifierNodeBuilder.js';
import { PropsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Props/PropsNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/FieldList/FieldListNode.js';
import { PropsNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class PropsDeclarationBuilderDirector {
  private builder: PropsNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new PropsNodeBuilder(tree);
  }

  buildProps(propsName: string, fieldList: FieldListNode): PropsNode {
    const id = new PropsIdentifierNodeBuilder().withName(propsName).build();
    return this.builder.withIdentifier(id).withVariables(fieldList).build();
  }
}
