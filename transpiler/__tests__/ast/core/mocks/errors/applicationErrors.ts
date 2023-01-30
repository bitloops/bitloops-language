import { applicationErrorErrors } from '../../../../../src/ast/core/BitloopsVisitor/helpers/applicationErrorDeclaration.js';
import { TExpression, TIdentifier, TParameterList } from '../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { IdentifierBuilder } from '../../builders/identifier.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';

type validMockType = {
  description: string;
  inputBLString: string;
  fileId: string;
  identifier: TIdentifier;
  message: TExpression;
  errorId: TExpression;
  parameters: TParameterList;
};
type invalidMockType = {
  description: string;
  inputBLString: string;
  fileId: string;
  exception: Error;
};

export const validApplicationErrors: validMockType[] = [
  {
    description: 'valid Application Error with one arg',
    fileId: 'testFile.bl',
    inputBLString:
      "ApplicationError InvalidNameError (name : string) { message: `is an invalid ${ name }`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' }",
    identifier: new IdentifierBuilder().withName('InvalidNameError').build(),
    message: new ExpressionBuilderDirector().buildTemplateStringLiteralExpression(
      'is an invalid ${name}',
    ),
    errorId: new ExpressionBuilderDirector().buildStringLiteralExpression(
      'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',
    ),
    parameters: new ParameterListBuilderDirector().buildStringParams('name'),
  },
  {
    description: 'valid Application Error with two args',
    fileId: 'testFile.bl',
    inputBLString:
      'ApplicationError InvalidNameError (name : string, errorId : string) { message: `is an invalid ${ name }`, errorId: `${errorId}`}',
    identifier: new IdentifierBuilder().withName('InvalidNameError').build(),
    message: new ExpressionBuilderDirector().buildTemplateStringLiteralExpression(
      'is an invalid ${name}',
    ),
    errorId: new ExpressionBuilderDirector().buildTemplateStringLiteralExpression('${errorId}'),
    parameters: new ParameterListBuilderDirector().buildStringParams('name', 'errorId'),
  },
];
export const invalidApplicationErrors: invalidMockType[] = [
  {
    description: 'invalid Application Error without fields',
    fileId: 'testFile.bl',
    inputBLString: 'ApplicationError InvalidNameError (name : string, errorId : string) {}',
    exception: TypeError(applicationErrorErrors.INVALID_ARGS),
  },
  {
    description: 'invalid Application Error without message',
    fileId: 'testFile.bl',
    inputBLString:
      'ApplicationError InvalidNameError (name : string, errorId : string) { errorId: `${errorId}`}',
    exception: TypeError(applicationErrorErrors.NO_MESSAGE),
  },
  {
    description: 'invalid Application Error without errorId',
    fileId: 'testFile.bl',
    inputBLString:
      'ApplicationError InvalidNameError (name : string, errorId : string) { message: `${errorId}`}',
    exception: TypeError(applicationErrorErrors.NO_ERROR_ID),
  },
];
