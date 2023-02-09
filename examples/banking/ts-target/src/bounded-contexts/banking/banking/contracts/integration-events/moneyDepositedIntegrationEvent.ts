import { Infra } from '@bitloops/bl-boilerplate-core';
import { CustomerCreated } from '../../domain/events/CustomerCreated';

type IntegrationSchemaV1 = {
  accountId: string;
  balanceAmount: number;
};

type MoneyDepositedIntegrationEventPayload = IntegrationSchemaV1;

type MoneyDepositedInput = {
  accountId: string;
  balanceAmount: number;
};

type ToIntegrationDataMapper = (data: MoneyDepositedInput) => MoneyDepositedIntegrationEventPayload;

export class MoneyDepositedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<MoneyDepositedIntegrationEventPayload> {
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: MoneyDepositedIntegrationEvent.toIntegrationDataV1,
  };

  constructor(data: MoneyDepositedIntegrationEventPayload, version: string, uuid?: string) {
    const metadata = {
      id: uuid,
      fromContextId: CustomerCreated.fromContextId,
      version,
    };
    super(MoneyDepositedIntegrationEvent.getEventTopic(version), data, metadata);
  }

  static create(params: MoneyDepositedInput): MoneyDepositedIntegrationEvent[] {
    return MoneyDepositedIntegrationEvent.versions.map((version) => {
      const mapper = MoneyDepositedIntegrationEvent.versionMappers[version];
      const data = mapper(params);
      return new MoneyDepositedIntegrationEvent(data, version);
    });
  }

  static toIntegrationDataV1(data: MoneyDepositedInput): IntegrationSchemaV1 {
    return {
      accountId: data.accountId,
      balanceAmount: data.balanceAmount,
    };
  }

  static getEventTopic(version?: string) {
    const topic = `integration.${MoneyDepositedIntegrationEvent.name}`;

    const eventTopic = version === undefined ? topic : `${topic}.${version}`;
    return eventTopic;
  }
}
