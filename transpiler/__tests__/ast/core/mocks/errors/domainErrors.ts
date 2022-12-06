// import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { domainErrorErrors } from '../../../../../src/ast/core/BitloopsVisitor/helpers/domainErrorDeclaration.js';
import { TExpression, TIdentifier, TParameterDependencies } from '../../../../../src/types.js';
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
  parameters: TParameterDependencies;
};
type invalidMockType = {
  description: string;
  inputBLString: string;
  fileId: string;
  exception: Error;
};

export const validDomainErrors: validMockType[] = [
  {
    description: 'valid Domain Error with one arg',
    fileId: 'testFile.bl',
    inputBLString:
      "DomainError InvalidNameError (name : string) { message: `is an invalid ${ name }`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' }",
    identifier: new IdentifierBuilder().withName('InvalidNameError').build(),
    message: new ExpressionBuilderDirector().buildTemplateStringLiteralExpression(
      'is an invalid ${name}',
    ),
    errorId: new ExpressionBuilderDirector().buildStringLiteralExpression(
      'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',
    ),
    parameters: new ParameterListBuilderDirector().buildStringParams(...['name']),
  },
  {
    description: 'valid Domain Error with two args',
    fileId: 'testFile.bl',
    inputBLString:
      'DomainError InvalidNameError (name : string, errorId : string) { message: `is an invalid ${ name }`, errorId: `${errorId}`}',
    identifier: new IdentifierBuilder().withName('InvalidNameError').build(),
    message: new ExpressionBuilderDirector().buildTemplateStringLiteralExpression(
      'is an invalid ${name}',
    ),
    errorId: new ExpressionBuilderDirector().buildTemplateStringLiteralExpression('${errorId}'),
    parameters: new ParameterListBuilderDirector().buildStringParams(...['name', 'errorId']),
  },
];
export const invalidDomainErrors: invalidMockType[] = [
  {
    description: 'invalid Domain Error without fields',
    fileId: 'testFile.bl',
    inputBLString: 'DomainError InvalidNameError (name : string, errorId : string) {}',
    exception: TypeError(domainErrorErrors.INVALID_ARGS),
  },
  {
    description: 'invalid Domain Error without message',
    fileId: 'testFile.bl',
    inputBLString:
      'DomainError InvalidNameError (name : string, errorId : string) { errorId: `${errorId}`}',
    exception: TypeError(domainErrorErrors.NO_MESSAGE),
  },
  {
    description: 'invalid Domain Error without errorId',
    fileId: 'testFile.bl',
    inputBLString:
      'DomainError InvalidNameError (name : string, errorId : string) { message: `${errorId}`}',
    exception: TypeError(domainErrorErrors.NO_ERROR_ID),
  },
];
