class TagNode {
  private attributes = '';
  private children: TagNode[] = [];
  private parent: TagNode = null;
  private value = '';

  constructor(private tagName: string) {
    this.tagName = tagName;
  }

  public add(childNode: TagNode): void {
    childNode.setParent(this);
    this.children.push(childNode);
  }

  public getName(): string {
    return this.tagName;
  }

  public setParent(parent: TagNode) {
    this.parent = parent;
  }

  public getParent() {
    return this.parent;
  }

  public addAttribute(attribute: string, value: string) {
    this.attributes += ' ';
    this.attributes += attribute;
    this.attributes += "='";
    this.attributes += value;
    this.attributes += "'";
  }
  public addValue(value: string): void {
    this.value = value;
  }

  public toString(): string {
    let res = '<' + this.tagName + this.attributes + '>';
    this.children.forEach((tagNode) => {
      res += tagNode.toString();
    });
    res += this.value + '</' + this.tagName + '>';
    return res;
  }
}
class TagBuilder {
  private rootNode: TagNode;
  private currentNode: TagNode;
  //   private parentNode: TagNode;

  constructor(rootTagName: string) {
    this.rootNode = new TagNode(rootTagName);
    this.currentNode = this.rootNode;
  }

  public addChild(childTagName: string): void {
    this.addTo(this.currentNode, childTagName);
  }

  public addSibling(siblingTagName: string): void {
    this.addTo(this.currentNode.getParent(), siblingTagName);
  }

  public addToParent(parentTagName: string, childTagName: string): void {
    const parentNode = this.findParentBy(parentTagName);
    if (!parentNode) throw new Error('missing parent tag: ' + parentTagName);
    this.addTo(parentNode, childTagName);
  }

  public addAttribute(name: string, value: string): void {
    this.currentNode.addAttribute(name, value);
  }

  public addValue(value): void {
    this.currentNode.addValue(value);
  }

  private addTo(parentNode: TagNode, tagName: string) {
    this.currentNode = new TagNode(tagName);
    parentNode.add(this.currentNode);
  }

  // implementation of chain of responsibility pattern
  private findParentBy(parentName: string) {
    let parentNode = this.currentNode;
    while (parentNode !== undefined && parentNode !== null) {
      if (parentName === parentNode.getName()) return parentNode;
      parentNode = parentNode.getParent();
    }
    return null;
  }

  public toXml(): string {
    return this.rootNode.toString();
  }
}

// (1)
// const tagBuilderXML = new TagBuilder('flavors').toXml();
// console.log('tagBuilderXML', tagBuilderXML);

// (2)
// const tagBuilderWithChildren = new TagBuilder('flavors');
// tagBuilderWithChildren.addChild('flavor');
// const xmlWithChildren = tagBuilderWithChildren.toXml();
// console.log('xmlWithChildren', xmlWithChildren);

//(3)
// const tagBuilderWithMoreChildren = new TagBuilder('flavors');
// tagBuilderWithMoreChildren.addChild('flavor');
// tagBuilderWithMoreChildren.addChild('requirements');
// tagBuilderWithMoreChildren.addChild('requirement');
// const xmlWithMoreChildren = tagBuilderWithMoreChildren.toXml();
// console.log('xmlWithMoreChildren', xmlWithMoreChildren);

// (4) adding sibling
// const siblingBuilder = new TagBuilder('flavors');
// siblingBuilder.addChild('flavor1');
// siblingBuilder.addSibling('flavor2');
// console.log('siblingBuilder.toXml()',siblingBuilder.toXml());

// //(5)

// const root = new TagNode('root');
// console.log('tagWithParents.getParent():', root.getParent());
// const tagChild = new TagNode('child');
// root.add(tagChild);
// console.log('tagWithParents.tagChild():', tagChild.getParent());

// const complexBuilder = new TagBuilder('flavors');
// for (let i = 0; i < 2; i++) {
//   complexBuilder.addToParent('flavors', 'flavor');
//   complexBuilder.addChild('requirements');
//   complexBuilder.addChild('requirement');
// }
// console.log('complexBuilder.toXml()', complexBuilder.toXml());

// (6) with attributes

// const builderWithAttributes = new TagBuilder('flavor');
// builderWithAttributes.addAttribute('name', 'Test-Driven Development');
// builderWithAttributes.addChild('requirements');
// builderWithAttributes.addToParent('requirements', 'requirement');
// builderWithAttributes.addAttribute('type', 'hardware');
// builderWithAttributes.addValue('1 computer for every 2 participants');
// builderWithAttributes.addToParent('requirements', 'requirement');
// builderWithAttributes.addAttribute('type', 'software');
// builderWithAttributes.addValue('IDE');

// console.log('builderWithAttributes', builderWithAttributes.toXml());
