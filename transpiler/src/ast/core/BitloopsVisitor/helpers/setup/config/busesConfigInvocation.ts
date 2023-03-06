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

import BitloopsParser from '../../../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../../../BitloopsVisitor.js';
import { produceMetadata } from '../../../metadata.js';
import { ConfigCommandBusNodeBuilder } from '../../../../intermediate-ast/builders/setup/config/ConfigCommandBusNodeBuilder.js';
import { ConfigEventBusNode } from '../../../../intermediate-ast/nodes/setup/config/ConfigEventBusNode.js';
import { ConfigEventBusNodeBuilder } from '../../../../intermediate-ast/builders/setup/config/ConfigEventBusNodeBuilder.js';
import { ConfigIntegrationEventBusNodeBuilder } from '../../../../intermediate-ast/builders/setup/config/ConfigIntegrationEventBusNodeBuilder.js';
import { ConfigQueryBusNodeBuilder } from '../../../../intermediate-ast/builders/setup/config/ConfigQueryBusNodeBuilder.js';
import { ConfigCommandBusNode } from '../../../../intermediate-ast/nodes/setup/config/ConfigCommandBusNode.js';
import { ConfigQueryBusNode } from '../../../../intermediate-ast/nodes/setup/config/ConfigQueryBusNode.js';
import { ConfigIntegrationEventBusNode } from '../../../../intermediate-ast/nodes/setup/config/ConfigIntegrationEventBusNode.js';
import { ConfigBusesInvocationNodeBuilder } from '../../../../intermediate-ast/builders/setup/config/ConfigBusesInvocationNodeBuilder.js';
import { TBusType } from '../../../../../../types.js';

const BusIdentifiers = {
  CommandBus: 'COMMAND_BUS',
  EventBus: 'EVENT_BUS',
  IntegrationEventBus: 'INTEGRATION_EVENT_BUS',
  QueryBus: 'QUERY_BUS',
};

const BusTypesMapper: Record<string, TBusType> = {
  External: 'External',
  InProcess: 'InProcess',
};

type BusNode =
  | ConfigCommandBusNode
  | ConfigQueryBusNode
  | ConfigIntegrationEventBusNode
  | ConfigEventBusNode;

export const busesConfigInvocationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.SetBusesConfigContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const builder = new ConfigBusesInvocationNodeBuilder(thisVisitor.intermediateASTTree, metadata);
  const busNodes = thisVisitor.visit(ctx.busesConfig());

  for (const busNode of busNodes) {
    if (busNode instanceof ConfigCommandBusNode) {
      builder.withCommandBus(busNode);
      continue;
    }
    if (busNode instanceof ConfigEventBusNode) {
      builder.withEventBus(busNode);
      continue;
    }
    if (busNode instanceof ConfigIntegrationEventBusNode) {
      builder.withIntegrationEventBus(busNode);
      continue;
    }
    if (busNode instanceof ConfigQueryBusNode) {
      builder.withQueryBus(busNode);
      continue;
    }
    throw new Error(`Bus type ${busNode.type} is not supported`);
  }

  builder.build();
};

export const busesConfigVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BusesConfigContext,
): BusNode[] => {
  const buses = thisVisitor.visit(ctx.busConfig(null));
  return buses;
};

export const busConfigVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BusConfigContext,
): BusNode => {
  const busIdentifier = ctx.busIdentifier().getText();
  const rawBusType: string = ctx.busType().getText();
  const busType = BusTypesMapper[rawBusType];

  if (!busType) {
    throw new Error(`Bus type ${rawBusType} is not supported`);
  }
  const metadata = produceMetadata(ctx, thisVisitor);

  switch (busIdentifier) {
    case BusIdentifiers.CommandBus:
      return new ConfigCommandBusNodeBuilder(metadata).withBusType(busType).build();
    case BusIdentifiers.EventBus:
      return new ConfigEventBusNodeBuilder(metadata).withBusType(busType).build();
    case BusIdentifiers.IntegrationEventBus:
      return new ConfigIntegrationEventBusNodeBuilder(metadata).withBusType(busType).build();
    case BusIdentifiers.QueryBus:
      return new ConfigQueryBusNodeBuilder(metadata).withBusType(busType).build();
    default:
      throw new Error(`Bus ${busIdentifier} is not supported`);
  }
};
