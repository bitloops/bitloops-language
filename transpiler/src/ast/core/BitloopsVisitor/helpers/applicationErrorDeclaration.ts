import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { ApplicationErrorBuilder } from '../../intermediate-ast/builders/Error/ApplicationErrorBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ApplicationErrorNode } from '../../intermediate-ast/nodes/Error/ApplicationError.js';
import { EvaluationFieldListNode } from '../../intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';
export enum applicationErrorErrors {
  INVALID_ARGS = 'ApplicationErrorDeclaration must have two fields: ErrorId and message',
  NO_MESSAGE = 'ApplicationErrorDeclaration misses ErrorId field',
  NO_ERROR_ID = 'ApplicationErrorDeclaration misses message field',
}
export const applicationErrorDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplicationErrorDeclarationContext,
): ApplicationErrorNode => {
  const errorName: string = ctx.applicationErrorIdentifier().getText();
  const identifier: IdentifierNode = new IdentifierNodeBuilder().withName(errorName).build();
  const metadata = produceMetadata(ctx, thisVisitor);
  // TEvaluationFields, TODO fix temp as any
  const parameters: ParameterListNode = thisVisitor.visit(ctx.parameterList());
  const fieldsList: EvaluationFieldListNode = ctx.evaluationFieldList()
    ? thisVisitor.visit(ctx.evaluationFieldList())
    : new EvaluationFieldListNodeBuilder().build();
  const errorId = fieldsList.findFieldWithName('errorId');
  const message = fieldsList.findFieldWithName('message');
  const applicationError = new ApplicationErrorBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(identifier)
    .withErrorId(errorId)
    .withParameters(parameters)
    .withMessage(message)
    .build();
  return applicationError;
};
