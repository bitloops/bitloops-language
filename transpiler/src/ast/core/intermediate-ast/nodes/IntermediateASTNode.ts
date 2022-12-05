import { TBitloopsTypesValues } from '../../../../helpers/mappings.js';
import { IntermediateASTValidationError } from '../../types.js';

export type TNodeLineData = {
  line: number;
  column: number;
};
export type TNodeMetadata = {
  start: TNodeLineData;
  end: TNodeLineData;
  fileId?: string;
};

export class IntermediateASTNodeValidationError extends IntermediateASTValidationError {}

export abstract class IntermediateASTNode {
  protected nodeType: TBitloopsTypesValues;
  private children: IntermediateASTNode[];
  private nextSibling: IntermediateASTNode;
  private parent: IntermediateASTNode;
  private metaData: TNodeMetadata;
  private value: any;
  protected classNodeName: string;

  constructor(nodeType: TBitloopsTypesValues, metadata: TNodeMetadata, classNodeName: string) {
    this.nodeType = nodeType;
    this.metaData = metadata;
    this.children = [];
    this.classNodeName = classNodeName;
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(value: any): any {
    this.value = value;
  }

  public getNodeType(): TBitloopsTypesValues {
    return this.nodeType;
  }

  public setNodeType(nodeType: string) {
    this.nodeType = nodeType;
  }

  public setClassNodeName(classNodeName: string) {
    this.classNodeName = classNodeName;
  }

  public getClassNodeName(): string {
    return this.classNodeName;
  }

  public getParent(): IntermediateASTNode {
    return this.parent;
  }

  public getChildren(): IntermediateASTNode[] {
    return this.children;
  }
  public isLeaf(): boolean {
    return this.children.length == 0;
  }

  public getMetadata(): TNodeMetadata {
    return this.metaData;
  }

  public setMetadata(metaData: TNodeMetadata) {
    this.metaData = metaData;
  }

  private setParent(parent: IntermediateASTNode) {
    this.parent = parent;
  }

  public addChild(childNode: IntermediateASTNode): void {
    childNode.setParent(this);
    const numOfChildren = this.children.length;
    if (numOfChildren > 0) {
      const previousSibling = this.children[numOfChildren - 1];
      previousSibling.addSibling(childNode);
    }
    this.children.push(childNode);
  }

  private addSibling(siblingNode: IntermediateASTNode): void {
    this.nextSibling = siblingNode;
  }

  public getFirstChild(): IntermediateASTNode {
    return this.children[0];
  }

  public getNextSibling(): IntermediateASTNode {
    return this.nextSibling;
  }

  public hasChildren(): boolean {
    return this.children.length > 0;
  }

  public buildArrayValue(): void {
    const children = this.getChildren();
    this.value = { [this.classNodeName]: [] };
    children.forEach((child) => {
      this.value[this.classNodeName].push(child.value);
    });
  }

  public buildLeafValue(value: any): void {
    this.value = {
      [this.classNodeName]: value,
    };
  }

  public buildObjectValue(): void {
    const children = this.getChildren();
    this.value = { [this.classNodeName]: {} };
    children.forEach((child) => {
      this.value[this.classNodeName] = { ...this.value[this.classNodeName], ...child.value };
    });
  }

  public validate(): void | IntermediateASTNodeValidationError {
    return;
  }

  static isIntermediateASTNodeValidationError(
    value: void | IntermediateASTNodeValidationError,
  ): value is IntermediateASTNodeValidationError {
    if (value instanceof IntermediateASTNodeValidationError) {
      return true;
    }
    return false;
  }
}
