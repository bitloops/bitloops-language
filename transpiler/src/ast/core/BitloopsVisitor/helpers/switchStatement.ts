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

import { DefaultSwitchCaseNodeBuilder } from './../../intermediate-ast/builders/statements/switchStatement/DefaultSwitchCaseBuilder.js';
import { SwitchRegularCaseNode } from './../../intermediate-ast/nodes/statements/SwitchStatement/SwitchCase.js';
import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { SwitchStatementBuilder } from '../../intermediate-ast/builders/statements/switchStatement/SwitchStatementBuilder.js';
import { SwitchCasesNode } from '../../intermediate-ast/nodes/statements/SwitchStatement/SwitchCases.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';
import { ConditionNode } from './../../intermediate-ast/nodes/statements/ifStatement/ConditionNode.js';
import { DefaultSwitchCaseNode } from './../../intermediate-ast/nodes/statements/SwitchStatement/DefaultSwitchCase.js';
import { SwitchStatementNode } from './../../intermediate-ast/nodes/statements/SwitchStatement/SwitchStatementNode.js';
import { SwitchRegularCaseBuilder } from '../../intermediate-ast/builders/statements/switchStatement/SwitchRegularCaseBuilder.js';
import { SwitchCasesBuilder } from '../../intermediate-ast/builders/statements/switchStatement/SwitchCasesBuilder.js';

export const switchStatementVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.SwitchStatementContext,
): SwitchStatementNode => {
  const conditionNode: ConditionNode = thisVisitor.visit(ctx.condition());
  const expression = conditionNode.expression;
  let cases: SwitchCasesNode;
  if (ctx.caseClauses()) {
    cases = thisVisitor.visit(ctx.caseClauses());
  } else {
    cases = new SwitchCasesNode();
  }
  const defaultCase: DefaultSwitchCaseNode = thisVisitor.visit(ctx.defaultClause());
  const metadata = produceMetadata(ctx, thisVisitor);
  const switchCaseNode = new SwitchStatementBuilder(metadata)
    .withCases(cases)
    .withDefaultCase(defaultCase)
    .withExpression(expression)
    .build();
  return switchCaseNode;
};

export const caseClausesVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CaseClausesContext,
): SwitchRegularCaseNode => {
  const caseCases = thisVisitor.visitChildren(ctx);
  const metadata = produceMetadata(ctx, thisVisitor);
  return new SwitchCasesBuilder(metadata).withRegularCases(caseCases).build();
};

export const caseClauseVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CaseClauseContext,
): SwitchRegularCaseNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const statementListNode = thisVisitor.visit(ctx.statementList());
  const expressionNode = thisVisitor.visit(ctx.expression());
  return new SwitchRegularCaseBuilder(metadata)
    .withExpression(expressionNode)
    .withStatements(statementListNode)
    .build();
};

export const defaultClauseVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DefaultClauseContext,
): DefaultSwitchCaseNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const statementListNode = thisVisitor.visit(ctx.statementList());
  return new DefaultSwitchCaseNodeBuilder(metadata).withStatements(statementListNode).build();
};
