import { IntegrationVersionMapperListNode } from '../../nodes/integration-event/IntegrationVersionMapperListNode.js';
import { IntegrationVersionMapperNode } from '../../nodes/integration-event/IntegrationVersionMapperNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class IntegrationVersionMapperListNodeBuilder
  implements IBuilder<IntegrationVersionMapperListNode>
{
  private versionMapperListNode: IntegrationVersionMapperListNode;
  private versionMapperNodes: IntegrationVersionMapperNode[];

  constructor(metadata?: TNodeMetadata) {
    this.versionMapperListNode = new IntegrationVersionMapperListNode(metadata);
  }

  public withVersionMappers(
    versionMapperNodes: IntegrationVersionMapperNode[],
  ): IntegrationVersionMapperListNodeBuilder {
    this.versionMapperNodes = versionMapperNodes;
    return this;
  }

  public build(): IntegrationVersionMapperListNode {
    this.versionMapperNodes.forEach((versionMapper) => {
      this.versionMapperListNode.addChild(versionMapper);
    });
    this.versionMapperListNode.buildArrayValue();

    return this.versionMapperListNode;
  }
}
