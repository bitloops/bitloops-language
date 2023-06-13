import { ExpressionBuilder } from '../../../../../../../src/ast/core/intermediate-ast/builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../../../../../../../src/ast/core/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ForOfStatementNode } from '../../../../../../../src/ast/core/intermediate-ast/nodes/statements/ForOfStatementNode.js';
import { FileUtil } from '../../../../../../../src/utils/file.js';
import { EvaluationFieldBuilderDirector } from '../../../builders/evaluationFIeld.js';
import { ConstDeclarationBuilderDirector } from '../../../builders/statement/constDeclaration.js';
import { ForOfStatementBuilderDirector } from '../../../builders/statement/forOfStatementBuilderDirector.js';
import { StatementBuilderDirector } from '../../../builders/statement/statementDirector.js';

type TestCase = {
  description: string;
  forOfStatement: ForOfStatementNode;
  output: string;
};

export const FOR_OF_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'test simple for of statement',
    forOfStatement: new ForOfStatementBuilderDirector().buildForOfStatement(
      new ExpressionBuilder()
        .withExpression(new IdentifierExpressionBuilder().withValue('elements').build())
        .build(),
      new StatementListNodeBuilder(null)
        .withStatements([
          new StatementBuilderDirector().buildReturnStatement(
            new ExpressionBuilder()
              .withExpression(new IdentifierExpressionBuilder().withValue('element').build())
              .build(),
          ),
        ])
        .build(),
      new IdentifierNodeBuilder(null).withName('element').build(),
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/statements/for-of/forOfStatement.mock.ts',
    ),
  },
];
