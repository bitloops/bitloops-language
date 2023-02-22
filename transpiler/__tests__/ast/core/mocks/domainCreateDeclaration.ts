import { DomainCreateBuilder } from '../builders/DomainCreateBuilder.js';
import { ReturnOkErrorTypeBuilderDirector } from '../builders/returnOkErrorTypeBuilderDirector.js';
import { StatementListDirector } from '../builders/statement/statementListDirector.js';

export const validDomainCreateDeclarationCases = [
  {
    description: 'domain create declaration with const declaration statement',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestCreateMethodDeclaration { static create(props: StringProps): (OK(NameVO), Errors(DomainErrors.InvalidName)) { const numOfTeachers = 3 } }',
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
      .withParameter('props', 'StringProps')
      .build(),
  },
  {
    description: 'domain create declaration with ',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestCreateMethodDeclaration { static create(props: NameProps): (OK(NameVO), Errors(DomainErrors.InvalidName)) { return regName.test( name ); } }',
    expected: new DomainCreateBuilder()
      .withStatements(
        new StatementListDirector().buildOneReturnOKStatementWithMethodCallExpression({
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
      .withParameter('props', 'NameProps')
      .build(),
  },
];
