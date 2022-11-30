import { StructEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/StructEvaluationBuilder.js';
import { NameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/NameBuilder.js';
import { EvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationNode.js';
import { EvaluationFieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { EvaluationBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationBuilder.js';

export class EvaluationBuilderDirector {
  buildStructEvaluation(identifier: string, evalFields: EvaluationFieldNode[]): EvaluationNode {
    const nameNode = new NameNodeBuilder().withName(identifier).build();
    const evalFieldList = new EvaluationFieldListNodeBuilder()
      .withEvaluationFields(evalFields)
      .build();

    const structEvaluationNode = new StructEvaluationNodeBuilder()
      .withName(nameNode)
      .withEvaluationFieldList(evalFieldList)
      .build();

    return new EvaluationBuilder().withEvaluation(structEvaluationNode).build();
  }
}
