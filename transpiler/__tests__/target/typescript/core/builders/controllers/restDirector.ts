import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { RESTControllerExecuteDependenciesNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerDependenciesNodeBuilder.js';
import { RESTControllerExecuteNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerExecuteNodeBuilder.js';
import { RESTControllerIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerIdentifierNodeBuilder.js';
import { RESTControllerNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerNodeBuilder.js';
import { RESTMethodNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTMethodNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ParameterNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { RESTControllerExecuteDependenciesNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerExecuteDependenciesNode.js';
import { RESTControllerNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { TRestMethods } from '../../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../expression.js';
import { ReturnStatementBuilderDirector } from '../statement/returnDirector.js';
import { StatementBuilderDirector } from '../statement/statementDirector.js';
import { ParameterBuilderDirector } from '../parameterDirector.js';
import { ConstDeclarationBuilderDirector } from '../statement/constDeclaration.js';
import { BitloopsPrimaryTypeNodeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { ArgumentDirector } from '../argument.js';
import { EvaluationFieldBuilderDirector } from '../evaluationFIeld.js';
import { IfStatementBuilderDirector } from '../statement/ifStatementDirector.js';
import { ArgumentListDirector } from '../argumentList.js';
import { SwitchStatementBuilderDirector } from '../statement/switchDirector.js';
import { RestServerTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/setup/RESTServerTypeNodeBuilder.js';

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
    return this.controllerWithParams(
      identifier,
      'POST',
      [
        new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result', options),
        this.buildBasicIfTrueReturnStatement('ok', options?.dotValue ? 'result.value' : 'result'),
      ],
      [new ParameterBuilderDirector().buildIdentifierParameter('useCase', 'TodoCreateUseCase')],
    );
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

  buildControllerWithSwitchStatement(identifier: string): RESTControllerNode {
    // const identifierVal = 'result.value';
    return this.controllerWithParams(
      identifier,
      'POST',
      [
        new ConstDeclarationBuilderDirector().buildDTOEvaluationConstDeclaration(
          'dto',
          'HelloWorldRequestDTO',
          [
            new EvaluationFieldBuilderDirector().buildMemberDotEvaluationField(
              'name',
              'request',
              'body',
              'name',
            ),
          ],
          new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType('HelloWorldRequestDTO'),
        ),
        new ConstDeclarationBuilderDirector().buildConstDeclarationThisUseCaseExecute(
          'result',
          { await: false }, // it should be added by modelToTsModel
          [
            new ArgumentDirector().buildArgument(
              new ExpressionBuilderDirector().buildIdentifierExpression('dto'),
            ),
          ],
        ),
        new IfStatementBuilderDirector().buildIfStatement(
          new ExpressionBuilderDirector().buildInstanceOfWithIdentifierExpression(
            'result',
            'Error',
          ),
          [
            new SwitchStatementBuilderDirector().buildSwitchStatement(
              new ExpressionBuilderDirector().buildGetClassExpression(
                new ExpressionBuilderDirector().buildIdentifierExpression('result'),
              ),
              [
                {
                  expression: new ExpressionBuilderDirector().buildIdentifierExpression(
                    'DomainErrors.InvalidNameError',
                  ),
                  statementList: new StatementListNodeBuilder(null)
                    .withStatements([
                      this.buildThisMethodResponseResultMessage('clientError', 'result'),
                      new StatementBuilderDirector().buildBreakStatement(),
                    ])
                    .build(),
                },
              ],
              new StatementListNodeBuilder(null)
                .withStatements([this.buildThisMethodResponseResultMessage('error', 'result')])
                .build(),
            ),
          ],
          [
            new ExpressionBuilderDirector().buildThisMethodCall(
              'ok',
              new ArgumentListDirector().buildArgumentListWithArgs([
                new ArgumentDirector().buildArgument(
                  new ExpressionBuilderDirector().buildIdentifierExpression('response'),
                ),
                new ArgumentDirector().buildArgument(
                  new ExpressionBuilderDirector().buildIdentifierExpression('result'),
                ),
              ]),
            ),
          ],
        ),
      ],
      [new ParameterBuilderDirector().buildIdentifierParameter('useCase', 'HelloWorldUseCase')],
    );
  }

  private buildThisMethodResponseResultMessage(method: string, identifier: string): StatementNode {
    return new ExpressionBuilderDirector().buildThisMethodCall(
      method,
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentDirector().buildArgument(
          new ExpressionBuilderDirector().buildIdentifierExpression('response'),
        ),
        new ArgumentDirector().buildArgument(
          new ExpressionBuilderDirector().buildMemberDotOutOfVariables(identifier, 'message'),
        ),
      ]),
    );
  }

  /**
   * You give it some statements, it builds you a controller.
   */
  private controllerWithNoParams(
    identifier: string,
    method: TRestMethods,
    statements: StatementNode[],
  ): RESTControllerNode {
    return this.controllerWithParams(identifier, method, statements, []);
  }

  private controllerWithParams(
    identifier: string,
    method: TRestMethods,
    statements: StatementNode[],
    parameters: ParameterNode[],
  ): RESTControllerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new RESTControllerNodeBuilder(tree)
      .withServerTypeNode(new RestServerTypeNodeBuilder().withServerType('REST.Fastify').build())
      .withIdentifier(new RESTControllerIdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(parameters).build())
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
