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
import {
  TParameterDependencies,
  TRESTControllerExecute,
  TRestMethods,
} from '../../../../src/types.js';
import { StatementDirector } from '../builders/statement/statementDirector.js';
import { ArgumentBuilderDirector } from '../builders/argumentDirector.js';
import { ParameterBuilderDirector } from '../builders/ParameterBuilderDirector.js';

type RestControllerDeclarationTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  RESTControllerIdentifier: string;
  parameters: TParameterDependencies;
  method: TRestMethods;
  execute: TRESTControllerExecute;
};

export const validRestControllerStatementTestCases: RestControllerDeclarationTestCase[] = [
  {
    description: 'Domain rule declaration with no statements',
    fileId: 'testFile.bl',
    inputBLString: `RESTController HelloWorldController() { 
      method: REST.Methods.GET; 
      execute(request, response) { 
        this.ok(response, 'Hello World!'); 
      } 
    }`,
    RESTControllerIdentifier: 'HelloWorldController',
    parameters: [],
    method: 'GET',
    execute: {
      dependencies: ['request', 'response'],
      statements: [
        new StatementDirector().buildThisMethodCall('ok', [
          new ArgumentBuilderDirector().buildIdentifierArgument('response'),
          new ArgumentBuilderDirector().buildStringArgument('Hello World!'),
        ]),
      ],
    },
  },
  {
    description: 'Controller with 1 useCase dependency',
    fileId: 'testFile.bl',
    inputBLString: `RESTController HelloWorldController (helloWorldUseCase: HelloWorldUseCase) {
      method: REST.Methods.POST;
      execute(request, response) {
        const result = helloWorldUseCase.execute();
        this.ok(response, result);
      }
    }`,
    RESTControllerIdentifier: 'HelloWorldController',
    parameters: [
      new ParameterBuilderDirector().buildIdentifierParameter(
        'helloWorldUseCase',
        'HelloWorldUseCase',
      ),
    ],
    method: 'POST',
    execute: {
      dependencies: ['request', 'response'],
      statements: [
        new StatementDirector().buildConstDeclarationWithMemberDotMethodCall({
          name: 'result',
          memberDotMembers: ['helloWorldUseCase', 'execute'],
          argumentList: [],
        }),
        new StatementDirector().buildThisMethodCall('ok', [
          new ArgumentBuilderDirector().buildIdentifierArgument('response'),
          new ArgumentBuilderDirector().buildIdentifierArgument('result'),
        ]),
      ],
    },
  },
];
