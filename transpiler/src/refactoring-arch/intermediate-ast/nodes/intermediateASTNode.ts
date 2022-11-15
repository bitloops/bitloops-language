export abstract class IntermediateASTNode {
  private type: NODE_TYPES;
  private classType: CLASS_TYPES;
  private children: IntermediateASTNode[];
  private nextSibling: IntermediateASTNode;
  private parent: IntermediateASTNode;
  private lines: string; // e.g. 15-18

  public getParent(): IntermediateASTNode {
    return this.parent;
  }

  public getChildren(): IntermediateASTNode[] {
    return this.children;
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

  public getType(): string {
    return this.type;
  }
}
