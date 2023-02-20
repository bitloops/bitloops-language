import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ExecuteNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ExecuteNodeBuilder.js';
import { UseCaseIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/UseCase/UseCaseIdentifierNodeBuilder.js';
import { UseCaseNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/UseCase/UseCaseNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StatementNode } from '../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { UseCaseNode } from '../../../../../src/ast/core/intermediate-ast/nodes/UseCase/UseCaseNode.js';
import { ArgumentDirector } from './argument.js';
import { ArgumentListDirector } from './argumentList.js';
import { EvaluationBuilderDirector } from './evaluation.js';
import { ExpressionBuilderDirector } from './expression.js';
import { ParameterBuilderDirector } from './parameterDirector.js';
import { ConstDeclarationBuilderDirector } from './statement/constDeclaration.js';
import { IfStatementBuilderDirector } from './statement/ifStatementDirector.js';
import { ReturnStatementBuilderDirector } from './statement/returnDirector.js';
import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';

export class UseCaseBuilderDirector {
  buildUseCase({
    identifier,
    parameters,
    returnType,
    executeParameter,
    statements,
  }: {
    identifier: string;
    parameters: ParameterNode[];
    returnType: ReturnOkErrorTypeNode;
    executeParameter?: ParameterNode;
    statements: StatementNode[];
  }): UseCaseNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const executeBuilder = new ExecuteNodeBuilder(null)
      .withReturnType(returnType)
      .withParameter(executeParameter)
      .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build());
    if (executeParameter) executeBuilder.withParameter(executeParameter);
    return new UseCaseNodeBuilder(tree)
      .withIdentifier(new UseCaseIdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(parameters).build())
      .withExecute(executeBuilder.build())
      .build();
  }

  buildUseCaseWithTwoRepoCalls(identifier: string, options?: { await: boolean }): UseCaseNode {
    return this.useCaseWithParams(
      identifier,
      [new ParameterBuilderDirector().buildIdentifierParameter('todoRepo', 'ITodoRepo')],
      [
        new ExpressionBuilderDirector().buildThisDependencyMethodCall(
          'todoRepo',
          'getAll',
          new ArgumentListDirector().buildArgumentListWithArgs([]),
          options,
        ),
        new ExpressionBuilderDirector().buildThisDependencyMethodCall(
          'todoRepo',
          'save',
          new ArgumentListDirector().buildArgumentListWithArgs([]),
          options,
        ),
      ],
    );
  }

  buildUseCaseWithOneValueObjectEvaluation(
    identifier: string,
    options?: { dotValue: boolean },
  ): UseCaseNode {
    return this.useCaseWithParams(
      identifier,
      [],
      [
        new ConstDeclarationBuilderDirector().buildConstDeclaration(
          'price',
          new ExpressionBuilderDirector().buildEvaluationExpression(
            new EvaluationBuilderDirector().buildValueObjectEvaluation(
              'PriceVO',
              new ExpressionBuilderDirector().buildIdentifierExpression('priceProps'),
            ),
          ),
        ),
        new ReturnStatementBuilderDirector().buildReturn(
          new ExpressionBuilderDirector().buildIdentifierExpression(
            options?.dotValue ? 'price.value' : 'price',
          ),
        ),
      ],
    );
  }

  buildUseCaseWithTwoDomainEvaluations(
    identifier: string,
    options?: { dotValue: boolean },
  ): UseCaseNode {
    return this.useCaseWithParams(
      identifier,
      [],
      [
        new ConstDeclarationBuilderDirector().buildValueObjectConstDeclaration(
          'price',
          'PriceVO',
          'priceProps',
        ),
        new ConstDeclarationBuilderDirector().buildEntityEvaluationConstDeclaration({
          identifier: 'todo',
          entityIdentifier: 'Todo',
          evaluationFields: [],
        }),
        new IfStatementBuilderDirector().buildIfTrueReturnExpression(
          new ExpressionBuilderDirector().buildIdentifierExpression(
            options?.dotValue ? 'todo.value' : 'todo',
          ),
        ),
        new ReturnStatementBuilderDirector().buildReturn(
          new ExpressionBuilderDirector().buildIdentifierExpression(
            options?.dotValue ? 'price.value' : 'price',
          ),
        ),
      ],
    );
  }

  buildUseCaseEntityEvaluationAndRepoSaveOfTheEntity(
    identifier: string,
    options?: { await: boolean; dotValue: boolean },
  ): UseCaseNode {
    return this.useCaseWithParams(
      identifier,
      [new ParameterBuilderDirector().buildIdentifierParameter('todoRepo', 'ITodoRepo')],
      [
        new ConstDeclarationBuilderDirector().buildEntityEvaluationConstDeclaration({
          identifier: 'todo',
          entityIdentifier: 'Todo',
          evaluationFields: [],
        }),
        new ExpressionBuilderDirector().buildThisDependencyMethodCall(
          'todoRepo',
          'save',
          new ArgumentListDirector().buildArgumentListWithArgs([
            new ArgumentDirector().buildArgument(
              new ExpressionBuilderDirector().buildIdentifierExpression(
                options?.dotValue ? 'todo.value' : 'todo',
              ),
            ),
          ]),
          options,
        ),
        new ReturnStatementBuilderDirector().buildReturn(
          new ExpressionBuilderDirector().buildIdentifierExpression(
            options?.dotValue ? 'todo.value' : 'todo',
          ),
        ),
      ],
    );
  }

  private useCaseWithParams(
    identifier: string,
    params: ParameterNode[],
    statements: StatementNode[],
  ): UseCaseNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new UseCaseNodeBuilder(tree)
      .withIdentifier(new UseCaseIdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(params).build())
      .withExecute(
        new ExecuteNodeBuilder(null)
          .withReturnType(
            new ReturnOkErrorTypeNodeBuilder()
              .withOk(
                new ReturnOkTypeNodeBuilder()
                  .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('void'))
                  .build(),
              )
              .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
              .build(),
          )
          .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build())
          .build(),
      )
      .build();
  }
}
