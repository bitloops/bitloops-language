class TagNode {
  // private attributes: string;
  private children: TagNode[] = [];
  private parent: TagNode;
  // private value: string = '';

  constructor(private tagName: string) {
    this.tagName = tagName;
  }

  public add(tagNode: TagNode): void {
    this.children.push(tagNode);
  }

  // public addValue(value: string): void {
  //     this.value = value;
  // }

  public setParent(parent: TagNode) {
    this.parent = parent;
  }

  public getParent() {
    return this.parent;
  }

  public toString(): string {
    let res = '<' + this.tagName + '>';
    this.children.forEach((tagNode) => {
      res += tagNode.toString();
    });
    // return `<${this.tagName}>`
    res += '</' + this.tagName + '>';
    return res;
  }
}
class TagBuilder {
  private rootNode: TagNode;
  private currentNode: TagNode;

  constructor(rootTagName: string) {
    this.rootNode = new TagNode(rootTagName);
    this.currentNode = this.rootNode;
  }

  public addChild(childTagName: string): void {
    const parentNode: TagNode = this.currentNode;
    this.currentNode = new TagNode(childTagName);
    parentNode.add(this.currentNode);
  }

  public toXml(): string {
    return this.rootNode.toString();
  }
}
const tagBuilderXML = new TagBuilder('flavors').toXml();
console.log('tagBuilderXML', tagBuilderXML);

const tagBuilderWithChildren = new TagBuilder('flavors');
tagBuilderWithChildren.addChild('flavor');
const xmlWithChildren = tagBuilderWithChildren.toXml();
console.log('xmlWithChildren', xmlWithChildren);

const tagBuilderWithMoreChildren = new TagBuilder('flavors');
tagBuilderWithMoreChildren.addChild('flavor');
tagBuilderWithMoreChildren.addChild('requirements');
tagBuilderWithMoreChildren.addChild('requirement');
const xmlWithMoreChildren = tagBuilderWithMoreChildren.toXml();
console.log('xmlWithMoreChildren', xmlWithMoreChildren);
