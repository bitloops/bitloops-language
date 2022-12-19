import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PrivateMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { PrivateMethodDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { ReturnOkErrorTypeBuilderDirector } from '../returnOkErrorTypeBuilderDirector.js';
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
      .build();
  }
}
