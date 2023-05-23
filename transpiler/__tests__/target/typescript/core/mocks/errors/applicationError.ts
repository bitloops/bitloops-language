import { ApplicationErrorBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Error/ApplicationErrorBuilder.js';
import { EvaluationFieldNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ApplicationErrorNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Error/ApplicationError.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';

type TestCase = {
  description: string;
  applicationError: ApplicationErrorNode;
  output: string;
};

const tree = new IntermediateASTTree(new IntermediateASTRootNode());

export const VALID_APPLICATION_ERROR_TEST_CASES: TestCase[] = [
  {
    description: 'Application error with string template',
    applicationError: new ApplicationErrorBuilder(tree, null)
      .withIdentifier(new IdentifierNodeBuilder().withName('InvalidNameError').build())
      .withErrorId(
        new EvaluationFieldNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('errorId').build())
          .withExpression(
            new ExpressionBuilderDirector().buildStringLiteralExpression(
              'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',
            ),
          )
          .build(),
      )
      .withMessage(
        new EvaluationFieldNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('name').build())
          .withExpression(
            new ExpressionBuilderDirector().buildStringLiteralExpression(
              '${name} is an invalid name',
            ),
          )
          .build(),
      )
      .withParameters(
        new ParameterListNodeBuilder(null)
          .withParameters([
            new ParameterBuilderDirector().buildIdentifierParameter('name', 'string'),
            new ParameterBuilderDirector().buildIdentifierParameter('kindOfError', 'string'),
          ])
          .build(),
      )
      .build(),
    output: `import { Application } from '@bitloops/bl-boilerplate-core';
      export class InvalidNameError extends Application.Error { 
        static readonly errorId:string = 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe';
        constructor(name: string, kindOfError: string){ 
          super('\${name} is an invalid name', InvalidNameError.errorId);
        }
      }`,
  },
];
