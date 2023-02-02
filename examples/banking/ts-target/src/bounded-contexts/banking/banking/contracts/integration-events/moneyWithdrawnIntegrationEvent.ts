import { Infra } from '@bitloops/bl-boilerplate-core';
import { CustomerCreated } from '../../domain/events/CustomerCreated';

type TodoIntegrationSchemaV1 = {
  accountId: string;
  balanceAmount: number;
};

type MoneyDepositedIntegrationEventPayload = TodoIntegrationSchemaV1;

type MoneyWithdrawnInput = {
  accountId: string;
  balanceAmount: number;
}; // v1 | v2 ...

type ToIntegrationDataMapper = (data: MoneyWithdrawnInput) => MoneyDepositedIntegrationEventPayload;

export class MoneyWithdrawnIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<MoneyDepositedIntegrationEventPayload> {
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: MoneyWithdrawnIntegrationEvent.toIntegrationDataV1,
  };

  constructor(data: MoneyDepositedIntegrationEventPayload, version: string, uuid?: string) {
    const metadata = {
      id: uuid,
      fromContextId: CustomerCreated.fromContextId,
      version,
    };
    super(MoneyWithdrawnIntegrationEvent.getEventTopic(version), data, metadata);
  }

  static create(params: MoneyWithdrawnInput): MoneyWithdrawnIntegrationEvent[] {
    return MoneyWithdrawnIntegrationEvent.versions.map((version) => {
      const mapper = MoneyWithdrawnIntegrationEvent.versionMappers[version];
      const data = mapper(params);
      return new MoneyWithdrawnIntegrationEvent(data, version);
    });
  }

  static toIntegrationDataV1(data: MoneyWithdrawnInput): TodoIntegrationSchemaV1 {
    return {
      accountId: data.accountId,
      balanceAmount: data.balanceAmount,
    };
  }

  static getEventTopic(version?: string) {
    const topic = `integration.${MoneyWithdrawnIntegrationEvent.name}`;

    const eventTopic = version === undefined ? topic : `${topic}.${version}`;
    return eventTopic;
  }
}
