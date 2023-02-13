import { StringLiteralNode } from '../../nodes/Expression/Literal/StringLiteralNode.js';
import { IntegrationVersionMapperNode } from '../../nodes/integration-event/IntegrationVersionMapperNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { StructIdentifierNode } from '../../nodes/struct/StructIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class IntegrationVersionMapperNodeBuilder implements IBuilder<IntegrationVersionMapperNode> {
  private versionMapperNode: IntegrationVersionMapperNode;
  private versionName: StringLiteralNode;
  private returnSchemaType: StructIdentifierNode;
  private statements: StatementListNode;

  constructor(metadata?: TNodeMetadata) {
    this.versionMapperNode = new IntegrationVersionMapperNode(metadata);
  }

  public withVersionName(versionName: StringLiteralNode): IntegrationVersionMapperNodeBuilder {
    this.versionName = versionName;
    return this;
  }

  public withReturnSchemaType(
    returnSchemaType: StructIdentifierNode,
  ): IntegrationVersionMapperNodeBuilder {
    this.returnSchemaType = returnSchemaType;
    return this;
  }

  public withStatements(statements: StatementListNode): IntegrationVersionMapperNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): IntegrationVersionMapperNode {
    this.versionMapperNode.addChild(this.versionName);
    this.versionMapperNode.addChild(this.returnSchemaType);
    this.versionMapperNode.addChild(this.statements);

    this.versionMapperNode.buildObjectValue();

    return this.versionMapperNode;
  }
}
