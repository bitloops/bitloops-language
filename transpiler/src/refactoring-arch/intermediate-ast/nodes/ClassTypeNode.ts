import { TBitloopsTypesValues, TClassTypesValues } from '../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

type TClassTypeNodeParams = {
  classType: TClassTypesValues;
  nodeType: TBitloopsTypesValues;
  metadata: TNodeMetadata;
  classNodeName: string;
};
export abstract class ClassTypeNode extends IntermediateASTNode {
  private classType: TClassTypesValues;
  private className: string;

  constructor({ classType, nodeType, metadata, classNodeName }: TClassTypeNodeParams) {
    super(nodeType, metadata, classNodeName);
    this.classType = classType;
  }

  getClassType(): TClassTypesValues {
    return this.classType;
  }

  setClassName(className): void {
    this.className = className;
  }

  getClassName(): string {
    return this.className;
  }
}
