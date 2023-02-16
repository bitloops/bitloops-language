import { Infra } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccountDomainEvent } from '../../domain/events/MoneyDepositedToAccountDomainEvent';
import { IntegrationSchemaV1 } from '../../structs/IntegrationSchemaV1';
import { IntegrationSchemaV2 } from '../../structs/IntegrationSchemaV2';
type TIntegrationSchemas = IntegrationSchemaV1 | IntegrationSchemaV2;
type ToIntegrationDataMapper = (event: MoneyDepositedToAccountDomainEvent) => TIntegrationSchemas;
export class MoneyDepositedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly fromContextId = 'Banking';
  static versions = ['v1', 'v2.0.1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: MoneyDepositedIntegrationEvent.toIntegrationDatav1,
    'v2.0.1': MoneyDepositedIntegrationEvent.toIntegrationDatav201,
  };
  constructor(data: TIntegrationSchemas, version: string, uuid?: string) {
    const metadata = {
      fromContextId: MoneyDepositedIntegrationEvent.fromContextId,
      id: uuid,
      version,
    };
    super(MoneyDepositedIntegrationEvent.getEventTopic(version), data, metadata);
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
  static getEventTopic(version?: string) {
    const topic = `integration.${MoneyDepositedIntegrationEvent.name}`;
    const eventTopic = version === undefined ? topic : `${topic}.${version}`;
    return eventTopic;
  }
}
