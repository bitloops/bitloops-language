import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { StaticNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/StaticNodeBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ParameterNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/BitloopsPrimaryTypeNodeBuilderDirector.js';
import { PublicMethodDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import {
  bitloopsIdentifiersTypeKey,
  bitloopsPrimaryTypeKey,
  TOkErrorReturnType,
  TParameter,
} from '../../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../expression.js';
import { ReturnOkErrorTypeBuilderDirector } from '../returnOkErrorTypeBuilderDirector.js';
import { StatementBuilderDirector } from '../statement/statementDirector.js';
import { StatementListBuilderDirector } from '../statement/statementListDirector.js';

export class PublicMethodBuilderDirector {
  private builder: PublicMethodDeclarationNodeBuilder;

  constructor() {
    this.builder = new PublicMethodDeclarationNodeBuilder();
  }

  buildMethodWithThisMethodCallExpression({
    methodName,
    entityName,
    identifierMethodName,
    identifierArgumentName,
  }: {
    methodName: string;
    entityName: string;
    identifierArgumentName: string;
    identifierMethodName: string;
  }): PublicMethodDeclarationNode {
    return this.builder
      .withIdentifier(new IdentifierNodeBuilder().withName(methodName).build())
      .withParameters(new ParameterListNodeBuilder().withParameters([]).build())
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifier(entityName),
      )
      .withStatements(
        new StatementListBuilderDirector().buildThisMethodCallExpressionWithThisArgument({
          identifierMethodName,
          identifierArgumentName,
        }),
      )
      .withStatic(new StaticNodeBuilder().withValue(false).build())
      .build();
  }

  buildMethodWithThisPropsMethodCallExpression({
    methodName,
    entityName,
    identifierMethodName,
    identifierArgumentName,
  }: {
    methodName: string;
    entityName: string;
    identifierArgumentName: string;
    identifierMethodName: string;
  }): PublicMethodDeclarationNode {
    return this.builder
      .withIdentifier(new IdentifierNodeBuilder().withName(methodName).build())
      .withParameters(new ParameterListNodeBuilder().withParameters([]).build())
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifier(entityName),
      )
      .withStatements(
        new StatementListBuilderDirector().buildThisMethodCallExpressionWithThisPropsArgument({
          identifierMethodName,
          identifierArgumentName,
        }),
      )
      .withStatic(new StaticNodeBuilder().withValue(false).build())
      .build();
  }

  buildMethodWithSimpleReturnExpression({
    methodName,
    parameters,
    returnType,
  }: {
    methodName: string;
    parameters: TParameter[];
    returnType: TOkErrorReturnType;
  }): PublicMethodDeclarationNode {
    const returnOKType = returnType.returnType.ok;
    const returnErrors = returnType.returnType.errors.map((error) => error.error);
    return this.builder
      .withIdentifier(new IdentifierNodeBuilder().withName(methodName).build())
      .withParameters(
        new ParameterListNodeBuilder()
          .withParameters([
            new ParameterNodeBuilder()
              .withIdentifier(
                new ParameterIdentifierNodeBuilder()
                  .withIdentifier(parameters[0].parameter.value)
                  .build(),
              )
              .withType(
                new BitloopsPrimaryTypeNodeBuilderDirector().buildIdentifierPrimaryType(
                  parameters[0].parameter[bitloopsPrimaryTypeKey][bitloopsIdentifiersTypeKey],
                ),
              )
              .build(),
          ])
          .build(),
      )
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypeBitloopsIdentifier(
          returnOKType[bitloopsPrimaryTypeKey][bitloopsIdentifiersTypeKey],
          returnErrors,
        ),
      )
      .withStatements(
        new StatementListNodeBuilder()
          .withStatements([
            new StatementBuilderDirector().buildReturnOKStatement(
              new ExpressionBuilderDirector().buildIdentifierExpression('account'),
            ),
          ])
          .build(),
      )
      .withStatic(new StaticNodeBuilder().withValue(false).build())
      .build();
  }
}
