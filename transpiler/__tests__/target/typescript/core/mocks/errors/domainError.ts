import { DomainErrorBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Error/DomainErrorBuilder.js';
import { EvaluationFieldNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainErrorNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Error/DomainErrorNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';

type TestCase = {
  description: string;
  domainError: DomainErrorNode;
  output: string;
};

const tree = new IntermediateASTTree(new IntermediateASTRootNode());

export const VALID_DOMAIN_ERROR_TEST_CASES: TestCase[] = [
  {
    description: 'Domain error with string template',
    domainError: new DomainErrorBuilder(tree, null)
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
    output:
      "import { Domain } from '@bitloops/bl-boilerplate-core'; \n export class InvalidNameError extends Domain.Error { constructor(name: string, kindOfError: string){ super('${name} is an invalid name', 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}",
  },
  {
    description: 'Domain error with string template',
    domainError: new DomainErrorBuilder(tree, null)
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
            new ExpressionBuilderDirector().buildStringLiteralExpression('Invalid name'),
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
    output:
      "import { Domain } from '@bitloops/bl-boilerplate-core'; \n export class InvalidNameError extends Domain.Error { constructor(name: string, kindOfError: string){ super('Invalid name', 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}",
  },
];
