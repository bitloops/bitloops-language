import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TIntegrationEvent,
  TIntegrationEventIdentifier,
  TIntegrationVersionMappers,
  TParameter,
} from '../../../../../src/types.js';

export class IntegrationEventDeclarationBuilder implements IBuilder<TIntegrationEvent> {
  private identifierName: TIntegrationEventIdentifier;
  private input: TParameter;
  private versionMappers: TIntegrationVersionMappers;

  public withIdentifier(
    identifierName: TIntegrationEventIdentifier,
  ): IntegrationEventDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withInput(input: TParameter): IntegrationEventDeclarationBuilder {
    this.input = input;
    return this;
  }

  public withVersionMappers(
    versionMappers: TIntegrationVersionMappers,
  ): IntegrationEventDeclarationBuilder {
    this.versionMappers = versionMappers;
    return this;
  }

  public build(): TIntegrationEvent {
    const integrationEvent: TIntegrationEvent = {
      integrationEvent: {
        integrationEventIdentifier: this.identifierName,
        ...this.versionMappers,
        ...this.input,
      },
    };

    return integrationEvent;
  }
}
