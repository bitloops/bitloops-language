import { BitloopsTypesMapping, TBitloopsTypesValues } from '../../../../helpers/mappings.js';
import { ValidationError } from '../../types.js';
import { StatementListNode } from './statements/StatementList.js';

export type TNodeLineData = {
  line: number;
  column: number;
};
export type TNodeMetadata = {
  start: TNodeLineData;
  end: TNodeLineData;
  fileId?: string;
};

export const ROOT_TYPE = 'Root';
export type TNodeType = TBitloopsTypesValues | typeof ROOT_TYPE;

export class IntermediateASTNodeValidationError extends ValidationError {}

export abstract class IntermediateASTNode {
  protected nodeType: TNodeType;
  private children: IntermediateASTNode[];
  private nextSibling: IntermediateASTNode;
  private parent: IntermediateASTNode;
  private metaData: TNodeMetadata;
  private value: any;
  protected classNodeName: string;

  constructor(nodeType: TNodeType, metadata: TNodeMetadata, classNodeName: string) {
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

  public getNodeType(): TNodeType {
    return this.nodeType;
  }

  public setNodeType(nodeType: TBitloopsTypesValues): void {
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

  public isRoot(): boolean {
    return this.nodeType === ROOT_TYPE;
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

  public removeChild(childNode: IntermediateASTNode): void {
    const index = this.children.indexOf(childNode);
    if (index === -1) throw new Error('Could not find child');
    if (index > 0) {
      const previousSibling = this.children[index - 1];
      previousSibling.addSibling(null);
    }
    this.children.splice(index, 1);
  }

  public replaceChild(
    childNodeTobeReplaced: IntermediateASTNode,
    newChildNode: IntermediateASTNode,
  ): void {
    newChildNode.setParent(this);
    const index = this.children.indexOf(childNodeTobeReplaced);
    if (index === -1) throw new Error('Could not find child');
    if (index > 0) {
      const previousSibling = this.children[index - 1];
      previousSibling.addSibling(newChildNode);
    }
    this.children.splice(index, 1, newChildNode);
  }

  private addSibling(siblingNode: IntermediateASTNode): void {
    this.nextSibling = siblingNode;
  }

  public getFirstChild(): IntermediateASTNode {
    return this.children[0];
  }

  public getNextSibling(): IntermediateASTNode | null {
    return this.nextSibling ?? null;
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

  public validate(_symbolTable?: Set<string>): void | IntermediateASTNodeValidationError {
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
  getStatementListNode(): StatementListNode | null {
    return this.getChildNodeByType(BitloopsTypesMapping.TStatements) as StatementListNode;
  }

  IsStatementListNode(): boolean {
    return this.nodeType === BitloopsTypesMapping.TStatements;
  }

  IsEntityIdentifierNode(): boolean {
    return this.nodeType === BitloopsTypesMapping.TEntityIdentifier;
  }

  protected getChildNodeByType<T extends IntermediateASTNode>(
    nodeType: TBitloopsTypesValues,
  ): T | null {
    const children = this.getChildren();
    return (children.find((child) => child.getNodeType() === nodeType) as T) ?? null;
  }

  protected getChildrenNodesByType<T extends IntermediateASTNode>(
    nodeType: TBitloopsTypesValues,
  ): Array<T> | [] {
    const children = this.getChildren();
    return (children.filter((child) => child.getNodeType() === nodeType) as T[]) ?? null;
  }
}
