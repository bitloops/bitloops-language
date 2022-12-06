import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { evaluationFieldListVisitor } from './evaluationFieldList.js';
import { parameterListVisitor } from './parameterList.js';

export const applicationErrorDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplicationErrorDeclarationContext,
): any => {
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
        parameters: parameterListVisitor(thisVisitor, ctx.parameterList()),
        errorId: { expression: errorId },
        message: { expression: message },
      },
    },
  };
};
