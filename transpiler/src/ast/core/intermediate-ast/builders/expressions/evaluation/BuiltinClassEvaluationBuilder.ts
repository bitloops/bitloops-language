import { ClassNameNode } from '../../../nodes/ClassNameNode.js';
import { ArgumentListNode } from '../../../nodes/ArgumentList/ArgumentListNode.js';
import { BuiltInClassEvaluationNode } from '../../../nodes/Expression/Evaluation/BuiltInClassNode.js';
import { IBuilder } from '../../IBuilder.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';

export class BuiltinClassEvaluationNodeBuilder implements IBuilder<BuiltInClassEvaluationNode> {
  private builtinClassEvaluationNode: BuiltInClassEvaluationNode;

  // className: string;
  // argumentDependencies: TArgumentList;
  private className: ClassNameNode;
  private argumentList: ArgumentListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.builtinClassEvaluationNode = new BuiltInClassEvaluationNode(nodeMetadata);
  }

  public withArguments(argsList: ArgumentListNode): BuiltinClassEvaluationNodeBuilder {
    this.argumentList = argsList;
    return this;
  }

  public withClassName(className: ClassNameNode): BuiltinClassEvaluationNodeBuilder {
    this.className = className;
    return this;
  }

  public build(): BuiltInClassEvaluationNode {
    this.builtinClassEvaluationNode.addChild(this.className);
    this.builtinClassEvaluationNode.addChild(this.argumentList);

    this.builtinClassEvaluationNode.buildObjectValue();

    return this.builtinClassEvaluationNode;
  }
}
