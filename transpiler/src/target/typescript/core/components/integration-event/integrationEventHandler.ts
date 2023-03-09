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
  TIntegrationEventHandler,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';

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
    value: 'Container',
    from: '@bitloops/bl-boilerplate-core',
  },
];

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
  } = integrationEventHandler;
  const constructor = modelToTargetLanguage({
    value: {
      parameterList: { parameters },
      busDependencies: { eventHandlerBusDependencies },
    },
    type: BitloopsTypesMapping.THandlerAttributesAndConstructor,
    contextData,
  });

  const handleMethod = modelToTargetLanguage({
    value: { integrationEventHandlerHandleMethod },
    type: BitloopsTypesMapping.TIntegrationEventHandlerHandleMethod,
  });

  result += `export class ${integrationEventHandlerIdentifier} implements Application.IHandle { `;
  result += constructor.output;
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
