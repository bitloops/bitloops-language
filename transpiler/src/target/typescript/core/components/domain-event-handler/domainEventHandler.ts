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
  TContextData,
  TDependenciesTypeScript,
  TDomainEventHandler,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';
import { getTraceableDecorator } from '../../../helpers/tracingDecorator.js';

const DOMAIN_EVENT_HANDLER_DEPENDENCIES: () => TDependenciesTypeScript = () => [
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
    value: 'Container',
    from: '@bitloops/bl-boilerplate-core',
  },
  {
    type: 'absolute',
    default: false,
    value: 'Traceable',
    from: '@bitloops/bl-boilerplate-infra-telemetry',
  },
];

const DOMAIN_EVENT_HANDLER = 'domainEventHandler';

export const domainEventHandlerToTargetLanguage = (
  domainEventModel: TDomainEventHandler,
  contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  if (!contextData) {
    throw new Error('Context data is required for domain event');
  }
  const { domainEventHandler } = domainEventModel;

  let result = '';
  const dependencies = DOMAIN_EVENT_HANDLER_DEPENDENCIES();

  const { domainEventHandlerIdentifier } = domainEventHandler;

  const { parameters, eventHandlerBusDependencies, handle } = domainEventHandler;
  const constructor = modelToTargetLanguage({
    value: {
      parameterList: { parameters },
      busDependencies: { eventHandlerBusDependencies },
    },
    type: BitloopsTypesMapping.THandlerAttributesAndConstructor,
    contextData,
  });

  const eventName = modelToTargetLanguage({
    value: handle.parameter,
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
  });

  const getters = generateEventGetters({
    eventName: eventName.output,
    boundedContextName: contextData.boundedContext,
  });

  const traceableDecorator = getTraceableDecorator(
    domainEventHandlerIdentifier,
    DOMAIN_EVENT_HANDLER,
  );

  const handleMethod = modelToTargetLanguage({
    value: handle,
    type: BitloopsTypesMapping.THandle,
  });

  result += `export class ${domainEventHandlerIdentifier} implements Application.IHandle { `;
  result += constructor.output;
  result += getters;
  result += traceableDecorator;
  result += handleMethod.output;
  result += '}';

  dependencies.push(...constructor.dependencies);
  dependencies.push(...handleMethod.dependencies);
  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.DomainEventHandler,
    className: domainEventHandlerIdentifier,
  });

  return { output: result, dependencies: finalDependencies };
};

export const generateEventGetters = ({
  eventName,
  boundedContextName,
}: {
  eventName: string;
  boundedContextName: string;
}): string => {
  const result = `
  get event() {
    return ${eventName};
  }
  get boundedContext(): string {
    return '${boundedContextName}';
  }`;
  return result;
};
