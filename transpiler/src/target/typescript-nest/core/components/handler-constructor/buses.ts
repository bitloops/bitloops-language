/**
 *  Bitloops Language
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
import {
  TDependencyChildTypescript,
  TEventHandlerBusDependencies,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { getChildDependencies } from '../../dependencies.js';
import { INJECT_TOKEN_NEST_DEPENDENCY, getTokenName } from '../token-injections/index.js';

const INFRA_DEPENDENCY: TDependencyChildTypescript = {
  type: 'absolute',
  default: false,
  value: 'Infra',
  from: '@bitloops/bl-boilerplate-core',
};
export const BUSES_TOKENS = {
  commandBus: 'StreamingCommandBus',
  queryBus: 'PubSubQueryBus',
  integrationEventBus: 'StreamingIntegrationEventBus',
  domainEventBus: 'StreamingDomainEventBus',
  pubSubIntegrationEventBus: 'PubSubIntegrationEventBus',
  // add support for pubsub integration events perhaps(for real-time updates)
};

const BUSES_TYPES = {
  pubSubCommandBus: 'Infra.CommandBus.IPubSubCommandBus',
  streamCommandBus: 'Infra.CommandBus.IStreamCommandBus',
  queryBus: 'Infra.QueryBus.IQueryBus',
  domainEventBus: 'Infra.EventBus.IEventBus',
  integrationEventBus: 'Infra.EventBus.IEventBus',
  pubSubIntegrationEventBus: 'Infra.EventBus.IEventBus',
};

export const getDefaultBusConstructorStatements = (
  busDependencies: TEventHandlerBusDependencies,
): TTargetDependenciesTypeScript => {
  const { commandBus, queryBus, integrationEventBus, pubSubIntegrationEventBus } =
    busDependencies.eventHandlerBusDependencies;
  const dependencies = [];
  let res = '';
  if (commandBus) {
    const token = getTokenName(BUSES_TOKENS.commandBus);
    const decorator = `@Inject(${token})`;
    const parameterDeclaration = `private readonly commandBus: ${BUSES_TYPES.streamCommandBus}`;
    const tokenDependency = getChildDependencies(token);
    res += `${decorator}\n${parameterDeclaration},`;
    dependencies.push(...INJECT_TOKEN_NEST_DEPENDENCY(), ...tokenDependency, INFRA_DEPENDENCY);
  }
  if (queryBus) {
    const token = getTokenName(BUSES_TOKENS.queryBus);
    const decorator = `@Inject(${token})`;
    const parameterDeclaration = `private readonly queryBus: ${BUSES_TYPES.queryBus}`;
    const tokenDependency = getChildDependencies(token);
    res += `${decorator}\n${parameterDeclaration},`;
    dependencies.push(...INJECT_TOKEN_NEST_DEPENDENCY(), ...tokenDependency, INFRA_DEPENDENCY);
  }
  if (integrationEventBus) {
    const token = getTokenName(BUSES_TOKENS.integrationEventBus);
    const decorator = `@Inject(${token})`;
    const parameterDeclaration = `private readonly integrationEventBus: ${BUSES_TYPES.integrationEventBus}`;
    const tokenDependency = getChildDependencies(token);
    res += `${decorator}\n${parameterDeclaration},`;
    dependencies.push(...INJECT_TOKEN_NEST_DEPENDENCY(), ...tokenDependency, INFRA_DEPENDENCY);
  }
  if (pubSubIntegrationEventBus) {
    const token = getTokenName(BUSES_TOKENS.pubSubIntegrationEventBus);
    const decorator = `@Inject(${token})`;
    const parameterDeclaration = `private readonly pubSubIntegrationEventBus: ${BUSES_TYPES.pubSubIntegrationEventBus}`;
    const tokenDependency = getChildDependencies(token);
    res += `${decorator}\n${parameterDeclaration},`;
    dependencies.push(...INJECT_TOKEN_NEST_DEPENDENCY(), ...tokenDependency, INFRA_DEPENDENCY);
  }
  return {
    output: res,
    dependencies,
  };
};
