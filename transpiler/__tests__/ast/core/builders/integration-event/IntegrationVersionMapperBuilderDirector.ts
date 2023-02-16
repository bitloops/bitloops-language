import {
  TEvaluationField,
  TIntegrationVersionMapper,
  TStructIdentifier,
} from '../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { StatementDirector } from '../statement/statementDirector.js';
import { StringLiteralBuilder } from '../stringLiteral.js';
import { IntegrationVersionMapperBuilder } from './IntegrationVersionMapperBuilder.js';

export class IntegrationVersionMapperBuilderDirector {
  private builder: IntegrationVersionMapperBuilder;

  constructor() {
    this.builder = new IntegrationVersionMapperBuilder();
  }

  buildWithReturnStructEvaluationStatement({
    versionName,
    schemaType,
    structEvaluationFields,
    constDeclarationName,
  }: {
    versionName: string;
    schemaType: TStructIdentifier;
    structEvaluationFields: TEvaluationField[];
    constDeclarationName: string;
  }): TIntegrationVersionMapper {
    const constDeclarationStatement =
      new StatementDirector().buildConstDeclarationWithStructEvaluation({
        name: constDeclarationName,
        structIdentifier: schemaType,
        fields: structEvaluationFields,
      });
    const returnStatement = new StatementDirector().buildReturnStatement(
      new ExpressionBuilderDirector().buildIdentifierExpression(constDeclarationName),
    );
    return this.builder
      .withVersionName(new StringLiteralBuilder().withValue(versionName).build())
      .withReturnSchemaType(schemaType)
      .withStatements([constDeclarationStatement, returnStatement])
      .build();
  }
}
