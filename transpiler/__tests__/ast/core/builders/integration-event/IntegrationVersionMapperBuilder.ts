import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  StringLiteral,
  structIdentifierKey,
  TIntegrationVersionMapper,
  TStatements,
  TStructIdentifier,
} from '../../../../../src/types.js';

export class IntegrationVersionMapperBuilder implements IBuilder<TIntegrationVersionMapper> {
  private returnSchemaType: TStructIdentifier;
  private versionName: StringLiteral;
  private statements: TStatements;

  public withReturnSchemaType(
    returnSchemaType: TStructIdentifier,
  ): IntegrationVersionMapperBuilder {
    this.returnSchemaType = returnSchemaType;
    return this;
  }

  public withVersionName(versionName: StringLiteral): IntegrationVersionMapperBuilder {
    this.versionName = versionName;
    return this;
  }

  public withStatements(statements: TStatements): IntegrationVersionMapperBuilder {
    this.statements = statements;
    return this;
  }

  public build(): TIntegrationVersionMapper {
    const integrationVersionMapper: TIntegrationVersionMapper = {
      integrationVersionMapper: {
        statements: this.statements,
        [structIdentifierKey]: this.returnSchemaType,
        ...this.versionName,
      },
    };

    return integrationVersionMapper;
  }
}
