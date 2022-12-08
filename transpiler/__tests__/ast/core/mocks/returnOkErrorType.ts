import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { ReturnOkErrorTypeBuilder } from '../builders/returnOkErrorType.js';

export const validReturnOkErrorTypeCases = [
  {
    description: 'return ok error type with primitive ok type and empty errors',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestReturnOkErrorType { (OK(string), Errors()) }',
    expected: new ReturnOkErrorTypeBuilder()
      .withOk(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'))
      .withErrors([])
      .build(),
  },
  {
    description: 'return ok error type with bitloops identifier ok type and domain errors',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestReturnOkErrorType { (OK(TodoEntity), Errors(DomainErrors.InvalidName)) }',
    expected: new ReturnOkErrorTypeBuilder()
      .withOk(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TodoEntity'))
      .withErrors([{ error: 'DomainErrors.InvalidName' }])
      .build(),
  },
  {
    description: 'return ok error type with bitloops identifier ok type and multiple domain errors',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestReturnOkErrorType { (OK(TodoEntity), Errors(DomainErrors.InvalidName | DomainErrors.NameTaken)) }',
    expected: new ReturnOkErrorTypeBuilder()
      .withOk(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TodoEntity'))
      .withErrors([{ error: 'DomainErrors.InvalidName' }, { error: 'DomainErrors.NameTaken' }])
      .build(),
  },
  {
    description: 'return ok error type with void ok type and empty errors',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestReturnOkErrorType { (OK(void), Errors()) }',
    expected: new ReturnOkErrorTypeBuilder()
      .withOk(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('void'))
      .withErrors([])
      .build(),
  },
  {
    description: 'return ok error type with read model ok type and application errors',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestReturnOkErrorType { (OK(TodoReadModel), Errors(ApplicationErrors.ToDoNotFoundError)) }',
    expected: new ReturnOkErrorTypeBuilder()
      .withOk(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TodoReadModel'))
      .withErrors([{ error: 'ApplicationErrors.ToDoNotFoundError' }])
      .build(),
  },
  {
    description: 'return ok error type with read model array ok type and application errors',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestReturnOkErrorType { (OK(TodoReadModel[]), Errors(ApplicationErrors.ToDoNotFoundError)) }',
    expected: new ReturnOkErrorTypeBuilder()
      .withOk(new BitloopsPrimaryTypeDirector().buildArrayIdentifierPrimaryType('TodoReadModel'))
      .withErrors([{ error: 'ApplicationErrors.ToDoNotFoundError' }])
      .build(),
  },
];
