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

import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { TSwitchStatement, TRegularCase, TDefaultCase } from '../../../../types.js';

export const switchStatementVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.SwitchStatementContext,
): TSwitchStatement => {
  const expressionObject = thisVisitor.visit(ctx.condition());
  const caseObject = thisVisitor.visit(ctx.caseBlock());
  return {
    switchStatement: {
      expression: expressionObject.condition.expression,
      cases: caseObject.cases,
      defaultCase: caseObject.defaultCase,
    },
  };
};

export const caseBlockVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CaseBlockContext,
): {
  cases: TRegularCase[];
  defaultCase: TDefaultCase;
} => {
  const caseClauses = thisVisitor.visit(ctx.caseClauses(0));
  if (ctx.caseClauses(1)) {
    caseClauses.push(thisVisitor.visit(ctx.caseClauses(1)));
  }
  const defaultClause = thisVisitor.visit(ctx.defaultClause());
  return {
    cases: caseClauses,
    defaultCase: defaultClause,
  };
};

export const caseClauseVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CaseClauseContext,
): TRegularCase => {
  const caseValue = thisVisitor.visit(ctx.expression());
  const caseStatement = thisVisitor.visit(ctx.statementList());
  return {
    ...caseStatement,
    caseValue: caseValue.expression,
  };
};

export const defaultClauseVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DefaultClauseContext,
): TDefaultCase => {
  const defaultStatement = thisVisitor.visit(ctx.statementList());
  return defaultStatement;
};
