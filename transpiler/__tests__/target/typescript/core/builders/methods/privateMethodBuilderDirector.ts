import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PrivateMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationNodeBuilder.js';
import { StaticNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/StaticNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/BitloopsPrimaryTypeNodeBuilderDirector.js';
import { PrivateMethodDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../returnOkErrorTypeBuilderDirector.js';
import { StatementBuilderDirector } from '../statement/statementDirector.js';
import { StatementListBuilderDirector } from '../statement/statementListDirector.js';

export class PrivateMethodBuilderDirector {
  private builder: PrivateMethodDeclarationNodeBuilder;

  constructor() {
    this.builder = new PrivateMethodDeclarationNodeBuilder();
  }

  buildMethodWithThisAssignmentExpression({
    methodName,
    entityName,
    thisIdentifierName,
  }: {
    methodName: string;
    entityName: string;
    thisIdentifierName: string;
  }): PrivateMethodDeclarationNode {
    return this.builder
      .withIdentifier(new IdentifierNodeBuilder().withName(methodName).build())
      .withParameters(new ParameterListNodeBuilder().withParameters([]).build())
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifier(entityName),
      )
      .withStatements(
        new StatementListBuilderDirector().buildThisAssignmentExpression(thisIdentifierName),
      )
      .withStatic(new StaticNodeBuilder().withValue(false).build())
      .build();
  }

  buildMethodWithThisPropsAssignmentExpression({
    methodName,
    entityName,
    thisIdentifierName,
  }: {
    methodName: string;
    entityName: string;
    thisIdentifierName: string;
  }): PrivateMethodDeclarationNode {
    return this.builder
      .withIdentifier(new IdentifierNodeBuilder().withName(methodName).build())
      .withParameters(new ParameterListNodeBuilder().withParameters([]).build())
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifier(entityName),
      )
      .withStatements(
        new StatementListBuilderDirector().buildThisPropsAssignmentExpression(thisIdentifierName),
      )
      .withStatic(new StaticNodeBuilder().withValue(false).build())
      .build();
  }

  buildMethodWithBooleanExpression({
    methodName,
    booleanLiteral,
  }: {
    methodName: string;
    booleanLiteral: boolean;
  }): PrivateMethodDeclarationNode {
    return this.builder
      .withIdentifier(new IdentifierNodeBuilder().withName(methodName).build())
      .withParameters(new ParameterListNodeBuilder().withParameters([]).build())
      .withReturnType(
        new BitloopsPrimaryTypeNodeBuilderDirector().buildPrimitivePrimaryType('bool'),
      )
      .withStatements(
        new StatementListNodeBuilder()
          .withStatements([
            new StatementBuilderDirector().buildReturnStatement(
              new ExpressionBuilderDirector().buildBooleanLiteralExpression(booleanLiteral),
            ),
          ])
          .build(),
      )
      .withStatic(new StaticNodeBuilder().withValue(false).build())
      .build();
  }
}
