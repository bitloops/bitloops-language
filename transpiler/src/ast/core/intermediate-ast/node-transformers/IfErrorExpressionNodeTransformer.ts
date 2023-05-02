import { RandomUtils } from '../../../../utils/RandomUtils.js';
import { AnonymousFunctionNodeBuilderDirector } from '../directors/anonymousFunctionNodeBuilderDirector.js';
import { ConditionNodeBuilder } from '../builders/statements/ifStatement/ConditionBuilder.js';
import { ThenStatementsNodeBuilder } from '../builders/statements/ifStatement/ThenStatements.js';
import { ReturnErrorStatementNodeBuilder } from '../builders/statements/ReturnErrorStatementNodeBuilder.js';
import { ConstDeclarationNodeBuilderDirector } from '../directors/ConstDeclarationNodeBuilderDirector.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { ArrowFunctionBodyNode } from '../nodes/ArrowFunctionBodyNode.js';
import { IfErrorExpressionNode } from '../nodes/Expression/IfErrorExpressionNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
import { StatementNode } from '../nodes/statements/Statement.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { StatementNodeTypeGuards } from '../type-guards/statementTypeGuards.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { IfStatementNode } from '../nodes/statements/ifStatement/IfStatementNode.js';
import { IfStatementBuilder } from '../builders/statements/ifStatement/IfStatementBuilder.js';
import { AssignmentExpressionNode } from '../nodes/Expression/AssignmentExpression.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { ExpressionBuilderDirector } from '../directors/expressionNodeBuilderDirector.js';

export class IfErrorExpressionNodeTransformer extends NodeModelToTargetASTTransformer<IfErrorExpressionNode> {
  constructor(protected tree: IntermediateASTTree, protected node: IfErrorExpressionNode) {
    super(tree, node);
  }

  run(): void {
    const { expressionNode, variableName } = this.getResultExpressionName();
    this.modifyReturnToReturnError(expressionNode);
    this.addIfIsErrorStatement(expressionNode, variableName);
  }

  private modifyReturnToReturnError(resultExpressionNameNode: ExpressionNode): void {
    const statementListNode = this.node.getStatements();
    const returnStatementNode = this.node.getReturnStatement();

    if (statementListNode) {
      const returnStatementNodes = this.tree.getReturnStatementsOfNode(statementListNode);
      for (const returnStatementNode of returnStatementNodes) {
        const parentStatementListNode = returnStatementNode.getParentStatementList();
        this.replaceReturnToReturnErrorStatement(
          returnStatementNode,
          parentStatementListNode,
          resultExpressionNameNode,
        );
      }
    } else if (returnStatementNode) {
      this.replaceReturnToReturnErrorStatement(
        returnStatementNode,
        this.node.getArrowFunctionBody(),
        resultExpressionNameNode,
      );
    } else {
      const defaultIfErrorAnonymousFunctionNode =
        new AnonymousFunctionNodeBuilderDirector().buildIfErrorExpressionAnonymousFunction(
          resultExpressionNameNode,
        );
      this.node.addChild(defaultIfErrorAnonymousFunctionNode);
    }
  }

  private addIfIsErrorStatement(expression: ExpressionNode, variableName: string): void {
    const expressionNode = this.node.getParent();
    const parentNode = expressionNode.getParent();

    const ifIsErrorStatement = this.buildIfIsErrorStatement(expression);
    const expressionOfIfError = this.node.getExpression();

    if (parentNode.IsStatementListNode()) {
      const constDeclarationNode =
        new ConstDeclarationNodeBuilderDirector().buildConstDeclarationWithExpression({
          constIdentifierName: variableName,
          expressionNode: expressionOfIfError,
        });
      parentNode.replaceChild(expressionNode, constDeclarationNode);
      constDeclarationNode.addSiblingBetween(ifIsErrorStatement);
    } else {
      const parent = parentNode as StatementNode;
      parent.addSiblingBetween(ifIsErrorStatement);
      parent.replaceChild(expressionNode, expressionOfIfError);
    }
  }

  private getResultExpressionName(): { expressionNode: ExpressionNode; variableName?: string } {
    const expressionNode = this.node.getParent();
    const parentNode = expressionNode.getParent();

    if (parentNode.IsStatementListNode()) {
      const resultVariableName = this.getRandomResultVariableName();
      const expression = new ExpressionBuilderDirector().buildIdentifierExpression(
        resultVariableName,
      );
      return { expressionNode: expression, variableName: resultVariableName };
    } else {
      const parent = parentNode as StatementNode;
      if (
        StatementNodeTypeGuards.isVariableDeclarationStatement(parent) ||
        StatementNodeTypeGuards.isConstantDeclarationStatement(parent)
      ) {
        const variableName = parent.getIdentifier().getIdentifierName();
        const expression = new ExpressionBuilderDirector().buildIdentifierExpression(variableName);
        return { expressionNode: expression, variableName };
      } else if (StatementNodeTypeGuards.isExpressionStatement(parent)) {
        const leftExpression = (parent as AssignmentExpressionNode).getLeftExpression();
        const expression = leftExpression.getExpression();
        return { expressionNode: expression };
      } else {
        throw new Error('Parent node is not a statement node');
      }
    }
  }

  private getRandomResultVariableName(): string {
    return `result_${RandomUtils.getRandomIntWithNumberOfDigits(6)}`;
  }

  private buildIfIsErrorStatement(resultExpressionName: ExpressionNode): IfStatementNode {
    const statementList = this.node.getStatementListNode();

    const isInstanceOfExpression =
      new ExpressionBuilderDirector().buildInstanceOfErrorWithExpression(resultExpressionName);
    const condition = new ConditionNodeBuilder().withExpression(isInstanceOfExpression).build();
    const thenStatements = new ThenStatementsNodeBuilder(null)
      .withStatements(statementList)
      .build();

    const ifStatement = new IfStatementBuilder(null)
      .withCondition(condition)
      .withThenStatements(thenStatements)
      .build();
    return ifStatement;
  }

  private replaceReturnToReturnErrorStatement(
    returnStatementNode: ReturnStatementNode,
    parentNode: StatementListNode | ArrowFunctionBodyNode,
    newExpressionOfReturn: ExpressionNode,
  ): void {
    const expressionOfReturnStatement = this.getExpressionOfReturnStatement(
      returnStatementNode,
      newExpressionOfReturn,
    );
    const metadataOfReturnStatement = returnStatementNode.getMetadata();
    // const newExpression = new ExpressionBuilder()
    //   .withExpression(expressionOfReturnStatement)
    //   .build();
    const returnErrorStatementNode = new ReturnErrorStatementNodeBuilder(metadataOfReturnStatement)
      .withExpression(expressionOfReturnStatement)
      .build();
    parentNode.replaceChild(returnStatementNode, returnErrorStatementNode);
  }

  private getExpressionOfReturnStatement(
    returnStatementNode: ReturnStatementNode,
    newExpressionOfReturn: ExpressionNode,
  ): ExpressionNode | null {
    const expressionOfReturnStatement = returnStatementNode.getExpressionValues();
    if (expressionOfReturnStatement.isIdentifierExpression()) {
      const parameter = this.node.getParameter();
      const identifier = expressionOfReturnStatement.getIdentifierName();
      if (parameter && identifier === parameter.getIdentifier()) {
        return newExpressionOfReturn;
      }
    }
    return returnStatementNode.getExpression();
  }
}
