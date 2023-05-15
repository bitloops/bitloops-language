import { Infra } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccountDomainEvent } from '../../domain/events/money-deposited-to-account.domain-event';
import { IntegrationSchemaV1 } from '../../structs/integration-schema-v-1.struct';
type TIntegrationSchemas = IntegrationSchemaV1;
type ToIntegrationDataMapper = (event: MoneyDepositedToAccountDomainEvent) => TIntegrationSchemas;
export class MoneyDepositedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'Banking';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: MoneyDepositedIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(MoneyDepositedIntegrationEvent.boundedContextId, payload, version);
  }
  static create(event: MoneyDepositedToAccountDomainEvent): MoneyDepositedIntegrationEvent[] {
    return MoneyDepositedIntegrationEvent.versions.map((version) => {
      const mapper = MoneyDepositedIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new MoneyDepositedIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(event: MoneyDepositedToAccountDomainEvent): IntegrationSchemaV1 {
    const moneyDeposited = { accountId: 'testAccount', amount: 'testAmount' };
    return moneyDeposited;
  }
}
