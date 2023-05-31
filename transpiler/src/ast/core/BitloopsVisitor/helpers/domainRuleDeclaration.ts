/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */

import { IsBrokenConditionNode } from './../../intermediate-ast/nodes/DomainRule/IsBrokenConditionNode.js';
import { StatementListNode } from './../../intermediate-ast/nodes/statements/StatementList.js';
import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { DomainRuleNodeBuilder } from '../../intermediate-ast/builders/DomainRule/DomainRuleNodeBuilder.js';
import { produceMetadata } from '../metadata.js';
import { DomainRuleIdentifierNode } from '../../intermediate-ast/nodes/DomainRule/DomainRuleIdentifierNode.js';
import { IsBrokenConditionNodeBuilder } from '../../intermediate-ast/builders/DomainRule/IsBrokenConditionNodeBuilder.js';
import { ConditionNodeBuilder } from '../../intermediate-ast/builders/statements/ifStatement/ConditionBuilder.js';
import { ExpressionNode } from '../../intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ErrorIdentifierNode } from '../../intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { ArgumentListNode } from '../../intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';

export const domainRuleDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainRuleDeclarationContext,
): void => {
  const ruleIdentifier: DomainRuleIdentifierNode = thisVisitor.visit(ctx.domainRuleIdentifier());
  const parameters = thisVisitor.visit(ctx.parameterList());
  const errorIdentifierNode: ErrorIdentifierNode = thisVisitor.visit(ctx.errorIdentifier());
  const { statementListNode, isBrokenConditionNode } = thisVisitor.visit(ctx.domainRuleBody());

  const metadata = produceMetadata(ctx, thisVisitor);

  new DomainRuleNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(ruleIdentifier)
    .withIsBrokenCondition(isBrokenConditionNode)
    .withParameters(parameters)
    .withErrorThrown(errorIdentifierNode)
    .withStatements(statementListNode)
    .build();
};

export const domainRuleBodyVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainRuleBodyContext,
): any => {
  const statementListNode: StatementListNode = thisVisitor.visit(ctx.functionBody());
  const isBrokenConditionNode: IsBrokenConditionNode = thisVisitor.visit(ctx.isBrokenStatement());
  return {
    statementListNode,
    isBrokenConditionNode,
  };
};

export const isBrokenConditionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IsBrokenStatementContext,
): IsBrokenConditionNode => {
  const expressionNode: ExpressionNode = thisVisitor.visit(ctx.expression());

  const conditionNode = new ConditionNodeBuilder(expressionNode.getMetadata())
    .withExpression(expressionNode)
    .build();

  const metadata = produceMetadata(ctx, thisVisitor);
  const isBrokenConditionNodeBuilder = new IsBrokenConditionNodeBuilder(metadata).withExpression(
    conditionNode,
  );

  if (ctx.isBrokenStatementErrorArgs()) {
    const argumentList: ArgumentListNode = thisVisitor.visit(ctx.isBrokenStatementErrorArgs());
    // const argumentList = thisVisitor.visit(ctx.methodArguments());
    isBrokenConditionNodeBuilder.withArgumentList(argumentList);
  }
  return isBrokenConditionNodeBuilder.build();
};
