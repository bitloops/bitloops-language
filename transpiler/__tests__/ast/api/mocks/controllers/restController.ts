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
  TParameterList,
  TRESTControllerExecute,
  TRestMethods,
  TServerType,
} from '../../../../../src/types.js';
import { StatementDirector } from '../../../core/builders/statement/statementDirector.js';
import { ArgumentBuilderDirector } from '../../../core/builders/argumentDirector.js';
import { ParameterBuilderDirector } from '../../../core/builders/ParameterBuilderDirector.js';
import { RestExecuteBuilder } from '../../builders/controllers/restControllerExecuteBuilder.js';
import { ArgumentListBuilderDirector } from '../../../core/builders/argumentListBuilderDirector.js';
import { FileUtil } from '../../../../../src/utils/file.js';

type RestControllerDeclarationTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  setupBLString: string;
  RESTControllerIdentifier: string;
  parameters: TParameterList;
  method: TRestMethods;
  execute: TRESTControllerExecute;
  serverType: TServerType;
};

export const validRestControllerStatementTestCases: RestControllerDeclarationTestCase[] = [
  {
    description: 'Valid rest controller',
    fileId: 'testFile.bl',
    inputBLString: `RESTController HelloWorldController() { 
      method: REST.Methods.GET; 
      execute(request, response) { 
        this.ok(response, 'Hello World!'); 
      } 
    }`,
    setupBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restControllerDeclaration/restControllerDeclaration.bl',
    ),
    RESTControllerIdentifier: 'HelloWorldController',
    parameters: { parameters: [] },
    serverType: 'REST.Fastify',
    method: 'GET',
    execute: new RestExecuteBuilder()
      .withRequestReply('request', 'response')
      .withStatements([
        new StatementDirector().buildThisMethodCall(
          'ok',
          new ArgumentListBuilderDirector().buildArgumentListWithArgs([
            new ArgumentBuilderDirector().buildIdentifierArgument('response'),
            new ArgumentBuilderDirector().buildStringArgument('Hello World!'),
          ]),
        ),
      ])
      .build(),
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
    setupBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restControllerDeclaration/restControllerDeclaration.bl',
    ),
    RESTControllerIdentifier: 'HelloWorldController',
    parameters: {
      parameters: [
        new ParameterBuilderDirector().buildIdentifierParameter(
          'helloWorldUseCase',
          'HelloWorldUseCase',
        ),
      ],
    },
    serverType: 'REST.Fastify',
    method: 'POST',
    execute: new RestExecuteBuilder()
      .withRequestReply('request', 'response')
      .withStatements([
        new StatementDirector().buildConstDeclarationWithMemberDotMethodCall({
          name: 'result',
          memberDotMembers: ['helloWorldUseCase', 'execute'],
          argumentList: { argumentList: [] },
        }),
        new StatementDirector().buildThisMethodCall(
          'ok',
          new ArgumentListBuilderDirector().buildArgumentListWithArgs([
            new ArgumentBuilderDirector().buildIdentifierArgument('response'),
            new ArgumentBuilderDirector().buildIdentifierArgument('result'),
          ]),
        ),
      ])
      .build(),
  },
];
