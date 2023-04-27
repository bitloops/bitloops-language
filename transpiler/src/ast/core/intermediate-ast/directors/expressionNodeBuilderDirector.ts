import { EvaluationNode } from '../nodes/Expression/Evaluation/EvaluationNode.js';
import { RelationalExpressionBuilder } from '../builders/expressions/relationalBuilder.js';
import { ArrayLiteralExpressionNodeBuilder } from '../builders/expressions/arrayLiteralExpressionBuilder.js';
import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../builders/expressions/IdentifierExpressionBuilder.js';
import { LiteralTypeBuilder } from '../builders/expressions/literal/components/LiteralTypeBuilder.js';
import { LiteralValueBuilder } from '../builders/expressions/literal/components/LiteralValueBuilder.js';
import { LiteralBuilder } from '../builders/expressions/literal/LiteralBuilder.js';
import { IntegerLiteralBuilder } from '../builders/expressions/literal/NumericLiteral/IntegerLiteralBuilder.js';
import { NumericLiteralBuilder } from '../builders/expressions/literal/NumericLiteral/NumericLiteralBuilder.js';
import { LogicalExpressionBuilder } from '../builders/expressions/Logical/logicalExpressionBuilder.js';
import { LogicalOrExpressionBuilder } from '../builders/expressions/Logical/logicalOrExpressionBuilder.js';
import { LogicalXorExpressionBuilder } from '../builders/expressions/Logical/logicalXorExpressionBuilder.js';
import { NotExpressionNodeBuilder } from '../builders/expressions/Logical/notExpression.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { IdentifierExpressionNode } from '../nodes/Expression/IdentifierExpression.js';
import { LogicalAndExpressionBuilder } from '../builders/expressions/Logical/logicalAndExpressionBuilder.js';
import { OperatorBuilder } from '../builders/expressions/operatorBuilder.js';
import { LeftExpressionBuilder } from '../builders/expressions/leftExpressionBuilder.js';
import { RightExpressionBuilder } from '../builders/expressions/rightExpressionBuilder.js';
import { TAdditiveOperator, TEqualityOperator, TRelationalOperator } from '../../../../types.js';
import { DecimalLiteralBuilder } from '../builders/expressions/literal/NumericLiteral/DecimalLiteralBuilder.js';
import { EqualityExpressionBuilder } from '../builders/expressions/equalityBuilderExpression.js';
import { BooleanLiteralBuilder } from '../builders/expressions/literal/BooleanLiteralBuilder.js';
import { AdditiveExpressionBuilder } from '../builders/expressions/additiveExpresssion.js';
import { StringLiteralBuilder } from '../builders/expressions/literal/StringLiteralBuilder.js';
import { AssignmentExpressionNodeBuilder } from '../builders/expressions/assignmentExprBuilder.js';
import { ThisExpressionNodeBuilder } from '../builders/expressions/thisExpressionBuilder.js';
import { ClassNodeBuilder } from '../builders/ClassBuilder.js';
import { IsInstanceOfExpressionNodeBuilder } from '../builders/expressions/IsIntanceOfExpressionBuilder.js';
import { ParenthesizedExpressionNodeBuilder } from '../builders/expressions/parenthesizedExprBuilder.js';
import { MemberDotExpressionNodeBuilder } from '../builders/expressions/MemberDot/memberDotBuilder.js';
import { MethodCallExpressionNodeBuilder } from '../builders/expressions/methodCallExprBuilder.js';
import { ArgumentListNode } from '../nodes/ArgumentList/ArgumentListNode.js';
import { ToStringBuilder } from '../builders/expressions/ToStringBuilder.js';
import { GetClassNodeBuilder } from '../builders/expressions/GetClassBuilder.js';
import { TemplateStringLiteralBuilder } from '../builders/expressions/literal/TemplateStringLiteralBuilder.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { DefaultEnvVarValueNode } from '../nodes/setup/DefaultEnvVarValueNode.js';
import { EnvironmentalVariableNodeBuilder } from '../builders/setup/EnvironmentalVariableNodeBuilder.js';
import { RegexLiteralNodeBuilder } from '../builders/expressions/literal/RegexLiteralNodeBuilder.js';
import { ArgumentNodeBuilder } from '../builders/ArgumentList/ArgumentNodeBuilder.js';
import { ArgumentListNodeBuilder } from '../builders/ArgumentList/ArgumentListNodeBuilder.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from './BitloopsPrimaryTypeNodeBuilderDirector.js';
import { IfErrorExpressionNodeBuilder } from '../builders/expressions/IfErrorExpressionNodeBuilder.js';
import { AnonymousFunctionNodeBuilderDirector } from './anonymousFunctionNodeBuilderDirector.js';

export class ExpressionBuilderDirector {
  private metadata: TNodeMetadata;

  constructor(metadata?: TNodeMetadata) {
    this.metadata = metadata;
  }

  buildIdentifierExpression(name: string): ExpressionNode {
    const expressionNode = new ExpressionBuilder(this.metadata)
      .withExpression(this.buildIdentifier(name))
      .build();
    return expressionNode;
  }

  buildStringLiteralExpression(value: string): ExpressionNode {
    const stringLit = new StringLiteralBuilder(this.metadata).withValue(value).build();

    const literalExpr = new LiteralBuilder(this.metadata).withLiteral(stringLit).build();
    return new ExpressionBuilder(this.metadata).withExpression(literalExpr).build();
  }

  buildNotExpression(expr: ExpressionNode): ExpressionNode {
    const notNode = new NotExpressionNodeBuilder(this.metadata).withExpression(expr).build();
    const logicalNode = new LogicalExpressionBuilder(this.metadata)
      .withNOTExpression(notNode)
      .build();
    return new ExpressionBuilder(this.metadata).withExpression(logicalNode).build();
  }

  buildANDExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const left = new LeftExpressionBuilder(this.metadata).withExpression(expr1).build();
    const right = new RightExpressionBuilder(this.metadata).withExpression(expr2).build();
    const andNode = new LogicalAndExpressionBuilder(this.metadata)
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    const logicalNode = new LogicalExpressionBuilder(this.metadata)
      .withANDExpression(andNode)
      .build();
    return new ExpressionBuilder(this.metadata).withExpression(logicalNode).build();
  }

  buildORExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const left = new LeftExpressionBuilder(this.metadata).withExpression(expr1).build();
    const right = new RightExpressionBuilder(this.metadata).withExpression(expr2).build();
    const orNode = new LogicalOrExpressionBuilder(this.metadata)
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    const logicalNode = new LogicalExpressionBuilder(this.metadata)
      .withORExpression(orNode)
      .build();
    return new ExpressionBuilder(this.metadata).withExpression(logicalNode).build();
  }

  buildXORExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const left = new LeftExpressionBuilder(this.metadata).withExpression(expr1).build();
    const right = new RightExpressionBuilder(this.metadata).withExpression(expr2).build();
    const xorNode = new LogicalXorExpressionBuilder(this.metadata)
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    const logicalNode = new LogicalExpressionBuilder(this.metadata)
      .withXORExpression(xorNode)
      .build();
    return new ExpressionBuilder(this.metadata).withExpression(logicalNode).build();
  }

  buildRelationalExpression(
    expr1: ExpressionNode,
    expr2: ExpressionNode,
    op: TRelationalOperator,
  ): ExpressionNode {
    const left = new LeftExpressionBuilder(this.metadata).withExpression(expr1).build();
    const right = new RightExpressionBuilder(this.metadata).withExpression(expr2).build();

    const operator = new OperatorBuilder(this.metadata).withSymbol(op).build();

    const node = new RelationalExpressionBuilder()
      .withLeftExpression(left)
      .withOperator(operator)
      .withRightExpression(right)
      .build();

    const expressionNode = new ExpressionBuilder(this.metadata).withExpression(node).build();

    return expressionNode;
  }

  buildArrayLiteralExpression(...expressions: ExpressionNode[]): ExpressionNode {
    const arrayNode = new ArrayLiteralExpressionNodeBuilder(this.metadata)
      .withArrayElements(expressions)
      .build();
    return new ExpressionBuilder(this.metadata).withExpression(arrayNode).build();
  }

  buildAssignmentExpression(left: ExpressionNode, right: ExpressionNode): ExpressionNode {
    const assignmentNode = new AssignmentExpressionNodeBuilder(this.metadata)
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    return new ExpressionBuilder(this.metadata).withExpression(assignmentNode).build();
  }

  buildMemberDotExpression(
    leftExpression: ExpressionNode,
    identifierValue: string,
  ): ExpressionNode {
    const identifierExpr = new IdentifierExpressionBuilder(this.metadata)
      .withValue(identifierValue)
      .build();
    const memberExpr = new MemberDotExpressionNodeBuilder(this.metadata)
      .withExpression(leftExpression)
      .withIdentifier(identifierExpr)
      .build();
    return new ExpressionBuilder(this.metadata).withExpression(memberExpr).build();
  }

  buildMemberDotOutOfVariables(...identifiers: string[]): ExpressionNode {
    return identifiers.reduce(
      (leftExpression, identifier) => this.buildMemberDotExpression(leftExpression, identifier),
      this.buildIdentifierExpression(identifiers.shift()),
    );
  }

  buildToStringExpression(expression: ExpressionNode): ExpressionNode {
    const node = new ToStringBuilder(this.metadata).withExpression(expression).build();
    return new ExpressionBuilder(this.metadata).withExpression(node).build();
  }

  buildGetClassExpression(expression: ExpressionNode): ExpressionNode {
    const node = new GetClassNodeBuilder(this.metadata).withExpression(expression).build();
    return new ExpressionBuilder(this.metadata).withExpression(node).build();
  }

  buildEqualityExpression(
    expr1: ExpressionNode,
    expr2: ExpressionNode,
    op: TEqualityOperator = '==',
  ): ExpressionNode {
    const left = new LeftExpressionBuilder(this.metadata).withExpression(expr1).build();
    const right = new RightExpressionBuilder(this.metadata).withExpression(expr2).build();

    const operator = new OperatorBuilder(this.metadata).withSymbol(op).build();

    const node = new EqualityExpressionBuilder(this.metadata)
      .withLeftExpression(left)
      .withOperator(operator)
      .withRightExpression(right)
      .build();

    const expressionNode = new ExpressionBuilder(this.metadata).withExpression(node).build();

    return expressionNode;
  }

  buildVariableEqualityExpression(
    id1: string,
    id2: string,
    op: TEqualityOperator = '==',
  ): ExpressionNode {
    return this.buildEqualityExpression(
      this.buildIdentifierExpression(id1),
      this.buildIdentifierExpression(id2),
      op,
    );
  }

  buildAdditiveExpression(
    expr1: ExpressionNode,
    expr2: ExpressionNode,
    op: TAdditiveOperator = '+',
  ): ExpressionNode {
    const left = new LeftExpressionBuilder(this.metadata).withExpression(expr1).build();
    const right = new RightExpressionBuilder(this.metadata).withExpression(expr2).build();

    const operator = new OperatorBuilder(this.metadata).withSymbol(op).build();

    const node = new AdditiveExpressionBuilder(this.metadata)
      .withLeftExpression(left)
      .withRightExpression(right)
      .withOperator(operator)
      .build();
    const expressionNode = new ExpressionBuilder(this.metadata).withExpression(node).build();

    return expressionNode;
  }

  buildInt32LiteralExpression(value: number): ExpressionNode {
    const valueNode = new LiteralValueBuilder(this.metadata).withValue(value.toString()).build();
    const typeNode = new LiteralTypeBuilder(this.metadata).withType('int32').build();
    const integerLiteralNode = new IntegerLiteralBuilder()
      .withValue(valueNode)
      .withType(typeNode)
      .build();
    const numericLiteral = new NumericLiteralBuilder(this.metadata)
      .withNumericLiteral(integerLiteralNode)
      .build();

    const literalExpr = new LiteralBuilder(this.metadata).withLiteral(numericLiteral).build();
    return new ExpressionBuilder(this.metadata).withExpression(literalExpr).build();
  }

  buildFloatLiteralExpression(value: number): ExpressionNode {
    const valueNode = new LiteralValueBuilder(this.metadata).withValue(value.toString()).build();
    const typeNode = new LiteralTypeBuilder(this.metadata).withType('float').build();
    const decimalLiteralNode = new DecimalLiteralBuilder(this.metadata)
      .withValue(valueNode)
      .withType(typeNode)
      .build();
    const numericLiteral = new NumericLiteralBuilder(this.metadata)
      .withNumericLiteral(decimalLiteralNode)
      .build();

    const literalExpr = new LiteralBuilder(this.metadata).withLiteral(numericLiteral).build();
    return new ExpressionBuilder(this.metadata).withExpression(literalExpr).build();
  }

  buildBooleanLiteralExpression(value: boolean): ExpressionNode {
    const booleanLit = new BooleanLiteralBuilder(this.metadata).withValue(`${value}`).build();

    const literalExpr = new LiteralBuilder(this.metadata).withLiteral(booleanLit).build();
    return new ExpressionBuilder(this.metadata).withExpression(literalExpr).build();
  }

  buildTemplateStringLiteralExpression(value: string): ExpressionNode {
    const stringLit = new TemplateStringLiteralBuilder(this.metadata).withValue(value).build();

    const literalExpr = new LiteralBuilder(this.metadata).withLiteral(stringLit).build();
    return new ExpressionBuilder(this.metadata).withExpression(literalExpr).build();
  }

  buildRegexLiteralExpression(value: string): ExpressionNode {
    const regexLit = new RegexLiteralNodeBuilder(this.metadata).withValue(value).build();

    const literalExpr = new LiteralBuilder(this.metadata).withLiteral(regexLit).build();
    return new ExpressionBuilder(this.metadata).withExpression(literalExpr).build();
  }

  buildIdentifier(name: string): IdentifierExpressionNode {
    const identifierNode = new IdentifierExpressionBuilder(this.metadata).withValue(name).build();
    return identifierNode;
  }

  buildThisExpression(): ExpressionNode {
    const thisExpressionNode = new ThisExpressionNodeBuilder(this.metadata).build();
    const expressionNode = new ExpressionBuilder().withExpression(thisExpressionNode).build();
    return expressionNode;
  }

  /**
   * e.g. this.name
   */
  buildThisMemberDotExpression(identifierName: string): ExpressionNode {
    const leftExpression = this.buildThisExpression();
    const memberDotExpression = this.buildMemberDotExpression(leftExpression, identifierName);
    return memberDotExpression;
  }

  buildModifiedThisExpression(value: string): ExpressionNode {
    const thisExpressionNode = new ThisExpressionNodeBuilder(this.metadata).build(value);
    const expressionNode = new ExpressionBuilder(this.metadata)
      .withExpression(thisExpressionNode)
      .build();
    return expressionNode;
  }

  buildInstanceOfWithIdentifierExpression(
    identifier: string,
    classToCompare: string,
  ): ExpressionNode {
    const classNode = new ClassNodeBuilder()
      .withClass(
        new BitloopsPrimaryTypeNodeBuilderDirector().buildIdentifierPrimaryType(classToCompare),
      )
      .build();
    const expression = this.buildIdentifierExpression(identifier);
    const isInstanceOfNode = new IsInstanceOfExpressionNodeBuilder()
      .withClass(classNode)
      .withExpression(expression)
      .build();
    const expressionNode = new ExpressionBuilder(this.metadata)
      .withExpression(isInstanceOfNode)
      .build();
    return expressionNode;
  }

  buildParenthesizedExpression(expression: ExpressionNode): ExpressionNode {
    const parenthesizedExpressionNode = new ParenthesizedExpressionNodeBuilder(this.metadata)
      .withExpression(expression)
      .build();
    const expressionNode = new ExpressionBuilder(this.metadata)
      .withExpression(parenthesizedExpressionNode)
      .build();
    return expressionNode;
  }

  buildMethodCallExpression(
    expression: ExpressionNode,
    argumentList: ArgumentListNode,
  ): ExpressionNode {
    const methodCallExpressionNode = new MethodCallExpressionNodeBuilder(this.metadata)
      .withExpression(expression)
      .withArgumentsList(argumentList)
      .build();
    const expressionNode = new ExpressionBuilder(this.metadata)
      .withExpression(methodCallExpressionNode)
      .build();
    return expressionNode;
  }

  buildThisMethodCall(method: string, args: ArgumentListNode): ExpressionNode {
    const thisExpression = this.buildThisExpression();
    const methodCallLeftExpr = this.buildMemberDotExpression(thisExpression, method);
    const methodCallExpression = this.buildMethodCallExpression(methodCallLeftExpr, args);
    return methodCallExpression;
  }

  buildEvaluationExpression(evaluation: EvaluationNode): ExpressionNode {
    const expressionNode = new ExpressionBuilder(this.metadata).withExpression(evaluation).build();
    return expressionNode;
  }

  buildThisDependencyMethodCall(
    dependency: string,
    method: string,
    args: ArgumentListNode,
    options?: { await: boolean },
  ): ExpressionNode {
    const thisExpression = options?.await
      ? this.buildModifiedThisExpression('await this')
      : this.buildThisExpression();
    const dependencyExpression = this.buildMemberDotExpression(thisExpression, dependency);
    const methodCallLeftExpr = this.buildMemberDotExpression(dependencyExpression, method);
    const methodCallExpression = this.buildMethodCallExpression(methodCallLeftExpr, args);
    return methodCallExpression;
  }

  buildEnvironmentalVariableWithDefault(
    env: IdentifierNode,
    defaultEnv: DefaultEnvVarValueNode,
  ): ExpressionNode {
    const envExpression = new ExpressionBuilder(this.metadata)
      .withExpression(
        new EnvironmentalVariableNodeBuilder(this.metadata)
          .withIdentifier(env)
          .withDefaultValue(defaultEnv)
          .build(),
      )
      .build();
    return envExpression;
  }

  /**
   * deprecated
   */
  buildIfErrorDefaultExpressionNode(leftExpression: ExpressionNode): ExpressionNode {
    const anonymousFunction =
      new AnonymousFunctionNodeBuilderDirector().buildIfErrorDefaultAnonymousFunction();
    const ifErrorExpressionNode = new IfErrorExpressionNodeBuilder(this.metadata)
      .withExpression(leftExpression)
      .withAnonymousFunction(anonymousFunction)
      .build();
    const expressionNode = new ExpressionBuilder(this.metadata)
      .withExpression(ifErrorExpressionNode)
      .build();
    return expressionNode;
  }

  buildThisMethodCallWithMemberDotExpression({
    argumentIdentifierName,
    methodCallName,
    memberDotName,
  }: {
    argumentIdentifierName: string;
    methodCallName: string;
    memberDotName: string;
  }): ExpressionNode {
    const thisExprNode = new ExpressionBuilder(this.metadata)
      .withExpression(new ThisExpressionNodeBuilder(this.metadata).build())
      .build();
    const thisEventBusExpr = new ExpressionBuilder(this.metadata)
      .withExpression(
        new MemberDotExpressionNodeBuilder(this.metadata)
          .withExpression(thisExprNode)
          .withIdentifier(
            new IdentifierExpressionBuilder(this.metadata).withValue(memberDotName).build(),
          )
          .build(),
      )
      .build();
    const thisEventBusPublishManyExpr = new ExpressionBuilder(this.metadata)
      .withExpression(
        new MemberDotExpressionNodeBuilder(this.metadata)
          .withExpression(thisEventBusExpr)
          .withIdentifier(
            new IdentifierExpressionBuilder(this.metadata).withValue(methodCallName).build(),
          )
          .build(),
      )
      .build();

    const argumentIdentifierExpression = new ExpressionBuilder(this.metadata)
      .withExpression(
        new IdentifierExpressionBuilder(this.metadata).withValue(argumentIdentifierName).build(),
      )
      .build();
    const argumentNode = new ArgumentNodeBuilder(this.metadata)
      .withExpression(argumentIdentifierExpression)
      .build();
    const argumentListNode = new ArgumentListNodeBuilder(this.metadata)
      .withArguments([argumentNode])
      .build();

    const methodCallExprNode = new ExpressionBuilder(this.metadata)
      .withExpression(
        new MethodCallExpressionNodeBuilder(this.metadata)
          .withExpression(thisEventBusPublishManyExpr)
          .withArgumentsList(argumentListNode)
          .build(),
      )
      .build();
    return methodCallExprNode;
  }
}
