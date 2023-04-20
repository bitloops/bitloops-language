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
import { InferredTypes } from '../../../../src/semantic-analysis/type-inference/ASTTypeInference.js';
import {
  ClassTypeParameterSymbolEntry,
  ClassTypeThisSymbolEntry,
  ParameterSymbolEntry,
} from '../../../../src/semantic-analysis/type-inference/SymbolEntry.js';
import { PrimitiveSymbolTable } from '../../../../src/semantic-analysis/type-inference/SymbolTable.js';
import { FileUtil } from '../../../../src/utils/file.js';
import { SymbolTableBuilder } from '../../builder/SymbolTableBuilder.js';
type SymbolTableTestCase = {
  description: string;
  inputCore: string;
  inputSetup: string;
  expectedSymbolTable: PrimitiveSymbolTable;
};
export const SYMBOL_TABLE_TEST_CASES: SymbolTableTestCase[] = [
  {
    description: 'Should create symbol table for command handler',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/command-handler-if.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'WithdrawMoneyCommandHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insert('accountRepo', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('accountId', InferredTypes.Unknown, true)
              .insertVariableSymbolEntry('accountEntity', InferredTypes.Unknown, true)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'result',
                  InferredTypes.Unknown,
                  true,
                ),
              )
              .insertVariableSymbolEntry('result', InferredTypes.Unknown, true),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for command handler with 2 ifs',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/command-handler-two-if.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'WithdrawMoneyCommandHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insert('accountRepo', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('accountId', InferredTypes.Unknown, true)
              .insertVariableSymbolEntry('accountEntity', InferredTypes.Unknown, true)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'result',
                  InferredTypes.Unknown,
                  true,
                ),
              )
              .insertChildScope(
                'if1',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'message',
                  InferredTypes.Unknown,
                  true,
                ),
              )
              .insertVariableSymbolEntry('result', InferredTypes.Unknown, true),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for command handler with switch',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/command-handler-switch.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'WithdrawMoneyCommandHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insert('accountRepo', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('accountId', InferredTypes.Unknown, true)
              .insertVariableSymbolEntry('accountEntity', InferredTypes.Unknown, true)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'result',
                  InferredTypes.Unknown,
                  true,
                ),
              )
              .insertVariableSymbolEntry('animal', InferredTypes.Unknown, true)
              .insertChildScope(
                'switch0',
                new SymbolTableBuilder()
                  .insertChildScope('case0', new SymbolTableBuilder())
                  .insertChildScope('default', new SymbolTableBuilder()),
              ),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for query handler with if/else',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/queryHandlerWithElse.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'GetAccountQueryHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insert('accountRepo', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('query', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('requestId', InferredTypes.Unknown, true)
              .insertVariableSymbolEntry('account', InferredTypes.Unknown, true)
              .insertChildScope('if0', new SymbolTableBuilder())
              .insertChildScope('else0', new SymbolTableBuilder()),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for entity',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/entity.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'TodoEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder()
              .insert('props', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('todo', InferredTypes.Unknown, false)
              .insertVariableSymbolEntry('isNew', InferredTypes.Unknown, true)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'event',
                  InferredTypes.Unknown,
                  true,
                ),
              ),
          )
          .insertChildScope(
            'complete',
            new SymbolTableBuilder()
              // .insert('this.completed', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('event', InferredTypes.Unknown, true),
          )
          .insertChildScope(
            'isCompleted',
            new SymbolTableBuilder().insertVariableSymbolEntry('a', InferredTypes.Unknown, true),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for value object',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/valueObject.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'TitleVO',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder().insert(
              'props',
              new ParameterSymbolEntry(InferredTypes.Unknown),
            ),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for domain event handler',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/domain-event-handler.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'SendEmailAfterMoneyDepositedDomainEventHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insert('customerService', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'handle',
            new SymbolTableBuilder()
              .insert('event', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('command', InferredTypes.Unknown, true),
            // .insert(
            //   'this.commandBus.send',
            //   new ClassTypeParameterSymbolEntry(InferredTypes.Unknown),
            // ),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for integration event handler',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/integration-event-handler.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'MoneyDepositedIntegrationEventHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insert('eventVersion', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'handle',
            new SymbolTableBuilder()
              .insert('event', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('accountId', InferredTypes.Unknown, true)
              .insertVariableSymbolEntry('command', InferredTypes.Unknown, true),
            // .insert(
            //   'this.commandBus.send',
            //   new ClassTypeParameterSymbolEntry(InferredTypes.Unknown),
            // ),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for domain service',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/domain-service.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'MarketingNotificationDomainService',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry(InferredTypes.Unknown))
          .insert(
            'notificationTemplateRepo',
            new ClassTypeParameterSymbolEntry(InferredTypes.Unknown),
          )
          .insertChildScope(
            'getNotificationTemplateToBeSent',
            new SymbolTableBuilder()
              .insert('user', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('emailOrigin', InferredTypes.Unknown, true)
              .insertVariableSymbolEntry('notificationTemplate', InferredTypes.Unknown, false)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder()
                  .insertVariableSymbolEntry(
                    'notificationTemplateResponse',
                    InferredTypes.Unknown,
                    true,
                  )
                  .insertChildScope('if0', new SymbolTableBuilder()),
              )
              .insertChildScope('else0', new SymbolTableBuilder()),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for domain rule',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/rule.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'ValidEmailRule',
        new SymbolTableBuilder()
          .insert('email', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertVariableSymbolEntry('re', InferredTypes.Unknown, true),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for integration event',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/integration-event.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'TodoCompletedIntegrationEvent',
        new SymbolTableBuilder()
          .insert('event', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'v1',
            new SymbolTableBuilder().insertVariableSymbolEntry(
              'todoCompleted',
              InferredTypes.Unknown,
              true,
            ),
          ),
      )
      .build(),
  },
];

type SymbolTableErrorTestCase = {
  description: string;
  inputCore: string;
  inputSetup: string;
  errorMessages: string[];
};

export const SYMBOL_TABLE_MISSING_IDENTIFIERS_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that identifier in const declaration is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-const-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier person is not defined.'],
  },
  {
    description: 'Should return error that identifier returned from function is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-return-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier person is not defined.'],
  },
  {
    description: 'Should return error that argument name in method is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-method-argument-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier id is not defined.'],
  },
  {
    description: 'Should return error that identifier in switch expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-switch-expression-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier animal is not defined.'],
  },
  {
    description: 'Should return error identifier used inside if condition is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-if-condition-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier res is not defined.'],
  },
  {
    description: 'Should return error that identifier in switch case expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-switch-case-expression-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier bird is not defined.'],
  },
  {
    description:
      'Should return error that most left identifier in member expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-member-dot-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier account is not defined.'],
  },
  {
    description:
      'Should return error that most left identifier in method expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-method-left-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier hello is not defined.'],
  },
  {
    description: 'Should return error that this identifier in member dot expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-this-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier this is not defined.'],
  },
];

export const SYMBOL_TABLE_ALREADY_DECLARED_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that const declaration is already defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/already-declared/already-declared-const.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier accountId is already defined.'],
  },
  {
    description: 'Should return error that variable declaration is already defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/already-declared/already-declared-variable.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['The identifier accountId is already defined.'],
  },
];

export const SYMBOL_TABLE_CONSTANT_REASSIGNMENT_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that const declaration cannot be reassigned',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/constant-reassignment/const-reassignment.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Cannot reassign constant variable accountId.'],
  },
];

export const SYMBOL_TABLE_UNREACHED_CODE_TEST_CASES: SymbolTableErrorTestCase[] = [];
