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
  expressionKey,
  TContextData,
  TDependenciesTypeScript,
  TIntegrationEventHandler,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';
import { createHandlerConstructor } from '../handler-constructor/index.js';
import { getTraceableDecorator } from '../../../helpers/tracingDecorator.js';

const INTEGRATION_EVENT_HANDLER_DEPENDENCIES: () => TDependenciesTypeScript = () => [
  {
    type: 'absolute',
    default: false,
    value: 'Infra',
    from: '@bitloops/bl-boilerplate-core',
  },
  {
    type: 'absolute',
    default: false,
    value: 'Application',
    from: '@bitloops/bl-boilerplate-core',
  },

  {
    type: 'absolute',
    default: false,
    value: 'Traceable',
    from: '@bitloops/bl-boilerplate-infra-telemetry',
  },
];

const INTEGRATION_EVENT_HANDLER = 'integrationEventHandler';

export const integrationEventHandlerToTargetLanguage = (
  integrationEventHandlerModel: TIntegrationEventHandler,
  contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  if (!contextData) {
    throw new Error('Context data is required for integration event handler');
  }
  const { integrationEventHandler } = integrationEventHandlerModel;

  let result = '';
  const dependencies = INTEGRATION_EVENT_HANDLER_DEPENDENCIES();

  const {
    parameters,
    eventHandlerBusDependencies,
    integrationEventHandlerHandleMethod,
    integrationEventHandlerIdentifier,
    evaluationField,
  } = integrationEventHandler;
  const constructor = createHandlerConstructor(parameters, { eventHandlerBusDependencies });

  const handleMethod = modelToTargetLanguage({
    value: { integrationEventHandlerHandleMethod },
    type: BitloopsTypesMapping.TIntegrationEventHandlerHandleMethod,
  });

  const eventName =
    integrationEventHandlerHandleMethod.integrationEventParameter.integrationEventIdentifier;

  const eventVersion = modelToTargetLanguage({
    value: { expression: evaluationField[expressionKey] },
    type: BitloopsTypesMapping.TExpression,
  });

  const getters = generateIntegrationEventGetters({
    eventName,
    eventVersion: eventVersion.output,
  });

  const traceableDecorator = getTraceableDecorator(
    integrationEventHandlerIdentifier,
    INTEGRATION_EVENT_HANDLER,
  );

  result += `export class ${integrationEventHandlerIdentifier} implements Application.IHandleIntegrationEvent { `;
  result += constructor.output;
  result += getters;
  result += traceableDecorator;
  result += handleMethod.output;
  result += '}';

  dependencies.push(...constructor.dependencies);
  dependencies.push(...handleMethod.dependencies);
  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.IntegrationEventHandler,
    className: integrationEventHandlerIdentifier,
    contextData,
  });

  return { output: result, dependencies: finalDependencies };
};

export const generateIntegrationEventGetters = ({
  eventName,
  eventVersion,
}: {
  eventName: string;
  eventVersion: string;
}): string => {
  const result = `
  get event() {
    return ${eventName};
  }
  get boundedContext(): string {
    return ${eventName}.boundedContextId;
  }
  get version() {
    return ${eventVersion};
  }`;
  return result;
};
