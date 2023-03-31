import { Domain, Infra, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccountDomainEvent } from '../../domain/events/MoneyDepositedToAccountDomainEvent';
import { IntegrationSchemaV1 } from '../../structs/IntegrationSchemaV1';
import { IntegrationSchemaV2 } from '../../structs/IntegrationSchemaV2';
type TIntegrationSchemas = IntegrationSchemaV1 | IntegrationSchemaV2;
type ToIntegrationDataMapper = (event: MoneyDepositedToAccountDomainEvent) => TIntegrationSchemas;
export class MoneyDepositedIntegrationEvent
  implements Infra.EventBus.IntegrationEvent<TIntegrationSchemas>
{
  public static readonly boundedContextId = 'Banking';
  static versions = ['v1', 'v2.0.1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: MoneyDepositedIntegrationEvent.toIntegrationDatav1,
    'v2.0.1': MoneyDepositedIntegrationEvent.toIntegrationDatav201,
  };
  public metadata: Infra.EventBus.TIntegrationEventMetadata;
  constructor(public data: TIntegrationSchemas, version: string) {
    this.metadata = {
      boundedContextId: MoneyDepositedIntegrationEvent.boundedContextId,
      createdTimestamp: Date.now(),
      messageId: new Domain.UUIDv4().toString(),
      correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
      context: asyncLocalStorage.getStore()?.get('context'),
      version,
    };
  }
  static create(event: MoneyDepositedToAccountDomainEvent): MoneyDepositedIntegrationEvent[] {
    return MoneyDepositedIntegrationEvent.versions.map((version) => {
      const mapper = MoneyDepositedIntegrationEvent.versionMappers[version];
      const data = mapper(event);
      return new MoneyDepositedIntegrationEvent(data, version);
    });
  }
  static toIntegrationDatav1(event: MoneyDepositedToAccountDomainEvent): IntegrationSchemaV1 {
    const moneyDeposited = { accountId: 'testAccount', amount: 'testAmount' };
    return moneyDeposited;
  }
  static toIntegrationDatav201(event: MoneyDepositedToAccountDomainEvent): IntegrationSchemaV2 {
    const moneyDeposited = { accountId: 'testAccount' };
    return moneyDeposited;
  }
}
