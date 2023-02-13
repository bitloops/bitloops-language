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
import { IntegrationEventNodeBuilder } from '../../../intermediate-ast/builders/integration-event/IntegrationEventNodeBuilder.js';
import { IntegrationEventIdentifierNode } from '../../../intermediate-ast/nodes/integration-event/IntegrationEventIdentifierNode.js';
import { IntegrationEventInputNode } from '../../../intermediate-ast/nodes/integration-event/IntegrationEventInputNode.js';
import { IntegrationVersionMapperListNode } from '../../../intermediate-ast/nodes/integration-event/IntegrationVersionMapperListNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const integrationEventDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IntegrationEventDeclarationContext,
): void => {
  const integrationEventIdentifierNode: IntegrationEventIdentifierNode = thisVisitor.visit(
    ctx.integrationEventIdentifier(),
  );

  const integrationEventInputNode: IntegrationEventInputNode = thisVisitor.visit(
    ctx.integrationEventInput(),
  );

  const integrationVersionMapperListNode: IntegrationVersionMapperListNode = thisVisitor.visit(
    ctx.integrationVersionMapperList(),
  );

  const metadata = produceMetadata(ctx, thisVisitor);
  new IntegrationEventNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withInput(integrationEventInputNode)
    .withIdentifier(integrationEventIdentifierNode)
    .withVersionMappers(integrationVersionMapperListNode)
    .build();
};
