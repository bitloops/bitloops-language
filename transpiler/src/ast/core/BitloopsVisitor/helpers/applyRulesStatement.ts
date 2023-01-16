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

import { AppliedRuleNode } from './../../intermediate-ast/nodes/statements/builtinFunction/AppliedRuleNode.js';
import { AppliedRuleNodeBuilder } from './../../intermediate-ast/builders/statements/builtInFunction/applyRules/AppliedRule.js';
import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';
import { ApplyRulesNodeBuilder } from '../../intermediate-ast/builders/statements/builtInFunction/applyRules/ApplyRules.js';
import { BuiltInFunctionNodeBuilder } from '../../intermediate-ast/builders/statements/builtInFunction/BuiltInFunction.js';
import { BuiltInFunctionNode } from '../../intermediate-ast/nodes/statements/builtinFunction/BuiltinFunctionNode.js';
import { ApplyRulesNode } from './../../intermediate-ast/nodes/statements/builtinFunction/ApplyRulesStatementNode.js';

export const applyRulesStatementVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplyRulesStatementContext,
): BuiltInFunctionNode => {
  const applyRulesNode: ApplyRulesNode = thisVisitor.visit(ctx.applyRuleStatementRulesList());
  const metadata = produceMetadata(ctx, thisVisitor);
  return new BuiltInFunctionNodeBuilder(metadata).withBuiltInFunction(applyRulesNode).build();
};

export const applyRuleStatementRulesListVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplyRuleStatementRulesListContext,
): ApplyRulesNode => {
  const children = thisVisitor.visitChildren(ctx);
  const appliedRules = children.filter((child) => child !== undefined);
  const metadata = produceMetadata(ctx, thisVisitor);
  return new ApplyRulesNodeBuilder(metadata).withAppliedRules(appliedRules).build();
};

export const appliedRuleVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ApplyRulesRuleContext,
): AppliedRuleNode => {
  const ruleIdentifierNode = thisVisitor.visit(ctx.domainRuleIdentifier());
  const argumentListNode = thisVisitor.visit(ctx.methodArguments());
  const metadata = produceMetadata(ctx, thisVisitor);
  return new AppliedRuleNodeBuilder(metadata)
    .withDomainRuleIdentifier(ruleIdentifierNode)
    .withArgumentListNode(argumentListNode)
    .build();
};
