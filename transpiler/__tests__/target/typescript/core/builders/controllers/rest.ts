import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { RESTControllerExecuteDependenciesNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerDependenciesNodeBuilder.js';
import { RESTControllerExecuteNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerExecuteNodeBuilder.js';
import { RESTControllerIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerIdentifierNodeBuilder.js';
import { RESTControllerNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerNodeBuilder.js';
import { RESTMethodNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTMethodNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { RESTControllerExecuteDependenciesNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerExecuteDependenciesNode.js';
import { RESTControllerNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { TRestMethods } from '../../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../expression.js';
import { ReturnStatementBuilderDirector } from '../statement/return.js';
import { StatementBuilderDirector } from '../statement/statementDirector.js';

export class RestControllerBuilderDirector {
  buildRestControllerWithThisUseCaseExecute(
    identifier: string,
    options?: { await: boolean },
  ): RESTControllerNode {
    return this.controllerWithNoParams(identifier, 'GET', [
      new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result', options),
    ]);
  }

  buildControllerThatExecutesAndReturnsResult(
    identifier: string,
    options?: { await: boolean; dotValue: boolean },
  ): RESTControllerNode {
    return this.controllerWithNoParams(identifier, 'POST', [
      new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result', options),
      this.buildBasicIfTrueReturnStatement('ok', options?.dotValue ? 'result.value' : 'result'),
    ]);
  }

  buildControllerThatReturnsHelloWorld(identifier: string): RESTControllerNode {
    return this.controllerWithNoParams(identifier, 'GET', [
      new ReturnStatementBuilderDirector().buildReturn(
        new ExpressionBuilderDirector().buildStringLiteralExpression('Hello World'),
      ),
    ]);
  }

  buildControllerThatExecutesAndUsesResultTwice(
    identifier: string,
    options?: { await: boolean; dotValue: boolean },
  ): RESTControllerNode {
    const identifierVal = options?.dotValue ? 'result.value' : 'result';
    return this.controllerWithNoParams(identifier, 'POST', [
      new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result', options),
      this.buildBasicIfTrueReturnStatement('ok', identifierVal),
      this.buildBasicIfTrueReturnStatement('ok', identifierVal),
    ]);
  }

  /**
   * You give it some statements, it builds you a controller.
   */
  private controllerWithNoParams(
    identifier: string,
    method: TRestMethods,
    statements: StatementNode[],
  ): RESTControllerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new RESTControllerNodeBuilder(tree)
      .withIdentifier(new RESTControllerIdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters([]).build())
      .withRESTMethod(new RESTMethodNodeBuilder(null).withMethod(method).build())
      .withExecuteNode(
        new RESTControllerExecuteNodeBuilder(null)
          .withDependencies(this.reqResExecuteDependencies())
          .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build())
          .build(),
      )
      .build();
  }

  private reqResExecuteDependencies(): RESTControllerExecuteDependenciesNode {
    return new RESTControllerExecuteDependenciesNodeBuilder(null)
      .withDependencies('request', 'response')
      .build();
  }

  private buildBasicIfTrueReturnStatement(
    methodName: string,
    identifierValue: string,
  ): IfStatementNode {
    return new StatementBuilderDirector().buildIfStatement(
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
      [
        new ReturnStatementBuilderDirector().buildThisMethodReturn(methodName, [
          new ArgumentNodeBuilder()
            .withExpression(
              new ExpressionBuilderDirector().buildIdentifierExpression(identifierValue),
            )
            .build(),
        ]),
      ],
    );
  }
}
