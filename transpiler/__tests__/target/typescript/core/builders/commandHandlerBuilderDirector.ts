import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ExecuteNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ExecuteNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StatementNode } from '../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { ArgumentDirector } from './argument.js';
import { ArgumentListDirector } from '../../../../../src/ast/core/intermediate-ast/directors/argumentList.js';
import { EvaluationBuilderDirector } from './evaluation.js';
import { ExpressionBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from './parameterDirector.js';
import { ConstDeclarationBuilderDirector } from './statement/constDeclaration.js';
import { IfStatementBuilderDirector } from './statement/ifStatementDirector.js';
import { ReturnStatementBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/returnNodeBuilderDirector.js';
import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { CommandHandlerNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/command/CommandHandlerNodeBuilder.js';
import { CommandHandlerNode } from '../../../../../src/ast/core/intermediate-ast/nodes/command/CommandHandlerNode.js';

export class CommandHandlerBuilderDirector {
  buildCommand({
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
  }): CommandHandlerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const executeBuilder = new ExecuteNodeBuilder(null)
      .withReturnType(returnType)
      .withParameter(executeParameter)
      .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build());
    if (executeParameter) executeBuilder.withParameter(executeParameter);
    return new CommandHandlerNodeBuilder(tree)
      .withIdentifier(new IdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(parameters).build())
      .withExecute(executeBuilder.build())
      .build();
  }

  buildCommandWithTwoRepoCalls(
    identifier: string,
    options?: { await: boolean },
  ): CommandHandlerNode {
    return this.commandWithParams(
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

  buildCommandWithOneValueObjectEvaluation(
    identifier: string,
    options?: { dotValue: boolean },
  ): CommandHandlerNode {
    return this.commandWithParams(
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

  buildCommandWithTwoDomainEvaluations(
    identifier: string,
    options?: { dotValue: boolean },
  ): CommandHandlerNode {
    return this.commandWithParams(
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

  buildCommandEntityEvaluationAndRepoSaveOfTheEntity(
    identifier: string,
    options?: { await: boolean; dotValue: boolean },
  ): CommandHandlerNode {
    return this.commandWithParams(
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

  private commandWithParams(
    identifier: string,
    params: ParameterNode[],
    statements: StatementNode[],
  ): CommandHandlerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new CommandHandlerNodeBuilder(tree)
      .withIdentifier(new IdentifierNodeBuilder(null).withName(identifier).build())
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
