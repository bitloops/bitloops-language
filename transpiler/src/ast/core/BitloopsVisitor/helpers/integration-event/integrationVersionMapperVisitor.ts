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

import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { IntegrationVersionMapperNodeBuilder } from '../../../intermediate-ast/builders/integration-event/IntegrationVersionMapperNodeBuilder.js';
import { StringLiteralNode } from '../../../intermediate-ast/nodes/Expression/Literal/StringLiteralNode.js';
import { IntegrationVersionMapperNode } from '../../../intermediate-ast/nodes/integration-event/IntegrationVersionMapperNode.js';
import { StatementListNode } from '../../../intermediate-ast/nodes/statements/StatementList.js';
import { StructIdentifierNode } from '../../../intermediate-ast/nodes/struct/StructIdentifierNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const integrationVersionMapperVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IntegrationVersionMapperContext,
): IntegrationVersionMapperNode => {
  const versionName: StringLiteralNode = thisVisitor.visit(ctx.versionName());

  const integrationReturnSchemaType: StructIdentifierNode = thisVisitor.visit(
    ctx.integrationReturnSchemaType(),
  );

  const statements: StatementListNode = thisVisitor.visit(ctx.statementList());

  const metadata = produceMetadata(ctx, thisVisitor);
  return new IntegrationVersionMapperNodeBuilder(metadata)
    .withVersionName(versionName)
    .withReturnSchemaType(integrationReturnSchemaType)
    .withStatements(statements)
    .build();
};
