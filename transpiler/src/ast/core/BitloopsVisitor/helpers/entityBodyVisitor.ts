import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import {
  TEntityValues,
  TConstDeclarationValue,
  TDomainPublicMethod,
  TDomainPrivateMethod,
} from '../../../../types.js';

export const entityBodyVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EntityBodyContext,
): TEntityValues => {
  const domainConstructorDeclaration = thisVisitor.visit(ctx.domainConstructorDeclaration());
  const constantVars: TConstDeclarationValue[] = thisVisitor.visit(
    ctx.domainConstDeclarationList(),
  );
  const publicMethods: Record<string, TDomainPublicMethod> = thisVisitor.visit(
    ctx.publicMethodDeclarationList(),
  );
  const privateMethods: Record<string, TDomainPrivateMethod> = thisVisitor.visit(
    ctx.privateMethodDeclarationList(),
  );
  const methods = {
    ...publicMethods,
    ...privateMethods,
  };
  return {
    constantVars,
    create: domainConstructorDeclaration,
    methods,
  };
};
