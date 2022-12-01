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

import { ThenStatementsNodeBuilder } from './../../intermediate-ast/builders/statements/ifStatement/ThenStatements.js';
import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata, produceMetadataFromTo } from '../metadata.js';
import { IfStatementBuilder } from '../../intermediate-ast/builders/statements/ifStatement/IfStatementBuilder.js';
import { ElseStatementsNodeBuilder } from '../../intermediate-ast/builders/statements/ifStatement/ElseStatements.js';
import { IfStatementNode } from '../../intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';

export const ifStatementVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IfStatementContext,
): IfStatementNode => {
  const conditionNode = thisVisitor.visit(ctx.condition());
  const thenStatementsRes = thisVisitor.visit(ctx.statement(0));
  // TODO When statementListNode is implemented, provide a method to get just the statements nodes array
  // and remove below line (!and else TODO)
  const { statements: thenStatements } = thenStatementsRes;

  const firstThenStatement = thenStatements[0];
  const lastThenStatement = thenStatements[thenStatements.length - 1];
  const thenMetadata = produceMetadataFromTo(
    firstThenStatement.metadata,
    lastThenStatement.metadata,
  );
  const thenStatementsNode = new ThenStatementsNodeBuilder(thenMetadata)
    .withStatements(thenStatements)
    .build();

  const metadata = produceMetadata(ctx, thisVisitor);
  const ifStatementNode = new IfStatementBuilder(metadata)
    .withCondition(conditionNode)
    .withThenStatements(thenStatementsNode);

  if (ctx.statement(1)) {
    const elseStatementsRes = thisVisitor.visit(ctx.statement(1));
    const { statements: elseStatements } = elseStatementsRes;
    // TODO also here
    const elseFirstStatement = elseStatements[0];
    const elseLastStatement = elseStatements[elseStatements.length - 1];
    const elseMetadata = produceMetadataFromTo(
      elseFirstStatement.metadata,
      elseLastStatement.metadata,
    );
    const elseStatementsNode = new ElseStatementsNodeBuilder(elseMetadata)
      .withStatements(elseStatements)
      .build();
    ifStatementNode.withElseStatements(elseStatementsNode);
  }
  return ifStatementNode.build();
};
