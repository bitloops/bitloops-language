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
  MemberDotSymbolEntry,
  MethodCallSymbolEntry,
  ParameterSymbolEntry,
} from '../../../../src/semantic-analysis/type-inference/SymbolEntry.js';
import { PrimitiveSymbolTable } from '../../../../src/semantic-analysis/type-inference/SymbolTable.js';
import { bitloopsPrimitivesObj } from '../../../../src/types.js';
import { FileUtil } from '../../../../src/utils/file.js';
import { BitloopsPrimaryTypeDirector } from '../../../ast/core/builders/bitloopsPrimaryTypeDirector.js';
import { ReturnOkErrorTypeBuilder } from '../../../ast/core/builders/returnOkErrorType.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../../ast/core/builders/returnOkErrorTypeBuilderDirector.js';
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
          .insert(
            'this',
            new ClassTypeThisSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'WithdrawMoneyCommandHandler',
              ),
            ),
          )
          .insert(
            'accountRepo',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountWriteRepoPort'),
            ),
          )
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert(
                'command',
                new ParameterSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                    'WithdrawMoneyCommand',
                  ),
                ),
              )
              .insertVariableSymbolEntry(
                'accountId',
                new BitloopsPrimaryTypeDirector().buildBuiltinClassPrimaryType('UUIDv4'),
                true,
              )
              .insert(
                'this.accountRepo',
                new MemberDotSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                    'AccountWriteRepoPort',
                  ),
                ),
              )
              .insert(
                'this.accountRepo.getById(accountId)',
                new MethodCallSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountEntity'),
                ),
              )
              .insertVariableSymbolEntry(
                'accountEntity',
                new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountEntity'),
                true,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'result',
                  new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                  true,
                ),
              )
              .insertVariableSymbolEntry(
                'result',
                new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                true,
              )
              .insert(
                'this.accountRepo.update(accountEntity)',
                new MethodCallSymbolEntry(
                  new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
                    'void',
                  ),
                ),
              ),
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
          .insert(
            'this',
            new ClassTypeThisSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'WithdrawMoneyCommandHandler',
              ),
            ),
          )
          .insert(
            'accountRepo',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountWriteRepoPort'),
            ),
          )
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert(
                'command',
                new ParameterSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                    'WithdrawMoneyCommand',
                  ),
                ),
              )
              .insertVariableSymbolEntry(
                'accountId',
                new BitloopsPrimaryTypeDirector().buildBuiltinClassPrimaryType('UUIDv4'),
                true,
              )
              .insertVariableSymbolEntry(
                'accountEntity',
                new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountEntity'),
                true,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'result',
                  new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                  true,
                ),
              )
              .insertChildScope(
                'if1',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'message',
                  new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                  true,
                ),
              )
              .insertVariableSymbolEntry(
                'result',
                new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                true,
              )
              .insert(
                'accountEntity.withdrawAmount(command.amount)',
                new MethodCallSymbolEntry(
                  new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
                    'void',
                    'DomainErrors.WithdrawMoneyError',
                  ),
                ),
              )
              .insert(
                'this.accountRepo.update(accountEntity)',
                new MethodCallSymbolEntry(
                  new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
                    'void',
                  ),
                ),
              ),
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
          .insert(
            'this',
            new ClassTypeThisSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'WithdrawMoneyCommandHandler',
              ),
            ),
          )
          .insert(
            'accountRepo',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountWriteRepoPort'),
            ),
          )
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert(
                'command',
                new ParameterSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                    'WithdrawMoneyCommand',
                  ),
                ),
              )
              .insertVariableSymbolEntry(
                'accountId',
                new BitloopsPrimaryTypeDirector().buildBuiltinClassPrimaryType('UUIDv4'),
                true,
              )
              .insert(
                'this.accountRepo',
                new MemberDotSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                    'AccountWriteRepoPort',
                  ),
                ),
              )
              .insert(
                'this.accountRepo.getById(accountId)',
                new MethodCallSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountEntity'),
                ),
              )
              .insertVariableSymbolEntry(
                'accountEntity',
                new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountEntity'),
                true,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'result',
                  new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                  true,
                ),
              )
              .insertVariableSymbolEntry(
                'animal',
                new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                true,
              )
              .insertChildScope(
                'switch0',
                new SymbolTableBuilder()
                  .insertChildScope('case0', new SymbolTableBuilder())
                  .insertChildScope('default', new SymbolTableBuilder()),
              )
              .insert(
                'accountEntity.withdrawAmount(command.amount)',
                new MethodCallSymbolEntry(
                  new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
                    'void',
                    'DomainErrors.WithdrawMoneyError',
                  ),
                ),
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
          .insert(
            'this',
            new ClassTypeThisSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'GetAccountQueryHandler',
              ),
            ),
          )
          .insert(
            'accountRepo',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountWriteRepoPort'),
            ),
          )
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert(
                'query',
                new ParameterSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('GetAccountQuery'),
                ),
              )
              .insertVariableSymbolEntry(
                'requestId',
                new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                true,
              )
              .insert(
                'this.accountRepo',
                new MemberDotSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                    'AccountWriteRepoPort',
                  ),
                ),
              )
              .insert(
                'this.accountRepo.getById(accountId)',
                new MethodCallSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountEntity'),
                ),
              )
              .insertVariableSymbolEntry(
                'account',
                new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('AccountReadModel'),
                true,
              )
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
          .insert(
            'this',
            new ClassTypeThisSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TodoEntity'),
            ),
          )
          .insertChildScope(
            'domainCreate',
            new SymbolTableBuilder()
              .insert(
                'props',
                new ParameterSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TodoProps'),
                ),
              )
              .insertVariableSymbolEntry(
                'todo',
                new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TodoEntity'),
                false,
              )
              .insert(
                'props.id',
                new MemberDotSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                ),
              )
              .insertVariableSymbolEntry(
                'isNew',
                new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'),
                true,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder()
                  //TODO add todo.title
                  .insert(
                    'todo.id',
                    new MemberDotSymbolEntry(
                      new BitloopsPrimaryTypeDirector().buildBuiltinClassPrimaryType('UUIDv4'),
                    ),
                  )
                  .insertVariableSymbolEntry(
                    'event',
                    new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                      'TodoAddedDomainEvent',
                    ),
                    true,
                  )
                  .insert(
                    'todo.addDomainEvent(event)',
                    new MethodCallSymbolEntry(
                      new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
                    ),
                  ),
              ),
          )
          .insertChildScope(
            'complete',
            new SymbolTableBuilder().insertVariableSymbolEntry(
              'event',
              InferredTypes.Unknown,
              true,
            ),
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
          .insert(
            'customerService',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('CustomerServicePort'),
            ),
          )
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
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'MoneyDepositedIntegrationEventHandler',
        new SymbolTableBuilder()
          .insert(
            'this',
            new ClassTypeThisSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'MoneyDepositedIntegrationEventHandler',
              ),
            ),
          )
          .insertChildScope(
            'handle',
            new SymbolTableBuilder()
              .insert(
                'event',
                new ParameterSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                    'MoneyDepositedIntegrationEvent',
                  ),
                ),
              )
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
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'MarketingNotificationDomainService',
        new SymbolTableBuilder()
          .insert(
            'this',
            new ClassTypeThisSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'MarketingNotificationDomainService',
              ),
            ),
          )
          .insert(
            'notificationTemplateRepo',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'NotificationTemplateReadRepoPort',
              ),
            ),
          )
          .insertChildScope(
            'getNotificationTemplateToBeSent',
            new SymbolTableBuilder()
              .insert(
                'user',
                new ParameterSymbolEntry(
                  new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('UserEntity'),
                ),
              )
              .insertVariableSymbolEntry(
                'emailOrigin',
                new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(
                  bitloopsPrimitivesObj.string,
                ),
                true,
              )
              .insertVariableSymbolEntry(
                'notificationTemplate',
                new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                  'NotificationTemplateReadModel',
                ),
                false,
              )
              .insertChildScope(
                'if0',
                new SymbolTableBuilder()
                  .insert(
                    'user.isFirstTodo()',
                    new MethodCallSymbolEntry(
                      new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(
                        bitloopsPrimitivesObj.bool,
                      ),
                    ),
                  )
                  .insert(
                    "this.notificationTemplateRepo.getByType('firstTodo')",
                    new MethodCallSymbolEntry(
                      new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
                        'NotificationTemplateReadModel',
                      ),
                    ),
                  )
                  .insert(
                    "this.notificationTemplateRepo.getByType('firstTodo').ifError()",
                    new MethodCallSymbolEntry(
                      new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                        'NotificationTemplateReadModel',
                      ),
                    ),
                  )
                  .insertVariableSymbolEntry(
                    'notificationTemplateResponse',
                    new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                      'NotificationTemplateReadModel',
                    ),
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
      'transpiler/__tests__/end-to-end/mocks/symbol-table/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'ValidEmailRule',
        new SymbolTableBuilder()
          .insert(
            'email',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(
                bitloopsPrimitivesObj.string,
              ),
            ),
          )
          .insertVariableSymbolEntry(
            're',
            new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(
              bitloopsPrimitivesObj.regex,
            ),
            true,
          )
          .insert(
            're.test(email)',
            new MethodCallSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(
                bitloopsPrimitivesObj.bool,
              ),
            ),
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
          .insert(
            'event',
            new ClassTypeParameterSymbolEntry(
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'TodoCompletedDomainEvent',
              ),
            ),
          )
          .insertChildScope(
            'v1',
            new SymbolTableBuilder().insertVariableSymbolEntry(
              'todoCompleted',
              new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                'IntegrationTodoCompletedSchemaV1',
              ),
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
