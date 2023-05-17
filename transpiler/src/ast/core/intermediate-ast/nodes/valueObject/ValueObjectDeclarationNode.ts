import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TPropsIdentifier } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { ConstDeclarationListNode } from '../ConstDeclarationListNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../methods/PrivateMethodDeclarationListNode.js';
import { PrivateMethodDeclarationNode } from '../methods/PrivateMethodDeclarationNode.js';
import { ConstDeclarationNode } from '../statements/ConstDeclarationNode.js';
import { ValueObjectIdentifierNode } from './ValueObjectIdentifierNode.js';

export class ValueObjectDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.ValueObject;
  private static classNodeName = 'ValueObject';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ValueObjectDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TValueObject,
      metadata,
      classNodeName: ValueObjectDeclarationNode.classNodeName,
    });
  }

  public getConstants(): ConstDeclarationNode[] {
    const constants = this.getChildrenNodesByType<ConstDeclarationNode>(
      BitloopsTypesMapping.TConstDeclaration,
    );
    if (!constants) {
      return [];
    }
    return constants;
  }

  public getConstDeclarationList(): ConstDeclarationListNode | null {
    return this.getChildNodeByType<ConstDeclarationListNode>(
      BitloopsTypesMapping.TConstDeclarationList,
    );
  }

  public getIdentifierValue(): string {
    const identifierNode = this.getChildNodeByType<ValueObjectIdentifierNode>(
      BitloopsTypesMapping.TValueObjectIdentifier,
    );
    if (!identifierNode) {
      throw new Error('Value object identifier not found');
    }
    return identifierNode.getIdentifierName();
  }

  public getCreateNode(): DomainCreateNode {
    const createNode = this.getChildNodeByType<DomainCreateNode>(
      BitloopsTypesMapping.TDomainCreateMethod,
    );
    if (!createNode) {
      throw new Error('Domain create not found');
    }
    return createNode;
  }

  public getPropsIdentifier(): TPropsIdentifier {
    const createNode = this.getCreateNode();
    const parameterNode = createNode.getParameterNode();
    const typeNode = parameterNode.getType();
    const identifierTypeNode = typeNode.getBitloopsIdentifierTypeNode();

    return identifierTypeNode.getIdentifierName();
  }

  getMethods(): PrivateMethodDeclarationNode[] {
    const privateMethodsList = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
    const privatecMethods = privateMethodsList.getPrivateMethodNodes();
    return privatecMethods;
  }

  getMethodList(): PrivateMethodDeclarationListNode {
    return this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    symbolTableManager.addClassTypeThis(this.getIdentifier().getIdentifierName());
    const constDeclarationList = this.getConstDeclarationList();
    if (constDeclarationList) {
      constDeclarationList.addToSymbolTable(symbolTableManager);
    }
    // constants.forEach((constant) => {
    //   const constantName = constant.getIdentifier().getValue().identifier;
    //   classTypeScope.insert(
    //     constantName,
    //     new VariableSymbolEntry(inferType({ node: constant.getExpressionValues() }), true),
    //   );
    // });

    const create = this.getCreateNode();
    create.addToSymbolTable(symbolTableManager);

    const methods = this.getMethodList();
    methods.addToSymbolTable(symbolTableManager);
  }
}
