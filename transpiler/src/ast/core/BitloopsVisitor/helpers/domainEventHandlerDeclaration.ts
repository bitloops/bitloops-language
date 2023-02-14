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
import { DomainEventHandlerDeclarationNodeBuilder } from '../../intermediate-ast/builders/DomainEventHandler/DomainEventHandlerDeclarationNodeBuilder.js';
import { DomainEventHandlerIdentifierNodeBuilder } from '../../intermediate-ast/builders/DomainEventHandler/DomainEventHandlerIdentifierNodeBuilder.js';
import { EventHandlerHandleMethodNodeBuilder } from '../../intermediate-ast/builders/HandleMethodNodeBuilder.js';
import { ParameterNodeBuilder } from '../../intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { EventHandleNode } from '../../intermediate-ast/nodes/EventHandleNode.js';
import { DomainEventHandlerIdentifierNode } from '../../intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerIdentifierNode.js';
import { ParameterIdentifierNode } from '../../intermediate-ast/nodes/ParameterList/ParameterIdentifierNode.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { ParameterNode } from '../../intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { StatementListNode } from '../../intermediate-ast/nodes/statements/StatementList.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';
import { BitloopsPrimaryTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';

export const domainEventHandlerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainEventHandlerDeclarationContext,
): void => {
  const domainEventName: DomainEventHandlerIdentifierNode = thisVisitor.visit(
    ctx.domainEventHandlerIdentifier(),
  );

  const parameterListNode: ParameterListNode = thisVisitor.visit(ctx.parameterList());
  const handleNode: EventHandleNode = thisVisitor.visit(ctx.domainEventHandlerHandleDeclaration());

  new DomainEventHandlerDeclarationNodeBuilder(
    thisVisitor.intermediateASTTree,
    produceMetadata(ctx, thisVisitor),
  )
    .withIdentifier(domainEventName)
    .withParameterList(parameterListNode)
    .withHandleMethod(handleNode)
    .build();
};

export const domainEventHandlerIdentifierVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainEventHandlerIdentifierContext,
): DomainEventHandlerIdentifierNode => {
  const domainEventName = ctx.DomainEventHandlerIdentifier().getText();
  return new DomainEventHandlerIdentifierNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withName(domainEventName)
    .build();
};

export const domainEventHandlerHandleMethodVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainEventHandlerHandleDeclarationContext,
): EventHandleNode => {
  const parameter = thisVisitor.visit(ctx.domainEventHandlerHandleParameter());
  const statementList: StatementListNode = thisVisitor.visit(ctx.functionBody());

  return new EventHandlerHandleMethodNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withParameter(parameter)
    .withStatementList(statementList)
    .build();
};

export const domainEventHandlerHandleMethodParameterVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainEventHandlerHandleParameterContext,
): ParameterNode => {
  const type: BitloopsPrimaryTypeNode = thisVisitor.visit(ctx.eventHandlerHandleIdentifier());

  const parameterIdentifier: ParameterIdentifierNode = thisVisitor.visit(ctx.parameterIdentifier());

  const metadata = produceMetadata(ctx, thisVisitor);
  return new ParameterNodeBuilder(metadata)
    .withIdentifier(parameterIdentifier)
    .withType(type)
    .build();
};
