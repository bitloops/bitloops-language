import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { GraphQLControllerExecuteNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/graphQL/GraphQLControllerExecuteNodeBuilder.js';
import { GraphQLControllerNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/graphQL/GraphQLControllerNodeBuilder.js';
import { GraphQLExecuteDependenciesNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/graphQL/GraphQLExecuteDependenciesNodeBuilder.js';
import { GraphQLInputTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/graphQL/GraphQLInputTypeNodeBuilder.js';
import { GraphQLOperationTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/graphQL/GraphQLOperationTypeNodeBuilder.js';
import { GraphQLControllerIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/graphQL/RESTControllerIdentifierNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ParameterNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { GraphQLControllerExecuteDependenciesNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerExecuteDependenciesNode.js';
import { GraphQLControllerNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { TGraphQLOperation } from '../../../../../../src/types.js';
import { ArgumentDirector } from '../argument.js';
import { ArgumentListDirector } from '../argumentList.js';
import { ExpressionBuilderDirector } from '../expression.js';
import { ReturnStatementBuilderDirector } from '../statement/returnDirector.js';
import { StatementBuilderDirector } from '../statement/statementDirector.js';
import { ConstDeclarationBuilderDirector } from '../statement/constDeclaration.js';
import { IfStatementBuilderDirector } from '../statement/ifStatementDirector.js';
import { SwitchStatementBuilderDirector } from '../statement/switchDirector.js';
import { ParameterBuilderDirector } from '../parameterDirector.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';

export class GraphQLControllerBuilderDirector {
  buildGraphQLControllerWithThisUseCaseExecute(
    identifier: string,
    options?: { await: boolean },
  ): GraphQLControllerNode {
    return this.controllerWithNoParams(identifier, 'query', 'RequestDTO', 'ResponseDTO', [
      new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result', options),
    ]);
  }

  buildControllerThatExecutesAndReturnsResult(
    identifier: string,
    options?: { await: boolean; dotValue: boolean },
  ): GraphQLControllerNode {
    return this.controllerWithNoParams(identifier, 'query', 'RequestDTO', 'ResponseDTO', [
      new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result', options),
      this.buildBasicIfTrueReturnStatement('ok', options?.dotValue ? 'result.value' : 'result'),
    ]);
  }

  buildControllerThatReturnsHelloWorld(identifier: string): GraphQLControllerNode {
    return this.controllerWithNoParams(identifier, 'query', 'RequestDTO', 'ResponseDTO', [
      new ReturnStatementBuilderDirector().buildReturn(
        new ExpressionBuilderDirector().buildStringLiteralExpression('Hello World'),
      ),
    ]);
  }

  buildControllerThatExecutesAndUsesResultTwice(
    identifier: string,
    options?: { await: boolean; dotValue: boolean },
  ): GraphQLControllerNode {
    const identifierVal = options?.dotValue ? 'result.value' : 'result';
    return this.controllerWithNoParams(identifier, 'query', 'RequestDTO', 'ResponseDTO', [
      new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result', options),
      this.buildBasicIfTrueReturnStatement('ok', identifierVal),
      this.buildBasicIfTrueReturnStatement('ok', identifierVal),
    ]);
  }

  buildControllerWithSwitchStatement(
    identifier: string,
    inputDTO: string,
    outputDTO: string,
  ): GraphQLControllerNode {
    // const identifierVal = 'result.value';
    return this.controllerWithParams(
      identifier,
      'mutation',
      inputDTO,
      outputDTO,
      [
        new ConstDeclarationBuilderDirector().buildConstDeclaration(
          'dto',
          new ExpressionBuilderDirector().buildMemberDotOutOfVariables('request', 'args'),
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
                      new ReturnStatementBuilderDirector().buildReturn(
                        this.buildThisMethodResponseResultMessage('clientError', 'result'),
                      ),
                    ])
                    .build(),
                },
              ],
              new StatementListNodeBuilder(null)
                .withStatements([
                  new ReturnStatementBuilderDirector().buildReturn(
                    this.buildThisMethodResponseResultMessage('error', 'result'),
                  ),
                ])

                .build(),
            ),
          ],
          [
            new ReturnStatementBuilderDirector().buildReturn(
              new ExpressionBuilderDirector().buildThisMethodCall(
                'ok',
                new ArgumentListDirector().buildArgumentListWithArgs([
                  new ArgumentDirector().buildArgument(
                    new ExpressionBuilderDirector().buildIdentifierExpression('result'),
                  ),
                ]),
              ),
            ),
          ],
        ),
      ],
      [new ParameterBuilderDirector().buildIdentifierParameter('useCase', 'HelloWorldUseCase')],
    );
  }

  private buildThisMethodResponseResultMessage(method: string, identifier: string): ExpressionNode {
    return new ExpressionBuilderDirector().buildThisMethodCall(
      method,
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentDirector().buildArgument(
          new ExpressionBuilderDirector().buildMemberDotOutOfVariables(identifier, 'message'),
        ),
      ]),
    );
  }

  private controllerWithParams(
    identifier: string,
    op: TGraphQLOperation,
    inputDTO: string,
    returnDTO: string,
    statements: StatementNode[],
    parameters: ParameterNode[],
  ): GraphQLControllerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new GraphQLControllerNodeBuilder(tree)
      .withIdentifier(new GraphQLControllerIdentifierNodeBuilder(null).withName(identifier).build())
      .withDependencies(new ParameterListNodeBuilder(null).withParameters(parameters).build())
      .withOperationType(new GraphQLOperationTypeNodeBuilder(null).withOperationType(op).build())
      .withInputType(new GraphQLInputTypeNodeBuilder(null).withInputType(inputDTO).build())
      .withExecuteNode(
        new GraphQLControllerExecuteNodeBuilder()
          .withDependencies(this.reqResExecuteDependencies())
          .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build())
          .withReturnType(returnDTO)
          .build(),
      )
      .build();
  }

  /**
   * You give it some statements, it builds you a controller.
   */
  private controllerWithNoParams(
    identifier: string,
    op: TGraphQLOperation,
    inputDTO: string,
    returnDTO: string,
    statements: StatementNode[],
  ): GraphQLControllerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new GraphQLControllerNodeBuilder(tree)
      .withIdentifier(new GraphQLControllerIdentifierNodeBuilder(null).withName(identifier).build())
      .withDependencies(new ParameterListNodeBuilder(null).withParameters([]).build())
      .withOperationType(new GraphQLOperationTypeNodeBuilder(null).withOperationType(op).build())
      .withInputType(new GraphQLInputTypeNodeBuilder(null).withInputType(inputDTO).build())
      .withExecuteNode(
        new GraphQLControllerExecuteNodeBuilder()
          .withDependencies(this.reqResExecuteDependencies())
          .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build())
          .withReturnType(returnDTO)
          .build(),
      )
      .build();
  }

  private reqResExecuteDependencies(): GraphQLControllerExecuteDependenciesNode {
    return new GraphQLExecuteDependenciesNodeBuilder(null).withDependency('request').build();
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
