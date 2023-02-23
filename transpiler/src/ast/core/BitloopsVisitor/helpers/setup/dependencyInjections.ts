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
import { IdentifierNodeBuilder } from '../../../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { DependencyInjectionClassTypeBuilder } from '../../../intermediate-ast/builders/setup/dependency-injections/DependencyInjectionClassTypeBuilder.js';
import { DependencyInjectionNodeBuilder } from '../../../intermediate-ast/builders/setup/dependency-injections/DependencyInjectionNodeBuilder.js';
import { DependencyInjectionsNodeBuilder } from '../../../intermediate-ast/builders/setup/dependency-injections/DependencyInjectionsNodeBuilder.js';
import { DomainEventHandlerIdentifierNode } from '../../../intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerIdentifierNode.js';
import { IntegrationEventHandlerIdentifierNode } from '../../../intermediate-ast/nodes/integration-event/IntegrationEventHandlerIdentifierNode.js';
import { DependencyInjectionNode } from '../../../intermediate-ast/nodes/setup/dependency-injections/DependencyInjectionNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const dependencyInjectionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DependencyInjectionsContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const dependencyInjections: DependencyInjectionNode[] = thisVisitor.visit(
    ctx.dependencyInjectionList(),
  );

  new DependencyInjectionsNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withDependencyInjections(dependencyInjections)
    .build();
};

export const dependencyInjectionListVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DependencyInjectionListContext,
): DependencyInjectionNode[] => {
  const dependencyInjections = thisVisitor.visit(ctx.dependencyInjection(null));
  return dependencyInjections;
};

export const commandHandlerDependencyInjectionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CommandHandlerDependencyInjectionContext,
): DependencyInjectionNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const type = new DependencyInjectionClassTypeBuilder().withType('CommandHandler').build();
  const methodArguments = thisVisitor.visit(ctx.methodArguments());
  const identifier = thisVisitor.visit(ctx.commandHandlerIdentifier());
  return new DependencyInjectionNodeBuilder(metadata)
    .withType(type)
    .withIdentifier(identifier)
    .withArguments(methodArguments)
    .build();
};

export const queryHandlerDependencyInjectionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.QueryHandlerDependencyInjectionContext,
): DependencyInjectionNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const type = new DependencyInjectionClassTypeBuilder().withType('QueryHandler').build();
  const methodArguments = thisVisitor.visit(ctx.methodArguments());
  const identifier = thisVisitor.visit(ctx.queryHandlerIdentifier());
  return new DependencyInjectionNodeBuilder(metadata)
    .withType(type)
    .withIdentifier(identifier)
    .withArguments(methodArguments)
    .build();
};

export const domainEventHandlerDependencyInjectionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainEventHandlerDependencyInjectionContext,
): DependencyInjectionNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const type = new DependencyInjectionClassTypeBuilder().withType('EventHandler').build();
  const methodArguments = thisVisitor.visit(ctx.methodArguments());
  const domainEventIdentifier: DomainEventHandlerIdentifierNode = thisVisitor.visit(
    ctx.domainEventHandlerIdentifier(),
  );
  const identifier = new IdentifierNodeBuilder(domainEventIdentifier.getMetadata())
    .withName(domainEventIdentifier.getIdentifierName())
    .build();

  return new DependencyInjectionNodeBuilder(metadata)
    .withType(type)
    .withIdentifier(identifier)
    .withArguments(methodArguments)
    .build();
};

export const integrationEventHandlerDependencyInjectionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IntegrationEventHandlerDependencyInjectionContext,
): DependencyInjectionNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const type = new DependencyInjectionClassTypeBuilder()
    .withType('IntegrationEventHandler')
    .build();
  const methodArguments = thisVisitor.visit(ctx.methodArguments());
  const eventHandlerIdentifier: IntegrationEventHandlerIdentifierNode = thisVisitor.visit(
    ctx.integrationEventHandlerIdentifier(),
  );

  const identifier = new IdentifierNodeBuilder(eventHandlerIdentifier.getMetadata())
    .withName(eventHandlerIdentifier.getIdentifierName())
    .build();
  return new DependencyInjectionNodeBuilder(metadata)
    .withType(type)
    .withIdentifier(identifier)
    .withArguments(methodArguments)
    .build();
};
