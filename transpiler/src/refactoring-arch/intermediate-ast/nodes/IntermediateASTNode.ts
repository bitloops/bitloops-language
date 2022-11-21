import { TClassTypesValues, TBitloopsTypesValues } from '../../../helpers/mappings.js';

export abstract class IntermediateASTNode {
  private nodeType: TBitloopsTypesValues;
  private classType: TClassTypesValues;
  private children: IntermediateASTNode[];
  private nextSibling: IntermediateASTNode;
  private parent: IntermediateASTNode;
  private lines: string; // e.g. 15-18
  private value: any;
  private name: string;

  constructor(nodeType: TBitloopsTypesValues, lines = '10') {
    this.nodeType = nodeType;
    this.lines = lines;
    this.children = [];
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(value: any): any {
    this.value = value;
  }

  public getName(): any {
    return this.name;
  }

  public setName(name: any): any {
    this.name = name;
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
  public isLeaf(): boolean {
    return this.children.length == 0;
  }

  public getClassType(): TClassTypesValues {
    return this.classType;
  }

  public getLines(): string {
    return this.lines;
  }

  public setLines(value: string) {
    this.lines = value;
  }

  public setNodeType(value: TBitloopsTypesValues) {
    this.nodeType = value;
  }

  public setClassType(classType: TClassTypesValues): void {
    this.classType = classType;
  }

  private setParent(parent: IntermediateASTNode) {
    this.parent = parent;
  }

  private isRootNode(): boolean {
    return this.nodeType === 'Root';
  }

  public addChild(childNode: IntermediateASTNode): void {
    childNode.setParent(this);
    //set the classType when adding children
    if (!this.isRootNode()) {
      childNode.setClassType(this.classType);
    }
    const numOfChildren = this.children.length;
    if (numOfChildren > 0) {
      const previousSibling = this.children[numOfChildren - 1];
      previousSibling.addSibling(childNode);
    }
    this.children.push(childNode);
  }

  private addSibling(siblingNode: IntermediateASTNode): void {
    siblingNode.setClassType(this.classType);
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
}
