import { Infra } from '@bitloops/bl-boilerplate-core';
import { UserChangedEmailDomainEvent } from '../../domain/events/user-changed-email.domain-event';
import { IntegrationUserChangedEmailSchemaV1 } from '../../structs/integration-user-changed-email-schema-v-1.struct';
type TIntegrationSchemas = IntegrationUserChangedEmailSchemaV1;
type ToIntegrationDataMapper = (
  event: UserChangedEmailDomainEvent
) => TIntegrationSchemas;
export class UserChangedEmailIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'iam';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: UserChangedEmailIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(UserChangedEmailIntegrationEvent.boundedContextId, payload, version);
  }
  static create(
    event: UserChangedEmailDomainEvent
  ): UserChangedEmailIntegrationEvent[] {
    return UserChangedEmailIntegrationEvent.versions.map((version) => {
      const mapper = UserChangedEmailIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new UserChangedEmailIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(
    event: UserChangedEmailDomainEvent
  ): IntegrationUserChangedEmailSchemaV1 {
    const userChangedEmail = {
      userId: event.aggregateId,
      userEmail: event.email,
    };
    return userChangedEmail;
  }
}
