import { ClassTypes, BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { repoAdapterKey } from '../../../../types.js';
import { ClassTypeNode } from './ClassTypeNode.js';
import { TNodeMetadata } from './IntermediateASTNode.js';

export class RepoAdapterNode extends ClassTypeNode {
  private static classType = ClassTypes.RepoAdapter;
  private static classNodeName = repoAdapterKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RepoAdapterNode.classType,
      nodeType: BitloopsTypesMapping.TRepoAdapter,
      metadata,
      classNodeName: RepoAdapterNode.classNodeName,
    });
  }
}
