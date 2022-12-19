import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { PublicMethodDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import { ReturnOkErrorTypeBuilderDirector } from '../returnOkErrorTypeBuilderDirector.js';
import { StatementListBuilderDirector } from '../statement/statementListDirector.js';

export class PublicMethodBuilderDirector {
  private builder: PublicMethodDeclarationNodeBuilder;

  constructor() {
    this.builder = new PublicMethodDeclarationNodeBuilder();
  }

  buildMethodWithThisAssignmentExpression({
    methodName,
    entityName,
    thisIdentifierName,
  }: {
    methodName: string;
    entityName: string;
    thisIdentifierName: string;
  }): PublicMethodDeclarationNode {
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
