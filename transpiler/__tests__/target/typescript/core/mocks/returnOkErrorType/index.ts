import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';

export const VALID_RETURN_OK_ERROR_TYPE_TEST_CASES = [
  {
    description: 'Return ok error with bitloops identifier',
    returnOkErrorType:
      new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypeBitloopsIdentifier('Name', [
        'DomainErrors.InvalidName',
      ]),
    output: 'Either<Name, DomainErrors.InvalidName>;',
  },
  {
    description: 'Return ok error with multiple errors',
    returnOkErrorType:
      new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypeBitloopsIdentifier('NameVO', [
        'DomainErrors.InvalidName',
        'Unexpected',
      ]),
    output: 'Either<NameVO, DomainErrors.InvalidName | Unexpected>',
  },
  {
    description: 'Return ok error with primary type',
    returnOkErrorType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypePrimitiveType(
      'void',
      ['DomainErrors.EmailAlreadyExistsError', 'DomainErrors.UsernameTakenError'],
    ),
    output: 'Either<void, DomainErrors.EmailAlreadyExistsError | DomainErrors.UsernameTakenError>',
  },
  {
    description: 'Return ok identifier with no error',
    returnOkErrorType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifier(
      'Name',
    ),
    output: 'Either<Name, never>',
  },
  {
    description: 'Return ok primitive with no error',
    returnOkErrorType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypePrimitiveType(
      'void',
    ),
    output: 'Either<void, never>',
  },
  {
    description: 'Return ok built in class with no error',
    returnOkErrorType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBuiltInClass(
      'UUIDv4',
    ),
    output: 'Either<Domain.UUIDv4, never>',
  },
];
