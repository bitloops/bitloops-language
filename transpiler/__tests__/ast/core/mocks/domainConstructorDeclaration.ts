import { DomainCreateBuilder } from '../builders/DomainCreateBuilder.js';
import { ParameterBuilderDirector } from '../builders/ParameterBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../builders/returnOkErrorTypeBuilderDirector.js';
import { StatementListDirector } from '../builders/statement/statementListDirector.js';

export const validDomainConstructorDeclarationCases = [
  {
    description: 'domain constructor declaration with const declaration statement',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestCreateMethodDeclaration { constructor(props: string): (OK(NameVO), Errors(DomainErrors.InvalidName)) { const numOfTeachers = 3 } }',
    expected: new DomainCreateBuilder()
      .withStatements(
        new StatementListDirector().buildOneConstDeclarationWithIntLiteralExpression({
          name: 'numOfTeachers',
          intLiteral: 3,
        }),
      )
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
          'NameVO',
          'DomainErrors.InvalidName',
        ),
      )
      .withParameter(new ParameterBuilderDirector().buildPrimitiveParameter('props', 'string'))
      .build(),
  },
  {
    description: 'domain constructor declaration with ',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestCreateMethodDeclaration { constructor(props: NameProps): (OK(NameVO), Errors(DomainErrors.InvalidName)) { return regName.test( name ); } }',
    expected: new DomainCreateBuilder()
      .withStatements(
        new StatementListDirector().buildOneReturnStatementWithMethodCallExpression({
          identifierExpressionName: 'regName',
          methodName: 'test',
          argument: 'name',
        }),
      )
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
          'NameVO',
          'DomainErrors.InvalidName',
        ),
      )
      .withParameter(new ParameterBuilderDirector().buildIdentifierParameter('props', 'NameProps'))
      .build(),
  },
];
