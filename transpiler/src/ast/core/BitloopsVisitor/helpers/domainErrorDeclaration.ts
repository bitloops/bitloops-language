import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
// import { TDomainError } from '../../../../types.js';
import { DomainErrorBuilder } from '../../intermediate-ast/builders/Error/DomainErrorBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { IdentifierBuilder } from '../../intermediate-ast/builders/IdentifierBuilder.js';
import { DomainErrorNode } from '../../intermediate-ast/nodes/Error/DomainErrorNode.js';
import { EvaluationFieldListNode } from '../../intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/IdentifierNode.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export enum domainErrorErrors {
  INVALID_ARGS = 'DomainErrorDeclaration must have two fields: ErrorId and message',
  NO_MESSAGE = 'DomainErrorDeclaration misses ErrorId field',
  NO_ERROR_ID = 'DomainErrorDeclaration misses message field',
}
export const domainErrorDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainErrorDeclarationContext,
): DomainErrorNode => {
  const errorName: string = ctx.domainErrorIdentifier().getText();
  const identifier: IdentifierNode = new IdentifierBuilder().withName(errorName).build();
  // TEvaluationFields, TODO fix temp as any
  const parameters: ParameterListNode = thisVisitor.visit(ctx.parameterList());
  const fieldsList: EvaluationFieldListNode = ctx.evaluationFieldList()
    ? thisVisitor.visit(ctx.evaluationFieldList())
    : new EvaluationFieldListNodeBuilder().build();
  if (fieldsList.getFieldCount() > 2 || fieldsList.getFieldCount() === 0) {
    throw new TypeError(domainErrorErrors.INVALID_ARGS);
  }
  const errorId =
    fieldsList.findFieldWithName('errorId') ||
    ((): never => {
      throw new TypeError(domainErrorErrors.NO_ERROR_ID);
    })();
  const message =
    fieldsList.findFieldWithName('message') ||
    ((): never => {
      throw new TypeError(domainErrorErrors.NO_MESSAGE);
    })();
  const domainError = new DomainErrorBuilder(thisVisitor.intermediateASTTree)
    .withIdentifier(identifier)
    .withErrorId(errorId)
    .withParameters(parameters)
    .withMessage(message)
    .build();
  return domainError;
};
