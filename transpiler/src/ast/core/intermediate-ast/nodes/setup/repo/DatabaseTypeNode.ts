import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TRepoSupportedTypes } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class DatabaseTypeNode extends IntermediateASTNode {
  private static classNodeName = 'dbType';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoDatabaseType, metadata, DatabaseTypeNode.classNodeName);
  }

  public getDBType(): TRepoSupportedTypes {
    const dbTypeClassNodeName = this.getClassNodeName();
    const dbTypeValue = this.getValue();
    const dbType: TRepoSupportedTypes = dbTypeValue[dbTypeClassNodeName];
    return dbType;
  }
}
