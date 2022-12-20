import { DomainCreateNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateBuilder.js';
import { DomainCreateParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PropsIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Props/PropsIdentifierNodeBuilder.js';
import { DomainCreateNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { ReturnOkErrorTypeBuilderDirector } from './returnOkErrorTypeBuilderDirector.js';
import { StatementListBuilderDirector } from './statement/statementListDirector.js';

export class DomainCreateBuilderDirector {
  private builder: DomainCreateNodeBuilder;
  constructor() {
    this.builder = new DomainCreateNodeBuilder();
  }

  buildCreateEntityWithNoError({
    entityName,
    entityPropsName,
    entityPropsIdentifierType,
  }: {
    entityName: string;
    entityPropsName: string;
    entityPropsIdentifierType: string;
  }): DomainCreateNode {
    return this.builder
      .withStatements(
        new StatementListBuilderDirector().buildReturnOkStatementEntityEvaluation(
          entityName,
          entityPropsName,
        ),
      )
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifier(entityName),
      )
      .withParameter(
        new DomainCreateParameterNodeBuilder()
          .withIdentifierNode(new IdentifierNodeBuilder().withName(entityPropsName).build())
          .withTypeNode(
            new PropsIdentifierNodeBuilder().withName(entityPropsIdentifierType).build(),
          )
          .build(),
      )
      .build();
  }

  buildCreateWithThisAssignmentExpression(thisIdentifierName: string): DomainCreateNode {
    return this.builder
      .withStatements(
        new StatementListBuilderDirector().buildThisAssignmentExpression(thisIdentifierName),
      )
      .withReturnType(new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypePrimitiveType('void'))
      .withParameter(
        new DomainCreateParameterNodeBuilder()
          .withIdentifierNode(new IdentifierNodeBuilder().withName('some').build())
          .withTypeNode(new PropsIdentifierNodeBuilder().withName('SomeProps').build())
          .build(),
      )
      .build();
  }

  buildCreateWithThisPropsAssignmentExpression(thisIdentifierName: string): DomainCreateNode {
    return this.builder
      .withStatements(
        new StatementListBuilderDirector().buildThisPropsAssignmentExpression(thisIdentifierName),
      )
      .withReturnType(new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypePrimitiveType('void'))
      .withParameter(
        new DomainCreateParameterNodeBuilder()
          .withIdentifierNode(new IdentifierNodeBuilder().withName('some').build())
          .withTypeNode(new PropsIdentifierNodeBuilder().withName('SomeProps').build())
          .build(),
      )
      .build();
  }
}
