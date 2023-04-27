import { RandomUtils } from '../../../../utils/RandomUtils.js';
import { AnonymousFunctionNodeBuilderDirector } from '../directors/anonymousFunctionNodeBuilderDirector.js';
import { ClassNodeBuilder } from '../builders/ClassBuilder.js';
import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../builders/expressions/IdentifierExpressionBuilder.js';
import { IsInstanceOfExpressionNodeBuilder } from '../builders/expressions/IsIntanceOfExpressionBuilder.js';
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
import { StatementListNodeBuilder } from '../builders/statements/StatementListNodeBuilder.js';
import { IfStatementNode } from '../nodes/statements/ifStatement/IfStatementNode.js';
import { IfStatementBuilder } from '../builders/statements/ifStatement/IfStatementBuilder.js';
import { AssignmentExpressionNode } from '../nodes/Expression/AssignmentExpression.js';
import { LeftExpressionNode } from '../nodes/Expression/leftExpressionNode.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../directors/BitloopsPrimaryTypeNodeBuilderDirector.js';

export class IfErrorExpressionNodeTransformer extends NodeModelToTargetASTTransformer<IfErrorExpressionNode> {
  constructor(protected tree: IntermediateASTTree, protected node: IfErrorExpressionNode) {
    super(tree, node);
  }

  run(): void {
    this.modifyReturnToReturnError();
    this.addIfIsErrorStatement();
  }

  private modifyReturnToReturnError(): void {
    const statementListNode = this.node.getStatements();
    const returnStatementNode = this.node.getReturnStatement();
    if (statementListNode) {
      const returnStatementNodes = this.tree.getReturnStatementsOfNode(statementListNode);
      for (const returnStatementNode of returnStatementNodes) {
        const parentStatementListNode = returnStatementNode.getParentStatementList();
        this.replaceReturnToReturnError(returnStatementNode, parentStatementListNode);
      }
    } else if (returnStatementNode) {
      this.replaceReturnToReturnError(returnStatementNode, this.node.getArrowFunctionBody());
    } else {
      const defaultIfErrorAnonymousFunctionNode =
        new AnonymousFunctionNodeBuilderDirector().buildIfErrorDefaultAnonymousFunction();
      this.node.addChild(defaultIfErrorAnonymousFunctionNode);
    }
  }

  private addIfIsErrorStatement(): void {
    const parentNode = this.node.getParent();

    if (parentNode.IsStatementListNode()) {
      const resultVariableName = this.getRandomResultVariableName();

      const constDeclarationNode =
        new ConstDeclarationNodeBuilderDirector().buildConstDeclarationIfErrorExpression({
          constIdentifierName: resultVariableName,
          ifErrorExpressionNode: this.node,
        });
      const ifIsErrorStatement = this.buildIfIsErrorStatement(resultVariableName, null);
      constDeclarationNode.addSiblingBetween(ifIsErrorStatement);
      parentNode.replaceChild(this.node, constDeclarationNode);
    } else {
      const parent = parentNode as StatementNode;
      if (StatementNodeTypeGuards.isVariableDeclarationStatement(parent)) {
        const variableName = parent.getIdentifier().getIdentifierName();
        const ifIsErrorStatement = this.buildIfIsErrorStatement(variableName, null);
        parent.addSiblingBetween(ifIsErrorStatement);
      } else if (StatementNodeTypeGuards.isConstantDeclarationStatement(parent)) {
        const variableName = parent.getIdentifier().getIdentifierName();
        const ifIsErrorStatement = this.buildIfIsErrorStatement(variableName, null);
        parent.addSiblingBetween(ifIsErrorStatement);
      } else if (StatementNodeTypeGuards.isExpressionStatement(parent)) {
        const leftExpression = (parent as AssignmentExpressionNode).getLeftExpression();
        const ifIsErrorStatement = this.buildIfIsErrorStatement(null, leftExpression);
        parent.addSiblingBetween(ifIsErrorStatement);
      }
    }
  }

  private buildIfIsErrorStatement(
    identifier: string | null,
    leftExpression: LeftExpressionNode | null,
  ): IfStatementNode {
    const statementList = this.getStatementList();
    let expression: ExpressionNode;
    if (leftExpression) {
      expression = leftExpression;
    } else {
      expression = new IdentifierExpressionBuilder().withValue(identifier).build();
    }

    const isInstanceOfExpression = new IsInstanceOfExpressionNodeBuilder()
      .withExpression(expression)
      .withClass(
        new ClassNodeBuilder()
          .withClass(
            new BitloopsPrimaryTypeNodeBuilderDirector().buildIdentifierPrimaryType('Error'),
          )
          .build(),
      ) //director
      .build();
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

  private getRandomResultVariableName(): string {
    return `result_${RandomUtils.getRandomIntWithNumberOfDigits(6)}`;
  }

  private getStatementList(): StatementListNode {
    const nodeStatementList = this.node.getStatements();
    const returnStatementNode = this.node.getReturnStatement();
    const anonymousFunctionNode = this.node.getAnonymousFunction();

    if (nodeStatementList) {
      return nodeStatementList;
    } else if (returnStatementNode) {
      return new StatementListNodeBuilder().withStatements([returnStatementNode]).build();
    } else if (anonymousFunctionNode) {
      const arrowFunctionBody = anonymousFunctionNode.getArrowFunctionBody();
      const statementList = arrowFunctionBody.getStatements().statements;
      return new StatementListNodeBuilder().withStatements(statementList).build();
    } else {
      throw new Error('No statements found');
    }
  }

  private replaceReturnToReturnError(
    returnStatementNode: ReturnStatementNode,
    parentNode: StatementListNode | ArrowFunctionBodyNode,
  ): void {
    const expressionOfReturnStatement = returnStatementNode.getExpressionValues();
    const metadataOfReturnStatement = returnStatementNode.getMetadata();
    const newExpression = new ExpressionBuilder()
      .withExpression(expressionOfReturnStatement)
      .build();
    const returnErrorStatementNode = new ReturnErrorStatementNodeBuilder(metadataOfReturnStatement)
      .withExpression(newExpression)
      .build();
    parentNode.replaceChild(returnStatementNode, returnErrorStatementNode);
  }
}
