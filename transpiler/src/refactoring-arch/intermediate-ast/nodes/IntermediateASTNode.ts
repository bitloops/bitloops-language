import { TBitloopsTypesValues } from '../../../helpers/mappings.js';

export type TNodeMetadata = {
  lines: string;
};

export abstract class IntermediateASTNode {
  private nodeType: TBitloopsTypesValues;
  private children: IntermediateASTNode[];
  private nextSibling: IntermediateASTNode;
  private parent: IntermediateASTNode;
  private metaData: TNodeMetadata;
  private value: any;
  private name: string;

  constructor(
    nodeType: TBitloopsTypesValues,
    metadata: TNodeMetadata = { lines: '10' },
    name: string,
  ) {
    this.nodeType = nodeType;
    this.metaData = metadata;
    this.children = [];
    this.name = name;
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

  public getParent(): IntermediateASTNode {
    return this.parent;
  }

  public getChildren(): IntermediateASTNode[] {
    return this.children;
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

  public buildArrayValue() {
    this.value = [];
    const children = this.getChildren();
    children.forEach((child) => {
      this.value.push(child.value);
    });
  }

  public buildObjectValue() {
    const children = this.getChildren();
    this.value = { [this.name]: {} };
    children.forEach((child) => {
      this.value[this.name][child.name] = child.value;
    });
  }

  public buildObject2Value() {
    const children = this.getChildren();
    this.value = { [this.name]: {} };
    children.forEach((child) => {
      this.value[this.name] = { ...this.value[this.name], ...child.value };
    });
  }
}
