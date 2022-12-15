import { DomainErrorBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Error/DomainErrorBuilder.js';
import { EvaluationFieldNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainErrorNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Error/DomainErrorNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
// import { DomainErrorBuilder } from '../../../../../ast/core/builders/domaiErrorBuilder.js';
// import { ExpressionBuilderDirector } from '../../../../../ast/core/builders/expressionDirector.js';
// import { ParameterListBuilderDirector } from '../../../../../ast/core/builders/parameterListBuilderDirector.js';

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
            new ExpressionBuilderDirector().buildStringLiteralExpression('djlfh679dn$5'),
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
          .withParameters([new ParameterBuilderDirector().buildIdentifierParameter('name', 'type')])
          .build(),
      )
      .build(),
    output: 'DomainErrors()',
  },
];
