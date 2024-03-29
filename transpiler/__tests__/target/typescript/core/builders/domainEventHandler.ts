import { DomainEventHandlerDeclarationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/DomainEventHandler/DomainEventHandlerDeclarationNodeBuilder.js';
import { DomainEventHandlerIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/DomainEventHandler/DomainEventHandlerIdentifierNodeBuilder.js';
import { EventHandlerHandleMethodNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/HandleMethodNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ReturnOkErrorTypeNodeDirector } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilderDirector.js';
import { StatementListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainEventHandlerDeclarationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StatementNode } from '../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';

export class DomainEventHandlerBuilderDirector {
  buildDomainEventHandler({
    identifier,
    parameters,
    executeParameter,
    statements,
    returnOkType,
    returnErrorType,
  }: {
    identifier: string;
    parameters: ParameterNode[];
    executeParameter?: ParameterNode;
    statements: StatementNode[];
    returnOkType: string;
    returnErrorType: string;
  }): DomainEventHandlerDeclarationNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const handleNode = new EventHandlerHandleMethodNodeBuilder()
      .withParameter(executeParameter)
      .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build())
      .withReturnType(
        new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithIdentifierOk(
          returnOkType,
          returnErrorType,
        ),
      )
      .build();

    return new DomainEventHandlerDeclarationNodeBuilder(tree)
      .withIdentifier(
        new DomainEventHandlerIdentifierNodeBuilder(null).withName(identifier).build(),
      )
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(parameters).build())
      .withHandleMethod(handleNode)
      .withDefaultEventBusDependencies()
      .build();
  }

  buildDomainEventHandlerWithoutErrors({
    identifier,
    parameters,
    executeParameter,
    statements,
    returnOkType,
  }: {
    identifier: string;
    parameters: ParameterNode[];
    executeParameter?: ParameterNode;
    statements: StatementNode[];
    returnOkType: string;
  }): DomainEventHandlerDeclarationNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const handleNode = new EventHandlerHandleMethodNodeBuilder()
      .withParameter(executeParameter)
      .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build())
      .withReturnType(
        new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithPrimitiveOkAndNoErrors(
          returnOkType,
        ),
      )
      .build();

    return new DomainEventHandlerDeclarationNodeBuilder(tree)
      .withIdentifier(
        new DomainEventHandlerIdentifierNodeBuilder(null).withName(identifier).build(),
      )
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(parameters).build())
      .withHandleMethod(handleNode)
      .withDefaultEventBusDependencies()
      .build();
  }
}
