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
import { DomainEventDeclarationNodeBuilder } from '../../intermediate-ast/builders/DomainEvent/DomainEventDeclarationNodeBuilder.js';
import { DomainEventIdentifierNodeBuilder } from '../../intermediate-ast/builders/DomainEvent/DomainEventIdentifierNodeBuilder.js';
import { DomainEventIdentifierNode } from '../../intermediate-ast/nodes/DomainEvent/DomainEventIdentifierNode.js';
import { FieldListNode } from '../../intermediate-ast/nodes/FieldList/FieldListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

export const domainEventDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainEventDeclarationContext,
): void => {
  const domainEventName: DomainEventIdentifierNode = thisVisitor.visit(ctx.domainEventIdentifier());

  const entityIdentifier = thisVisitor.visit(ctx.entityIdentifier());
  let fieldListNode: FieldListNode;
  if (ctx.fieldList()) {
    fieldListNode = thisVisitor.visit(ctx.fieldList());
  }

  const domainEvent = new DomainEventDeclarationNodeBuilder(
    thisVisitor.intermediateASTTree,
    produceMetadata(ctx, thisVisitor),
  )
    .withIdentifier(domainEventName)
    .withEntityIdentifier(entityIdentifier)
    .withContextInfo(thisVisitor.contextInfo);

  if (fieldListNode) {
    domainEvent.withFieldList(fieldListNode);
  }

  domainEvent.build();
};

export const domainEventIdentifierVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainEventIdentifierContext,
): DomainEventIdentifierNode => {
  const domainEventName = ctx.DomainEventIdentifier().getText();
  return new DomainEventIdentifierNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withName(domainEventName)
    .build();
};
