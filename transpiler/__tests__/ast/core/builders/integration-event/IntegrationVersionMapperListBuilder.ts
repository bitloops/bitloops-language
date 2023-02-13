import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TIntegrationVersionMapper, TIntegrationVersionMappers } from '../../../../../src/types.js';

export class IntegrationVersionMapperListBuilder implements IBuilder<TIntegrationVersionMappers> {
  private versionMappers: TIntegrationVersionMapper[];

  public withVersionMappers(
    versionMappers: TIntegrationVersionMapper[],
  ): IntegrationVersionMapperListBuilder {
    this.versionMappers = versionMappers;
    return this;
  }

  public build(): TIntegrationVersionMappers {
    const integrationVersionMappers: TIntegrationVersionMappers = {
      integrationVersionMappers: this.versionMappers,
    };

    return integrationVersionMappers;
  }
}
