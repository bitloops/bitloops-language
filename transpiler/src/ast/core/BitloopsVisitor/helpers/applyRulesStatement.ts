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
import { TArgumentDependencies, TBuildInFunction } from '../../../../types.js';

export const applyRulesStatementVisitor = (
  _thisVisitor: BitloopsVisitor,
  _ctx: BitloopsParser.ApplyRulesStatementContext,
): TBuildInFunction => {
  const result = _thisVisitor.visit(_ctx.applyRuleStatementRulesList());
  return {
    buildInFunction: {
      applyRules: result,
    },
  };
};

export const applyRuleStatementRulesListVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplyRuleStatementRulesListContext,
): {
  name: string;
  arguments: TArgumentDependencies;
}[] => {
  const children = thisVisitor.visitChildren(ctx);
  const result = children.filter((child) => child !== undefined);
  return result;
};

export const applyRulesRuleVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplyRulesRuleContext,
): {
  name: string;
  arguments: TArgumentDependencies;
} => {
  const ruleIdentifier = thisVisitor.visit(ctx.domainRuleIdentifier());
  const argumentsRes = thisVisitor.visit(ctx.arguments)[1];
  return {
    name: ruleIdentifier,
    arguments: argumentsRes,
  };
};
