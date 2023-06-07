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
  EntityEvaluationSymbolEntry,
  IntegrationEventParameterSymbolEntry,
  MemberDotSymbolEntry,
  MethodCallSymbolEntry,
  ParameterSymbolEntry,
  ValueObjectEvaluationSymbolEntry,
  VariableSymbolEntry,
} from '../../../../src/semantic-analysis/type-inference/SymbolEntry.js';
import { PrimitiveSymbolTable } from '../../../../src/semantic-analysis/type-inference/SymbolTable.js';
import { SymbolTableManager } from '../../../../src/semantic-analysis/type-inference/SymbolTableManager.js';
import { bitloopsPrimitivesObj } from '../../../../src/types.js';
import { FileUtil } from '../../../../src/utils/file.js';
import { SymbolTableBuilder } from '../../builder/SymbolTableBuilder.js';

type SymbolTableTestCase = {
  description: string;
  inputCore: string;
  inputSetup: string;
  expectedSymbolTable: PrimitiveSymbolTable;
};
const METADATA_TYPE = '{ context: { jwt: string; userId: string } }';
const CONTEXT_TYPE = '{ jwt: string; userId: string }';
const SCOPE_NAMES = SymbolTableManager.SCOPE_NAMES;

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
              .insert('command.amount', new MemberDotSymbolEntry('int32'))
              .insert('command.metadata', new MemberDotSymbolEntry(METADATA_TYPE))
              .insert('command.metadata.context', new MemberDotSymbolEntry(CONTEXT_TYPE))
              .insert('command.metadata.context.jwt', new MemberDotSymbolEntry('string'))
              .insert('command.metadata.context.userId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('accountId', 'UUIDv4', true)
              .insert(
                'this.accountRepo.getById()',
                new MethodCallSymbolEntry('(OK(AccountEntity), Errors(UnexpectedError))'),
              )
              .insert(
                'this.accountRepo.getById().ifError()',
                new MethodCallSymbolEntry('AccountEntity'),
              )
              .insertChildScope('ifError0', new SymbolTableBuilder())
              .insertVariableSymbolEntry('accountEntity', 'AccountEntity', true)
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
              )
              .insert('this.accountRepo.update().ifError()', new MethodCallSymbolEntry('void'))
              .insertChildScope(
                'ifError1',
                new SymbolTableBuilder().insert('err', new ParameterSymbolEntry('UnexpectedError')),
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
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('AccountProps')),
          )
          .insertChildScope(
            'withdrawAmount',
            new SymbolTableBuilder().insert('amount', new ParameterSymbolEntry('int32', 0)),
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
              .insert('command.amount', new MemberDotSymbolEntry('int32'))
              .insert('command.metadata', new MemberDotSymbolEntry(METADATA_TYPE))
              .insert('command.metadata.context', new MemberDotSymbolEntry(CONTEXT_TYPE))
              .insert('command.metadata.context.jwt', new MemberDotSymbolEntry('string'))
              .insert('command.metadata.context.userId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('accountId', 'UUIDv4', true)
              .insert(
                'this.accountRepo.getById()',
                new MethodCallSymbolEntry('(OK(AccountEntity), Errors(UnexpectedError))'),
              )
              .insert(
                'this.accountRepo.getById().ifError()',
                new MethodCallSymbolEntry('AccountEntity'),
              )
              .insertChildScope(
                'ifError0',
                new SymbolTableBuilder().insert('err', new ParameterSymbolEntry('UnexpectedError')),
              )
              .insertVariableSymbolEntry('accountEntity', 'AccountEntity', true)
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
              )
              .insert('this.accountRepo.update().ifError()', new MethodCallSymbolEntry('void'))
              .insertChildScope('ifError1', new SymbolTableBuilder()),
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
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('AccountProps')),
          )
          .insertChildScope(
            'withdrawAmount',
            new SymbolTableBuilder().insert('amount', new ParameterSymbolEntry('int32', 0)),
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
              .insert('command.amount', new MemberDotSymbolEntry('int32'))
              .insert('command.metadata', new MemberDotSymbolEntry(METADATA_TYPE))
              .insert('command.metadata.context', new MemberDotSymbolEntry(CONTEXT_TYPE))
              .insert('command.metadata.context.jwt', new MemberDotSymbolEntry('string'))
              .insert('command.metadata.context.userId', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('accountId', 'UUIDv4', true)
              .insert(
                'this.accountRepo.getById()',
                new MethodCallSymbolEntry('(OK(AccountEntity), Errors(UnexpectedError))'),
              )
              .insert(
                'this.accountRepo.getById().ifError()',
                new MethodCallSymbolEntry('AccountEntity'),
              )
              .insertChildScope('ifError0', new SymbolTableBuilder())
              .insertVariableSymbolEntry('accountEntity', 'AccountEntity', true)
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
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('AccountProps')),
          )
          .insertChildScope(
            'withdrawAmount',
            new SymbolTableBuilder().insert('amount', new ParameterSymbolEntry('int32', 0)),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for query handler with if/else',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/query-handler-with-else.bl',
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
              .insert('query.metadata', new MemberDotSymbolEntry(METADATA_TYPE))
              .insert('query.metadata.context', new MemberDotSymbolEntry(CONTEXT_TYPE))
              .insert('query.metadata.context.jwt', new MemberDotSymbolEntry('string'))
              .insert('query.metadata.context.userId', new MemberDotSymbolEntry('string'))
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
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder()
              .insert('props', new ParameterSymbolEntry('TodoProps'))
              .insertVariableSymbolEntry('todo', 'TodoEntity', false)
              .insert('props.id', new MemberDotSymbolEntry('UUIDv4'))
              .insertVariableSymbolEntry('isNew', 'bool', true)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder()
                  .insert('todo.id', new MemberDotSymbolEntry('UUIDv4'))
                  .insert('todo.id.toString()', new MethodCallSymbolEntry('string'))
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
              .insert('this.id.toString()', new MethodCallSymbolEntry('string'))
              .insert('this.title', new MemberDotSymbolEntry('TitleVO'))
              .insert('this.title.title', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('event', 'TodoCompletedDomainEvent', true)
              .insert('this.addDomainEvent()', new MethodCallSymbolEntry('void')),
          )
          .insertChildScope(
            'isCompleted',
            new SymbolTableBuilder()
              .insert('this.completed', new MemberDotSymbolEntry('bool'))
              .insertVariableSymbolEntry('a', 'bool', true),
          ),
      )
      .insertChildScope('TitleProps', new SymbolTableBuilder())
      .insertChildScope('TodoProps', new SymbolTableBuilder())
      .insertChildScope(
        'TitleVO',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('TitleVO'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('TitleProps')),
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
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder()
              .insert('props.title', new MemberDotSymbolEntry('string'))
              .insert('props', new ParameterSymbolEntry('TitleProps')),
          ),
      )
      .insertChildScope('TitleProps', new SymbolTableBuilder())
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
              .insert('event.metadata', new MemberDotSymbolEntry(METADATA_TYPE))
              .insert('event.metadata.context', new MemberDotSymbolEntry(CONTEXT_TYPE))
              .insert('event.metadata.context.userId', new MemberDotSymbolEntry('string'))
              .insert('event.metadata.context.jwt', new MemberDotSymbolEntry('string'))
              .insertVariableSymbolEntry('command', 'SendEmailCommand', true)
              .insert('this.commandBus.publish()', new MethodCallSymbolEntry('void')),
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
              .insert('this.commandBus.publish()', new MethodCallSymbolEntry('void')),
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
              .insert('user', new ParameterSymbolEntry('UserEntity', 0))
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
                    new MethodCallSymbolEntry('(OK(NotificationTemplateReadModel), Errors())'),
                  )
                  .insert(
                    'this.notificationTemplateRepo.getByType().ifError()',
                    new MethodCallSymbolEntry('NotificationTemplateReadModel'),
                  )
                  .insertChildScope('ifError0', new SymbolTableBuilder())
                  .insertVariableSymbolEntry(
                    'notificationTemplateResponse',
                    'NotificationTemplateReadModel',
                    true,
                  ),
              )
              .insertChildScope('else0', new SymbolTableBuilder()),
          ),
      )
      .insertChildScope('NotificationTemplateReadRepoPort', new SymbolTableBuilder())
      .insertChildScope(
        'UserEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('UserEntity'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('UserProps')),
          )
          .insertChildScope('isFirstTodo', new SymbolTableBuilder()),
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
          .insert('email', new ParameterSymbolEntry(bitloopsPrimitivesObj.string, 0))
          .insertVariableSymbolEntry('re', bitloopsPrimitivesObj.regex, true)
          .insert('re.test()', new MethodCallSymbolEntry(bitloopsPrimitivesObj.bool)),
      )
      .insertChildScope(
        'InvalidEmailError',
        new SymbolTableBuilder().insert(
          'email',
          new ParameterSymbolEntry(bitloopsPrimitivesObj.string, 0),
        ),
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
            new SymbolTableBuilder()
              .insertVariableSymbolEntry('todoCompleted', 'IntegrationTodoCompletedSchemaV1', true)
              .insert('event.aggregateId', new MemberDotSymbolEntry('string'))
              .insert('event.userId', new MemberDotSymbolEntry('string')),
          ),
      )
      .insertChildScope('TodoCompletedDomainEvent', new SymbolTableBuilder())
      .build(),
  },
  {
    description: 'Should create symbol table for rule with logical operators',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/rule-with-logical-operators.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'ValidNameRule',
        new SymbolTableBuilder()
          .insert('name', new ParameterSymbolEntry(bitloopsPrimitivesObj.string, 0))
          .insert('name.length', new MemberDotSymbolEntry(bitloopsPrimitivesObj.int32)),
      )
      .insertChildScope(
        'InvalidEmailError',
        new SymbolTableBuilder().insert(
          'email',
          new ParameterSymbolEntry(bitloopsPrimitivesObj.string, 0),
        ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for domain service with 2 methodCalls in a row',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/domain-service-2-method-calls.bl',
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
            'geEmailToBeSent',
            new SymbolTableBuilder()
              .insert('user', new ParameterSymbolEntry('UserEntity', 0))
              .insert('user.getEmail()', new MethodCallSymbolEntry('EmailEntity'))
              .insert('user.getEmail().getAddress()', new MethodCallSymbolEntry('string'))
              .insertVariableSymbolEntry('emailOrigin', bitloopsPrimitivesObj.string, true),
          ),
      )
      .insertChildScope('NotificationTemplateReadRepoPort', new SymbolTableBuilder())
      .insertChildScope(
        'UserEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('UserEntity'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('UserProps')),
          )
          .insertChildScope(
            'getEmail',
            new SymbolTableBuilder().insert('num', new ParameterSymbolEntry('int32', 0)),
          ),
      )
      .insertChildScope(
        'EmailEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('EmailEntity'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('EmailProps')),
          )
          .insertChildScope('getAddress', new SymbolTableBuilder()),
      )
      .build(),
  },
  {
    description:
      'Should create symbol table for domain service with 2 methodCalls in a row and left is ifError',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/domain-service-2-method-calls-if-error.bl',
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
            'geEmailToBeSent',
            new SymbolTableBuilder()
              .insert('user', new ParameterSymbolEntry('UserEntity', 0))
              .insert('user.getEmail()', new MethodCallSymbolEntry('(OK(EmailEntity), Errors())'))
              .insert('user.getEmail().ifError()', new MethodCallSymbolEntry('EmailEntity'))
              .insertChildScope('ifError0', new SymbolTableBuilder())
              .insert('userEmail', new VariableSymbolEntry('EmailEntity', true))
              .insert(
                'userEmail.getAddress()',
                new MethodCallSymbolEntry(bitloopsPrimitivesObj.string),
              )
              .insert('emailAddress', new VariableSymbolEntry(bitloopsPrimitivesObj.string, true)),
          ),
      )
      .insertChildScope('NotificationTemplateReadRepoPort', new SymbolTableBuilder())
      .insertChildScope(
        'UserEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('UserEntity'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('UserProps')),
          )
          .insertChildScope(
            'getEmail',
            new SymbolTableBuilder().insert('num', new ParameterSymbolEntry('int32', 0)),
          ),
      )
      .insertChildScope(
        'EmailEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('EmailEntity'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('EmailProps')),
          )
          .insertChildScope('getAddress', new SymbolTableBuilder()),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for entity evaluation',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/entity-evaluation.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope('WithdrawMoneyCommand', new SymbolTableBuilder())
      .insertChildScope('AccountNotFoundError', new SymbolTableBuilder())
      .insertChildScope(
        'AccountEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('AccountEntity'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('AccountProps')),
          ),
      )
      .insertChildScope('AccountProps', new SymbolTableBuilder())

      .insertChildScope(
        'WithdrawMoneyCommandHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('WithdrawMoneyCommandHandler'))
          .insert('this.accountRepo', new ClassTypeParameterSymbolEntry('AccountWriteRepoPort'))
          .insert(
            'this.integrationEventBus',
            new ClassTypeParameterSymbolEntry('IntegrationEventBusPort'),
          )
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry('WithdrawMoneyCommand'))
              .insert('command.accountId', new MemberDotSymbolEntry('string'))
              .insert('command.metadata', new MemberDotSymbolEntry(METADATA_TYPE))
              .insert('command.metadata.context', new MemberDotSymbolEntry(CONTEXT_TYPE))
              .insert('command.metadata.context.jwt', new MemberDotSymbolEntry('string'))
              .insert('command.metadata.context.userId', new MemberDotSymbolEntry('string'))
              .insert('accountEntity', new VariableSymbolEntry('AccountEntity', true))
              .insert(
                'AccountEntity.create()',
                new EntityEvaluationSymbolEntry('(OK(AccountEntity), Errors())'),
              )
              .insert(
                'AccountEntity.create().ifError()',
                new MethodCallSymbolEntry('AccountEntity'),
              )
              .insertChildScope('ifError0', new SymbolTableBuilder()),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for value object evaluation',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/valueObject-evaluation.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope('AddTodoCommand', new SymbolTableBuilder())
      .insertChildScope(
        'TitleVO',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('TitleVO'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder()
              .insert('props', new ParameterSymbolEntry('TitleProps'))
              .insert('props.title', new MemberDotSymbolEntry('string')),
          ),
      )
      .insertChildScope('TitleProps', new SymbolTableBuilder())
      .insertChildScope(
        'AddTodoCommandHandler',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('AddTodoCommandHandler'))
          .insert(
            'this.integrationEventBus',
            new ClassTypeParameterSymbolEntry('IntegrationEventBusPort'),
          )
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry('AddTodoCommand'))
              .insert('command.title', new MemberDotSymbolEntry('string'))
              .insert('command.metadata', new MemberDotSymbolEntry(METADATA_TYPE))
              .insert('command.metadata.context', new MemberDotSymbolEntry(CONTEXT_TYPE))
              .insert('command.metadata.context.jwt', new MemberDotSymbolEntry('string'))
              .insert('command.metadata.context.userId', new MemberDotSymbolEntry('string'))
              .insert('titlevo', new VariableSymbolEntry('TitleVO', true))
              .insert(
                'TitleVO.create()',
                new ValueObjectEvaluationSymbolEntry(
                  '(OK(TitleVO), Errors(DomainErrors.TitleOutOfBoundsError))',
                ),
              )
              .insert('TitleVO.create().ifError()', new MethodCallSymbolEntry('TitleVO'))

              .insertChildScope('ifError0', new SymbolTableBuilder()),
          ),
      )
      .build(),
  },
  {
    description: 'Should create symbol table for domainError and domainRule with errorArguments',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-this-parameter.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'DocumentStatusNotValidatedError',
        new SymbolTableBuilder()
          .insert('documentId', new ParameterSymbolEntry('string', 0))
          .insert('status', new ParameterSymbolEntry('string', 1)),
      )
      .insertChildScope(
        'FinancialDocumentEntity',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('FinancialDocumentEntity'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert(
              'props',
              new ParameterSymbolEntry('FinancialDocumentProps'),
            ),
          ),
      )
      .insertChildScope('FinancialDocumentProps', new SymbolTableBuilder())
      .insertChildScope('StatusProps', new SymbolTableBuilder())
      .insertChildScope(
        'StatusVO',
        new SymbolTableBuilder()
          .insert('this', new ClassTypeThisSymbolEntry('StatusVO'))
          .insertChildScope(
            SCOPE_NAMES.DOMAIN_CREATE,
            new SymbolTableBuilder().insert('props', new ParameterSymbolEntry('StatusProps')),
          ),
      )
      .insertChildScope(
        'FinancialDocumentIsValidatedRule',
        new SymbolTableBuilder()
          .insert('document', new ParameterSymbolEntry('FinancialDocumentEntity', 0))
          .insert('document.id', new MemberDotSymbolEntry('UUIDv4'))
          .insert('document.status', new MemberDotSymbolEntry('StatusVO'))
          .insert('document.status.status', new MemberDotSymbolEntry('string'))
          .insert('document.id.toString()', new MemberDotSymbolEntry('string')),
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
    errorMessages: ['Identifier person not defined.'],
  },
  {
    description: 'Should return error that identifier returned from function is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-return-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier person not defined.'],
  },
  {
    description: 'Should return error that argument name in method is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-method-argument-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier id not defined.'],
  },
  {
    description: 'Should return error that identifier in switch expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-switch-expression-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier animal not defined.'],
  },
  {
    description: 'Should return error identifier used inside if condition is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-if-condition-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier res not defined.'],
  },
  {
    description: 'Should return error that identifier in switch case expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-switch-case-expression-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier bird not defined.'],
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
    errorMessages: ['Identifier account not defined.'],
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
    errorMessages: ['Identifier hello not defined.'],
  },
  {
    description: 'Should return error that this identifier in member dot expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-identifiers/missing-this-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier this not defined.'],
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
    errorMessages: ['Identifier accountId is already defined.'],
  },
  {
    description: 'Should return error that variable declaration is already defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/already-declared/already-declared-variable.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier accountId is already defined.'],
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

export const SYMBOL_TABLE_MEMBER_NOT_DEFINED_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that member is not defined for entity',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-entity.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member withdrawAmount not defined in AccountEntity.'],
  },
  {
    description: 'Should return error that member is not defined for command',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-command.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member amount not defined in WithdrawMoneyCommand.'],
  },
  {
    description: 'Should return error that member is not defined for query',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-query.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member accountId not defined in GetAccountQuery.'],
  },
  {
    description: 'Should return error that member is not defined for query handler',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-query-handler.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member accountRepo not defined in GetAccountQueryHandler.'],
  },
  {
    description: 'Should return error that member is not defined for repo port',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-repo-port.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member getByType not defined in AccountReadRepoPort.'],
  },
  {
    description: 'Should return error that member is not defined for domain event',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-domain-event.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member test not defined in TodoAddedDomainEvent.'],
  },
  {
    description: 'Should return error that member is not defined for props',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-props.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member error not defined in TitleProps.'],
  },
  {
    description: 'Should return error that member is not defined for integration event',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-integration-event.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member account not defined in IntegrationMoneyDepositedSchemaV1.'],
  },
  {
    description: 'Should return error that member is not defined for value object',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-value-object.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member test not defined in TitleVO.'],
  },
  {
    description: 'Should return error that member is not defined for command bus port',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-command-bus-port.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member test not defined in CommandBus.'],
  },
  {
    description: 'Should return error that member is not defined for regex',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-regex.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member fail not defined in regex.'],
  },
];

export const SYMBOL_TABLE_UNREACHED_CODE_TEST_CASES: SymbolTableErrorTestCase[] = [];

export const SYMBOL_TABLE_WRONG_ARGUMENTS_TEST_CASES: SymbolTableErrorTestCase[] = [];

export const SYMBOL_TABLE_MISSING_PARAMETER_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that identifier of domain error is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-parameter/rule-missing-parameter.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Parameter status is missing.'],
  },
];

export const SYMBOL_TABLE_WRONG_PARAMETER_TYPE_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that identifier of domain error is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/wrong-parameter-type/rule-wrong-parameter-type.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Parameter document.status.status: string should have type int32.'],
  },
];
export const SYMBOL_TABLE_FIND_TYPE_OF_KEYWORD_TEST_CASES = [
  {
    description: 'Should return type of keyword in execute scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/findTypeOfKeyword/command-handler-execute.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: {
      name: 'accountEntity',
      position: {
        line: 16,
        column: 22,
        fileId: 'fileId',
      },
    },
    expectedOutput: { type: '(OK(AccountEntity), Errors(UnexpectedError))', isConst: true },
  },
  {
    description: 'Should return type of keyword in execute scope with ifError',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/findTypeOfKeyword/command-handler-execute-if-error.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'accountEntity', position: { line: 16, column: 22, fileId: 'fileId' } },
    expectedOutput: { type: 'AccountEntity', isConst: true },
  },
  {
    description: 'Should return type of keyword in if scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/command-handler-if.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'result', position: { line: 17, column: 22, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in if scope, with two ifs',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/command-handler-two-if.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'message', position: { line: 23, column: 23, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in else scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/query-handler-with-else.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'account', position: { line: 17, column: 24, fileId: 'fileId' } },
    expectedOutput: { type: '(OK(AccountReadModel), Errors(UnexpectedError))', isConst: true },
  },
  {
    description: 'Should return type of keyword in switch scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/command-handler-switch.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'animal', position: { line: 22, column: 19, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in switch-case scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/findTypeOfKeyword/command-handler-switch-case.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'bird', position: { line: 43, column: 20, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in switch-default scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/findTypeOfKeyword/command-handler-switch-default.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'cat', position: { line: 49, column: 26, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in domain-create scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/entity.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'isNew', position: { line: 20, column: 16, fileId: 'fileId' } },
    expectedOutput: { type: 'bool', isConst: true },
  },
  {
    description: 'Should return type of keyword in handle scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/domain-event-handler.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'command', position: { line: 9, column: 36, fileId: 'fileId' } },
    expectedOutput: { type: 'SendEmailCommand', isConst: true },
  },
];
