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
  ClassTypeParameterSymbolEntry,
  ClassTypeThisSymbolEntry,
  IntegrationEventParameterSymbolEntry,
  MemberDotSymbolEntry,
  MethodCallSymbolEntry,
  ParameterSymbolEntry,
} from '../../../../src/semantic-analysis/type-inference/SymbolEntry.js';
import { PrimitiveSymbolTable } from '../../../../src/semantic-analysis/type-inference/SymbolTable.js';
import { bitloopsPrimitivesObj } from '../../../../src/types.js';
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
          .insert('this', new ClassTypeThisSymbolEntry('WithdrawMoneyCommandHandler'))
          .insert(
            'this.integrationEventBus',
            new ClassTypeParameterSymbolEntry('IntegrationEventBusPort'),
          )
          .insert('this.accountRepo', new ClassTypeParameterSymbolEntry('AccountWriteRepoPort'))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry('WithdrawMoneyCommand'))
              .insert('command.accountId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('accountId', 'UUIDv4', true)
              .insert(
                'this.accountRepo.getById()',
                new MethodCallSymbolEntry('(OK(AccountEntity), Errors(UnexpectedError))'),
              )
              .insertVariableSymbolEntry(
                'accountEntity',
                '(OK(AccountEntity), Errors(UnexpectedError))',
                true,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry('result', 'string', true),
              )
              .insertVariableSymbolEntry('result', 'string', true)
              .insert(
                'accountEntity.withdrawAmount()',
                new MethodCallSymbolEntry(
                  '(OK(void), Errors(DomainErrors.InvalidMonetaryValueError))',
                ),
              )
              .insert(
                'this.accountRepo.update()',
                new MethodCallSymbolEntry('(OK(void), Errors(UnexpectedError))'),
              ),
          ),
      )
      .insertChildScope('AccountWriteRepoPort', new SymbolTableBuilder())
      .insertChildScope('AccountProps', new SymbolTableBuilder())
      .insertChildScope('WithdrawMoneyCommand', new SymbolTableBuilder())
      .insertChildScope(
        'AccountEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('AccountEntity'))
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('AccountProps')),
          )
          .insertChildScope(
            'withdrawAmount',
            new SymbolTableBuilder().insert('amount', new ParameterSymbolEntry('int32')),
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
          .insert('this', new ClassTypeThisSymbolEntry('WithdrawMoneyCommandHandler'))
          .insert(
            'this.integrationEventBus',
            new ClassTypeParameterSymbolEntry('IntegrationEventBusPort'),
          )
          .insert('this.accountRepo', new ClassTypeParameterSymbolEntry('AccountWriteRepoPort'))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry('WithdrawMoneyCommand'))
              .insert('command.accountId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('accountId', 'UUIDv4', true)
              .insert(
                'this.accountRepo.getById()',
                new MethodCallSymbolEntry('(OK(AccountEntity), Errors(UnexpectedError))'),
              )
              .insertVariableSymbolEntry(
                'accountEntity',
                '(OK(AccountEntity), Errors(UnexpectedError))',
                true,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry('result', 'string', true),
              )
              .insertChildScope(
                'if1',
                new SymbolTableBuilder().insertVariableSymbolEntry('message', 'string', true),
              )
              .insertVariableSymbolEntry('result', 'string', true)
              .insert(
                'accountEntity.withdrawAmount()',
                new MethodCallSymbolEntry(
                  '(OK(void), Errors(DomainErrors.InvalidMonetaryValueError))',
                ),
              )
              .insert(
                'this.accountRepo.update()',
                new MethodCallSymbolEntry('(OK(void), Errors(UnexpectedError))'),
              ),
          ),
      )
      .insertChildScope('AccountWriteRepoPort', new SymbolTableBuilder())
      .insertChildScope('AccountProps', new SymbolTableBuilder())
      .insertChildScope('WithdrawMoneyCommand', new SymbolTableBuilder())
      .insertChildScope(
        'AccountEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('AccountEntity'))
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('AccountProps')),
          )
          .insertChildScope(
            'withdrawAmount',
            new SymbolTableBuilder().insert('amount', new ParameterSymbolEntry('int32')),
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
          .insert('this', new ClassTypeThisSymbolEntry('WithdrawMoneyCommandHandler'))
          .insert(
            'this.integrationEventBus',
            new ClassTypeParameterSymbolEntry('IntegrationEventBusPort'),
          )
          .insert('this.accountRepo', new ClassTypeParameterSymbolEntry('AccountWriteRepoPort'))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry('WithdrawMoneyCommand'))
              .insert('command.accountId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('accountId', 'UUIDv4', true)
              .insert(
                'this.accountRepo.getById()',
                new MethodCallSymbolEntry('(OK(AccountEntity), Errors(UnexpectedError))'),
              )
              .insertVariableSymbolEntry(
                'accountEntity',
                '(OK(AccountEntity), Errors(UnexpectedError))',
                true,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry('result', 'string', true),
              )
              .insertVariableSymbolEntry('animal', 'string', true)
              .insertChildScope(
                'switch0',
                new SymbolTableBuilder()
                  .insertChildScope('case0', new SymbolTableBuilder())
                  .insertChildScope('default', new SymbolTableBuilder()),
              )
              .insert(
                'accountEntity.withdrawAmount()',
                new MethodCallSymbolEntry(
                  '(OK(void), Errors(DomainErrors.InvalidMonetaryValueError))',
                ),
              ),
          ),
      )
      .insertChildScope('AccountWriteRepoPort', new SymbolTableBuilder())
      .insertChildScope('AccountProps', new SymbolTableBuilder())
      .insertChildScope('WithdrawMoneyCommand', new SymbolTableBuilder())
      .insertChildScope(
        'AccountEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('AccountEntity'))
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('AccountProps')),
          )
          .insertChildScope(
            'withdrawAmount',
            new SymbolTableBuilder().insert('amount', new ParameterSymbolEntry('int32')),
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
          .insert('this', new ClassTypeThisSymbolEntry('GetAccountQueryHandler'))
          .insert(
            'this.integrationEventBus',
            new ClassTypeParameterSymbolEntry('IntegrationEventBusPort'),
          )
          .insert('this.accountRepo', new ClassTypeParameterSymbolEntry('AccountReadRepoPort'))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('query', new ParameterSymbolEntry('GetAccountQuery'))
              .insert('query.accountId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('requestId', 'string', true)
              .insert(
                'this.accountRepo.getById()',
                new MethodCallSymbolEntry('(OK(AccountReadModel), Errors(UnexpectedError))'),
              )
              .insertVariableSymbolEntry(
                'account',
                '(OK(AccountReadModel), Errors(UnexpectedError))',
                true,
              )
              .insertChildScope('if0', new SymbolTableBuilder())
              .insertChildScope('else0', new SymbolTableBuilder()),
          ),
      )
      .insertChildScope('AccountReadRepoPort', new SymbolTableBuilder())
      .insertChildScope('GetAccountQuery', new SymbolTableBuilder())
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
          .insert('this', new ClassTypeThisSymbolEntry('TodoEntity'))
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder()
              .insert('props', new ParameterSymbolEntry('TodoProps'))
              .insertVariableSymbolEntry('todo', 'TodoEntity', false)
              .insert('props.id', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('isNew', 'bool', true)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder()
                  .insert('todo.id', new MemberDotSymbolEntry('UUIDv4'))
                  .insert('todo.id.toString()', new MemberDotSymbolEntry('UUIDv4'))
                  .insert('todo.title', new MemberDotSymbolEntry('TitleVO'))
                  .insert('todo.title.title', new MemberDotSymbolEntry('string'))
                  .insert('todo.completed', new MemberDotSymbolEntry('bool'))
                  .insertVariableSymbolEntry('event', 'TodoAddedDomainEvent', true)
                  .insert('todo.addDomainEvent()', new MethodCallSymbolEntry('void')),
              ),
          )
          .insertChildScope(
            'complete',
            new SymbolTableBuilder()
              .insert('this.completed', new MemberDotSymbolEntry('bool'))
              .insert('this.id', new MemberDotSymbolEntry('UUIDv4'))
              .insert('this.id.toString()', new MemberDotSymbolEntry('string'))
              .insert('this.title', new MemberDotSymbolEntry('TitleVO'))
              .insert('this.title.title', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('event', 'TodoCompletedDomainEvent', true)
              .insert('todo.addDomainEvent()', new MethodCallSymbolEntry('void')),
          )
          .insertChildScope(
            'isCompleted',
            new SymbolTableBuilder()
              .insert('this.completed', new MemberDotSymbolEntry('bool'))
              .insertVariableSymbolEntry('a', 'bool', true),
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
          .insert('this', new ClassTypeThisSymbolEntry('TitleVO'))
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder()
              .insert('props.title', new MemberDotSymbolEntry('string'))
              .insert('props', new ParameterSymbolEntry('TitleProps')),
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
          .insert(
            'this',
            new ClassTypeThisSymbolEntry('SendEmailAfterMoneyDepositedDomainEventHandler'),
          )
          .insert('this.commandBus', new ClassTypeParameterSymbolEntry('CommandBusPort'))
          .insert('this.queryBus', new ClassTypeParameterSymbolEntry('QueryBusPort'))
          .insert('this.customerService', new ClassTypeParameterSymbolEntry('CustomerServicePort'))
          .insertChildScope(
            'handle',
            new SymbolTableBuilder()
              .insert('event', new ParameterSymbolEntry('DepositsIncrementedDomainEvent'))
              .insert('event.customerId', new MemberDotSymbolEntry('string'))
              .insert('event.amount', new MemberDotSymbolEntry('float'))
              .insertVariableSymbolEntry('command', 'SendEmailCommand', true)
              .insert('this.commandBus.send()', new MethodCallSymbolEntry('void')),
          ),
      )
      .insertChildScope('DepositsIncrementedDomainEvent', new SymbolTableBuilder())
      .build(),
  },
  {
    description: 'Should create symbol table for integration event handler',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/integration-event-handler.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'MoneyDepositedIntegrationEventHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('MoneyDepositedIntegrationEventHandler'))
          .insert('this.commandBus', new ClassTypeParameterSymbolEntry('CommandBusPort'))
          .insert('this.queryBus', new ClassTypeParameterSymbolEntry('QueryBusPort'))
          .insertChildScope(
            'handle',
            new SymbolTableBuilder()
              .insert(
                'event',
                new IntegrationEventParameterSymbolEntry('MoneyDepositedIntegrationEvent', {
                  boundedContext: 'Hello world',
                  module: 'demo',
                  eventVersion: 'v1',
                }),
              )
              .insert('event.accountId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('accountId', 'string', true)
              .insertVariableSymbolEntry('command', 'IncrementDepositsCommand', true)
              .insert('this.commandBus.send()', new MethodCallSymbolEntry('void')),
          ),
      )
      .insertChildScope('IntegrationMoneyDepositedSchemaV1', new SymbolTableBuilder())
      .insertChildScope(
        'MoneyDepositedIntegrationEvent',
        new SymbolTableBuilder()
          .insert('event', new ClassTypeParameterSymbolEntry('MoneyDepositedDomainEvent'))
          .insertChildScope('v1', new SymbolTableBuilder()),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for domain service',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/domain-service.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'MarketingNotificationDomainService',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('MarketingNotificationDomainService'))
          .insert(
            'this.notificationTemplateRepo',
            new ClassTypeParameterSymbolEntry('NotificationTemplateReadRepoPort'),
          )
          .insertChildScope(
            'getNotificationTemplateToBeSent',
            new SymbolTableBuilder()
              .insert('user', new ParameterSymbolEntry('UserEntity'))
              .insertVariableSymbolEntry('emailOrigin', bitloopsPrimitivesObj.string, true)
              .insertVariableSymbolEntry(
                'notificationTemplate',
                'NotificationTemplateReadModel',
                false,
              )
              .insert('user.isFirstTodo()', new MethodCallSymbolEntry(bitloopsPrimitivesObj.bool))
              .insertChildScope(
                'if0',
                new SymbolTableBuilder()
                  .insert(
                    'this.notificationTemplateRepo.getByType()',
                    new MethodCallSymbolEntry('NotificationTemplateReadModel'),
                  )
                  // .insert(
                  //   'this.notificationTemplateRepo.getByType().ifError()',
                  //   new MethodCallSymbolEntry('NotificationTemplateReadModel'),
                  // )
                  .insertVariableSymbolEntry(
                    'notificationTemplateResponse',
                    'NotificationTemplateReadModel',
                    true,
                  ),
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
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'ValidEmailRule',
        new SymbolTableBuilder()
          .insert('email', new ParameterSymbolEntry(bitloopsPrimitivesObj.string))
          .insertVariableSymbolEntry('re', bitloopsPrimitivesObj.regex, true)
          .insert('re.test(email)', new MethodCallSymbolEntry(bitloopsPrimitivesObj.bool)),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for integration event',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/integration-event.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'TodoCompletedIntegrationEvent',
        new SymbolTableBuilder()
          .insert('event', new ClassTypeParameterSymbolEntry('TodoCompletedDomainEvent'))
          .insertChildScope(
            'v1',
            new SymbolTableBuilder().insertVariableSymbolEntry(
              'todoCompleted',
              'IntegrationTodoCompletedSchemaV1',
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

export const SYMBOL_TABLE_WRONG_ARGUMENTS_TEST_CASES: SymbolTableErrorTestCase[] = [];
