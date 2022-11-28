import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { TApplicationError } from '../../../../types.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { evaluationFieldListVisitor } from './evaluationFieldList.js';
import { formalParameterListVisitor } from './formalParameterList.js';

export const applicationErrorDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplicationErrorDeclarationContext,
): {
  ApplicationErrors: {
    [key: string]: TApplicationError;
  };
} => {
  const errorName: string = ctx.applicationErrorIdentifier().getText();
  // TEvaluationFields
  const fieldsList = evaluationFieldListVisitor(thisVisitor, ctx.evaluationFieldList()) as any;
  if (fieldsList.length != 2) {
    throw new TypeError('DomainErrorDeclaration must have two fields: ErrorId and message');
  }
  const errorId =
    fieldsList.find((field) => field.name === 'errorId').expression ||
    ((): never => {
      throw new TypeError('DomainErrorDeclaration misses ErrorId field');
    })();
  const message =
    fieldsList.find((field) => field.name === 'message').expression ||
    ((): never => {
      throw new TypeError('DomainErrorDeclaration misses message field');
    })();
  return {
    ApplicationErrors: {
      [errorName]: {
        parameters: formalParameterListVisitor(thisVisitor, ctx.formalParameterList()),
        errorId: { expression: errorId },
        message: { expression: message },
      },
    },
  };
};
