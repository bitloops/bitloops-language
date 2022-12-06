import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { ReturnOkErrorTypeBuilder } from '../builders/returnOkErrorType.js';

export const validDomainConstructorDeclarationCases = [
  {
    description: 'return ok error type with primitive ok type and empty errors',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestCreateMethodDeclaration { constructor(props: string): (OK(NameVO), Errors(DomainErrors.InvalidName)) { return regName.test( name ); } }',
    expected: new ReturnOkErrorTypeBuilder()
      .withOk(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'))
      .withErrors([])
      .build(),
  },
];
