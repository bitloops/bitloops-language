Let's consider that we would like to create a test element that in Bitloops Language(BL) would look like this:

### BL

```antlr
Test MyTest {
    string name;
    string description;
}
```

We would have to create the syntax using Antlr in lexer and parser as below:

### Lexer

```antlr
Test:               'Test';
TestIdentifier:     UpperCaseStart IdentifierPart* Test;
```

### Parser

```antlr
testIdentifier
    : TestIdentifier
    ;

testDeclaration
    : Test testIdentifier OpenBrace fieldList CloseBrace
    ;

// Here add the new element in the source elements of the program
sourceElement
    :
    .....
    | testDeclaration
    ;
```

Then we would have to create the visitors of the new elements:

### Visitor

In visitor we create a tree with nodes that include all the information of the element and each node has it's children nodes.
In order to build that tree of nodes, we use builders.

#### TestDeclaration

`TestDeclaration` is a class type element (like Entity, Value Object, etc...) and that means that we have to add a node under the root of the tree. That's why we are not returning anything in this visitor, because the `TestNodeBuilder` will just take care of this and add the `TestDeclarationNode` under the root of the tree.
Each visitor that we are calling (e.g. `thisVisitor.visit(ctx.testIdentifier())`), returns it's corresponding node which is built by it's builder.

```ts
visitTestDeclaration(ctx: BitloopsParser.TestDeclarationContext): void {
    testDeclarationVisitor(this, ctx);
}

export const testDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.TestDeclarationContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const testIdentifierNode: TestIdentifierNode = thisVisitor.visit(ctx.testIdentifier());
  const fieldListNode: FieldListNode = thisVisitor.visit(ctx.fieldList());

  new TestNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(testIdentifierNode)
    .withFieldList(fieldListNode)
    .build();
};
```

#### TestIdentifier

Here we have the `TestIdentifier` visitor that is returning the `TestIdentifierNode` by the `TestIdentifierNodeBuilder`. That's how `testDeclarationVisitor` has the information that it needs in order to continue.

```ts
visitTestIdentifier(ctx: BitloopsParser.TestIdentifierContext): TestIdentifierNode {
    const metadata = produceMetadata(ctx, this);

    const testIdentifier = ctx.TestIdentifier().getText();
    const testIdentifierNode = new TestIdentifierNodeBuilder(metadata)
      .withName(testIdentifier)
      .build();

    return testIdentifierNode;
}
```

### Nodes

All the nodes are classes that have a name, a type and some metadata(includes the start/end lines of the element).

#### IntermediateASTNode

`addChild`:

`addSibling`:

`buildObjectValue`:

`buildArrayValue`:

`buildLeafValue`:

#### IntermediateASTTree

`insertChild`: It inserts its child to currentNode and makes it the new currentNode.

`insertSibling`: It inserts the node as child to the parent of the currentNode and makes it the new currentNode.

#### TestDeclaration

`TestDeclarationNode` is a class type node as we said, so it has to extend `ClassTypeNode`. This node has also class type attribute.

```ts
export class TestDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.Test;
  private static classNodeName = "test";

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: TestDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TTest,
      metadata,
      classNodeName: TestDeclarationNode.classNodeName,
    });
  }
}
```

#### TestIdentifier

`TestIdentifierNode` is an identifier node, so it has to extend `IntermediateASTIdentifierNode`.

```ts
export class TetsIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = "testIdentifier";

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TTestIdentifier,
      TetsIdentifierNode.classNodeName,
      metadata
    );
  }
}
```

#### FieldListNode

`FieldListNode` is a simple node, so it has to extend `IntermediateASTNode`. This node and it's visitor is already implemented, but it can be reused and is a great example to show all the possible cases.

```ts
export class FieldListNode extends IntermediateASTNode {
  private static classNodeName = "fields";

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TFieldList,
      metadata,
      FieldListNode.classNodeName
    );
  }
}
```

#### FieldNode

`FieldNode` is a simple node as well, so it has to extend `IntermediateASTNode`.

```ts
export class FieldNode extends IntermediateASTNode {
  private static classNodeName = "field";

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TField, metadata, FieldNode.classNodeName);
  }
}
```

### Builders

Builders are following the [builder pattern](https://refactoring.guru/design-patterns/builder) and its one of them builds a node. Each `with...` method takes a node argument and returns itself.

#### TestDeclaration

`TestDeclarationNodeBuilder` builds `TestDeclarationNode` which is a class type node. This builder, as we said before, is responsible for adding the class type node under the root of the tree. So, it takes as argument the tree and in the build method it inserts to it it's children and sets the current node to root again. It also builds its value by calling `buildObjectValue` method. Builders that build class type nodes, also need to get the identifier name and set it as className to the class type node(here `TestDeclarationNode`). So, `withIdentifier` method is responsible for doing exactly this.

```ts
export class TestDeclarationNodeBuilder
  implements IBuilder<TestDeclarationNode>
{
  private testDeclarationNode: TestDeclarationNode;
  private identifierNode: TestIdentifierNode;
  private fieldListNode: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(
    intermediateASTTree: IntermediateASTTree,
    metadata?: TNodeMetadata
  ) {
    this.intermediateASTTree = intermediateASTTree;
    this.testDeclarationNode = new TestDeclarationNode(metadata);
  }

  public withIdentifier(
    testIdentifierNode: TestIdentifierNode
  ): TestDeclarationNodeBuilder {
    this.identifierNode = testIdentifierNode;
    const testName = testIdentifierNode.getIdentifierName();
    this.testDeclarationNode.setClassName(testName);
    return this;
  }

  public withFieldList(
    fieldListNode: FieldListNode
  ): TestDeclarationNodeBuilder {
    this.fieldListNode = fieldListNode;
    return this;
  }

  public build(): TestDeclarationNode {
    this.intermediateASTTree.insertChild(this.testDeclarationNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.fieldListNode);

    this.intermediateASTTree.setCurrentNodeToRoot();

    this.testDeclarationNode.buildObjectValue();

    return this.testDeclarationNode;
  }
}
```

#### TestIdentifier

`TestDeclarationNodeBuilder` builds `TestIdentifierNode`. It just builds its value by calling `buildLeafValue` method, because it's a leaf node. Here we don't need the `intermediateASTTree` we just handle the node, it is needed only in class type node builders.

```ts
export class TestIdentifierNodeBuilder implements IBuilder<TestIdentifierNode> {
  private testIdentifierNode: TestIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.testIdentifierNode = new TestIdentifierNode(metadata);
  }

  public withName(identifierName: string): TestIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): TestIdentifierNode {
    this.testIdentifierNode.buildLeafValue(this.name);

    return this.testIdentifierNode;
  }
}
```

#### FieldListNode

`FieldListNodeBuilder` builds `FieldListNode`. It adds in this node all the fieldNodes children and builds its value by calling `buildArrayValue` method.

```ts
export class FieldListNodeBuilder implements IBuilder<FieldListNode> {
  private fieldListNode: FieldListNode;
  private fieldNodes: FieldNode[];

  constructor(metadata?: TNodeMetadata) {
    this.fieldListNode = new FieldListNode(metadata);
  }

  public withFields(fields: FieldNode[]): FieldListNodeBuilder {
    this.fieldNodes = fields;
    return this;
  }

  public build(): FieldListNode {
    if (this.fieldNodes) {
      this.fieldNodes.forEach((fieldNode) => {
        this.fieldListNode.addChild(fieldNode);
      });
    }
    this.fieldListNode.buildArrayValue();

    return this.fieldListNode;
  }
}
```

#### FieldNode

`FieldNodeBuilder` builds `FieldNode`. It adds in this node all of its children and builds its value by calling `buildObjectValue` method.

```ts
export class FieldNodeBuilder implements IBuilder<FieldNode> {
  private typeNode: BitloopsPrimaryTypeNode;
  private identifierNode: IdentifierNode;
  private optionalNode?: OptionalNode;
  private fieldNode: FieldNode;

  constructor() {
    this.fieldNode = new FieldNode();
  }

  public withType(typeNode: BitloopsPrimaryTypeNode): FieldNodeBuilder {
    this.typeNode = typeNode;
    return this;
  }

  public withName(identifierNode: IdentifierNode): FieldNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withOptional(optionalNode: OptionalNode): FieldNodeBuilder {
    this.optionalNode = optionalNode;
    return this;
  }

  public build(): FieldNode {
    this.fieldNode.addChild(this.typeNode);
    this.fieldNode.addChild(this.identifierNode);
    if (this.optionalNode) this.fieldNode.addChild(this.optionalNode);

    this.fieldNode.buildObjectValue();

    return this.fieldNode;
  }
}
```
