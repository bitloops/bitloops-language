import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { TDomainError, TEvaluationFields } from '../../../../types.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { evaluationFieldListVisitor } from './evaluationFieldList.js';
import { formalParameterListVisitor } from './formalParameterList.js';

export const domainErrorDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainErrorDeclarationContext,
): {
  DomainErrors: {
    [key: string]: TDomainError;
  };
} => {
  const errorName: string = ctx.domainErrorIdentifier().getText();
  const fieldsList: TEvaluationFields = evaluationFieldListVisitor(
    thisVisitor,
    ctx.evaluationFieldList(),
  );
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
    DomainErrors: {
      [errorName]: {
        parameters: formalParameterListVisitor(thisVisitor, ctx.formalParameterList()),
        errorId: { expression: errorId },
        message: { expression: message },
      },
    },
  };
};
