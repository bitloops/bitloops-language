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
  TIntegrationEventParameter,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { getChildDependencies } from '../../dependencies.js';

export const BITLOOPS_BOUNDED_CONTEXT = 'bitloops';

const INTEGRATION_EVENT_PARAMETER_DEPENDENCIES: (
  eventName: string,
  packageOfEvent: string,
) => TDependenciesTypeScript = (eventName: string, packageOfEvent: string) => [
  {
    type: 'absolute',
    default: false,
    value: eventName,
    from: packageOfEvent,
  },
];
export const integrationEventParameterToTargetLanguage = (
  variable: TIntegrationEventParameter,
): TTargetDependenciesTypeScript => {
  const { integrationEventParameter } = variable;
  const { value, integrationEventIdentifier, boundedContextModule } = integrationEventParameter;

  const contextData: TContextData = {
    boundedContext: boundedContextModule.boundedContextName.wordsWithSpaces,
    module: boundedContextModule.moduleName.wordsWithSpaces,
  };
  let dependencies = [];
  if (contextData.boundedContext === BITLOOPS_BOUNDED_CONTEXT) {
    const packageForModule = packagesEventsMappping[contextData.module];
    if (!packageForModule) {
      throw new Error(`Package ${contextData.module} not found`);
    }

    dependencies = INTEGRATION_EVENT_PARAMETER_DEPENDENCIES(
      integrationEventIdentifier,
      packageForModule,
    );
  } else {
    dependencies = getChildDependencies(integrationEventIdentifier, contextData);
  }

  return {
    output: `${value}:${integrationEventIdentifier}`,
    dependencies,
  };
};

const packagesEventsMappping = {
  authNestPassport: '@bitloops/bl-boilerplate-infra-nest-auth-passport',
  nestJetsream: '@bitloops/bl-boilerplate-infra-nest-jetsream',
  telemetry: '@bitloops/bl-boilerplate-infra-telemetry',
};
