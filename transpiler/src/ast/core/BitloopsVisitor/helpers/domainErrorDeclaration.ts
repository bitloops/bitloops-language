import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
// import { TDomainError } from '../../../../types.js';
import { DomainErrorBuilder } from '../../intermediate-ast/builders/Error/DomainErrorBuilder.js';
import { DomainErrorNode } from '../../intermediate-ast/nodes/Error/DomainErrorNode.js';
import { EvaluationFieldListNode } from '../../intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const domainErrorDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainErrorDeclarationContext,
): DomainErrorNode =>
  // {
  // DomainErrors: {
  //   [key: string]: TDomainError;
  // };
  // }
  {
    const errorName: string = ctx.domainErrorIdentifier().getText();
    // TEvaluationFields, TODO fix temp as any
    const parameters: ParameterListNode = thisVisitor.visit(ctx.parameterList());
    const fieldsList: EvaluationFieldListNode = thisVisitor.visit(ctx.evaluationFieldList());

    if (fieldsList.getFieldCount() != 2) {
      throw new TypeError('DomainErrorDeclaration must have two fields: ErrorId and message');
    }
    const errorId =
      fieldsList.findFieldWithName('errorId') ||
      ((): never => {
        throw new TypeError('DomainErrorDeclaration misses ErrorId field');
      })();
    const message =
      fieldsList.findFieldWithName('message') ||
      ((): never => {
        throw new TypeError('DomainErrorDeclaration misses message field');
      })();
    const domainError = new DomainErrorBuilder(thisVisitor.intermediateASTTree)
      .withName(errorName)
      .withErrorId(errorId)
      .withParameters(parameters)
      .withMessage(message)
      .build();
    return domainError;
  };
