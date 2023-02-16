import { Infra } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccount } from '../../domain/events/MoneyDepositedToAccount.js';
import { IntegrationSchemaV1 } from '../../structs/IntegrationSchemaV1.js';
import { IntegrationSchemaV2 } from '../../structs/IntegrationSchemaV2.js';

type IntegrationSchemas = IntegrationSchemaV1 | IntegrationSchemaV2;
type ToIntegrationDataMapper = (data: MoneyDepositedToAccount) => IntegrationSchemas;

export class MoneyDepositedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<IntegrationSchemas> {
  static versions = ['v1', 'v2.0.1'];
  public static readonly fromContextId = MoneyDepositedToAccount.fromContextId; // get from it's own context in case we have some props as input
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: MoneyDepositedIntegrationEvent.toIntegrationDataV1,
    'v2.0.1': MoneyDepositedIntegrationEvent.toIntegrationDataV2,
  };

  constructor(data: IntegrationSchemas, version: string, uuid?: string) {
    const metadata = {
      id: uuid,
      fromContextId: MoneyDepositedIntegrationEvent.fromContextId,
      version,
    };
    super(MoneyDepositedIntegrationEvent.getEventTopic(version), data, metadata);
  }

  static create(event: MoneyDepositedToAccount): MoneyDepositedIntegrationEvent[] {
    return MoneyDepositedIntegrationEvent.versions.map((version) => {
      const mapper = MoneyDepositedIntegrationEvent.versionMappers[version];
      const data = mapper(event);
      return new MoneyDepositedIntegrationEvent(data, version);
    });
  }

  static toIntegrationDataV1(data: MoneyDepositedToAccount): IntegrationSchemaV1 {
    return {
      accountId: data.account.id.toString(),
      balanceAmount: data.account.balance.amount,
    };
  }

  static toIntegrationDataV2(data: MoneyDepositedToAccount): IntegrationSchemaV2 {
    return {
      accountId: data.account.id.toString(),
    };
  }

  static getEventTopic(version?: string) {
    const topic = `integration.${MoneyDepositedIntegrationEvent.name}`;

    const eventTopic = version === undefined ? topic : `${topic}.${version}`;
    return eventTopic;
  }
}
