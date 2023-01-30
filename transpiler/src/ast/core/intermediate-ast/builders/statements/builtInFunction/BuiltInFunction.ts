import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { BuiltInFunctionNode } from '../../../nodes/statements/builtinFunction/BuiltinFunctionNode.js';
import { IBuilder } from '../../IBuilder.js';

export class BuiltInFunctionNodeBuilder implements IBuilder<BuiltInFunctionNode> {
  private builtinFunctionNode: BuiltInFunctionNode;
  private concreteBuiltInFunction: BuiltInFunctionNode;

  constructor(metadata: TNodeMetadata) {
    this.builtinFunctionNode = new BuiltInFunctionNode(metadata);
  }

  withBuiltInFunction(builtInFunction: BuiltInFunctionNode): BuiltInFunctionNodeBuilder {
    this.concreteBuiltInFunction = builtInFunction;
    return this;
  }

  public build(): BuiltInFunctionNode {
    this.builtinFunctionNode.addChild(this.concreteBuiltInFunction);
    this.builtinFunctionNode.buildObjectValue();

    return this.builtinFunctionNode;
  }
}
