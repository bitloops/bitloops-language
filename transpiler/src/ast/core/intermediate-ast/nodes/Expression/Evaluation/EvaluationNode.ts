import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ErrorEvaluationNode } from './ErrorEvaluation.js';
import { TInferredTypes } from '../../../../../../semantic-analysis/type-inference/types.js';
import { IdentifierNode } from '../../identifier/IdentifierNode.js';
import { EvaluationFieldNode } from './EvaluationFieldList/EvaluationFieldNode.js';
import { EvaluationFieldListNode } from './EvaluationFieldList/EvaluationFieldListNode.js';
import { ArgumentNode } from '../../ArgumentList/ArgumentNode.js';
import { ArgumentListNode } from '../../ArgumentList/ArgumentListNode.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';

export class EvaluationNode extends ExpressionNode {
  private static evaluationNodeName = 'evaluation';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = EvaluationNode.evaluationNodeName;
    this.nodeType = BitloopsTypesMapping.TEvaluation;
  }

  isErrorEvaluation(): this is ErrorEvaluationNode {
    return this.getNodeType() === BitloopsTypesMapping.TErrorEvaluation;
  }
  isDomainServiceEvaluation(): boolean {
    return this.getNodeType() === BitloopsTypesMapping.TDomainServiceEvaluation;
  }
  isPackageEvaluation(): boolean {
    return this.getNodeType() === BitloopsTypesMapping.TPackageEvaluation;
  }

  isEntityEvaluation(): boolean {
    return this.getNodeType() === BitloopsTypesMapping.TEntityEvaluation;
  }
  getEvaluationChild(): EvaluationNode {
    return this.getChildren()[0] as EvaluationNode;
  }

  getIdentifierNode(): IdentifierNode {
    return this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier);
  }

  getEvaluationFields(): EvaluationFieldNode[] {
    const evaluationFieldList = this.getEvaluationFieldList();
    if (!evaluationFieldList) return [];

    return evaluationFieldList.getFields();
  }

  getEvaluationFieldList(): EvaluationFieldListNode {
    const evaluationChild = this.getFirstChild() as EvaluationNode;
    const evaluationFieldList = evaluationChild.getChildNodeByType<EvaluationFieldListNode>(
      BitloopsTypesMapping.TEvaluationFields,
    );

    return evaluationFieldList;
  }

  getArguments(): ArgumentNode[] {
    const evaluationChild = this.getFirstChild() as EvaluationNode;
    const argumentList = evaluationChild.getChildNodeByType<ArgumentListNode>(
      BitloopsTypesMapping.TArgumentList,
    );
    if (!argumentList) return [];
    return argumentList.arguments;
  }

  getArgumentList(): ArgumentListNode {
    const evaluationChild = this.getFirstChild() as EvaluationNode;
    const argumentList = evaluationChild.getChildNodeByType<ArgumentListNode>(
      BitloopsTypesMapping.TArgumentList,
    );
    return argumentList;
  }

  public getInferredType(symbolTableManager: SymbolTableManager): TInferredTypes {
    for (const child of this.getChildren()) {
      if (child instanceof EvaluationNode) {
        return child.getInferredType(symbolTableManager);
      }
    }
    throw new Error('No evaluation found to infer type');
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const evaluationFieldList = this.getEvaluationFieldList();
    if (evaluationFieldList) {
      evaluationFieldList.addToSymbolTable(symbolTableManager);
    }
    const argumentList = this.getArgumentList();
    if (argumentList) {
      argumentList.addToSymbolTable(symbolTableManager);
    }
    for (const child of this.getChildren()) {
      if (child instanceof EvaluationNode) {
        child.typeCheck(symbolTableManager);
        return child.addToSymbolTable(symbolTableManager);
      }
    }
  }
}
