import { DomainCreateNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { DomainCreateNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';
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
        new ParameterNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(
              entityPropsIdentifierType,
            ),
          )
          .withIdentifier(
            new ParameterIdentifierNodeBuilder(null).withIdentifier(entityPropsName).build(),
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
        new ParameterNodeBuilder()
          .withType(new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType('SomeProps'))
          .withIdentifier(new ParameterIdentifierNodeBuilder(null).withIdentifier('some').build())
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
        new ParameterNodeBuilder()
          .withType(new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType('SomeProps'))
          .withIdentifier(new ParameterIdentifierNodeBuilder(null).withIdentifier('some').build())
          .build(),
      )
      .build();
  }
}
