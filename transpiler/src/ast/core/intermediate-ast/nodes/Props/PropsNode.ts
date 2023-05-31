import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TBitloopsPrimitives, TValueObjectIdentifier } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { PropsIdentifierNode } from './PropsIdentifierNode.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { TGetFieldPrimitives } from './primitives/types.js';
import { PrimitivesObject } from './primitives/index.js';

export class PropsNode extends ClassTypeNode {
  private static classType = ClassTypes.Props;
  private static classNodeName = 'Props';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: PropsNode.classType,
      nodeType: BitloopsTypesMapping.TProps,
      metadata,
      classNodeName: PropsNode.classNodeName,
    });
  }

  public getPropsIdentifierNode(): PropsIdentifierNode {
    const identifierNode: PropsIdentifierNode = this.getChildNodeByType(
      BitloopsTypesMapping.TPropsIdentifier,
    );
    return identifierNode;
  }

  public getIdentifierValue(): string {
    const identifierNode: PropsIdentifierNode = this.getPropsIdentifierNode();
    return identifierNode.getValue().propsIdentifier;
  }

  public getFieldListNode(): FieldListNode {
    const fieldListNode: FieldListNode = this.getChildNodeByType(BitloopsTypesMapping.TVariables);
    return fieldListNode;
  }

  public getFieldTypes(): Record<string, BitloopsPrimaryTypeNode> {
    const fieldNodes = this.getFieldListNode().getFieldNodes();
    const fieldTypes: Record<string, BitloopsPrimaryTypeNode> = {};
    fieldNodes.forEach((fieldNode) => {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeNode();
      fieldTypes[identifier] = type;
    });
    return fieldTypes;
  }

  public getFieldNodeType(identifier: string): string {
    const fieldTypes = this.getFieldTypes();
    const fieldType = fieldTypes[identifier];
    if (!fieldType) return null;
    return fieldType.getInferredType();
  }

  public getFieldsPrimitives(tree: IntermediateASTTree): TGetFieldPrimitives {
    const fieldNodes = this.getFieldListNode().getFieldNodes();
    const primitivesValues = {};
    for (const fieldNode of fieldNodes) {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeValue();
      const isOptional = fieldNode.isOptional();

      const propertyValue = PrimitivesObject.getPrimitiveValue(type, isOptional, tree);
      primitivesValues[identifier] = propertyValue;
    }

    return primitivesValues;
  }

  public getPrimitiveFields(): Array<{ fieldValue: string; fieldType: TBitloopsPrimitives }> {
    const fieldListNode: FieldListNode = this.getFieldListNode();
    return fieldListNode.getPrimitiveFields();
  }

  public getValueObjectFields(): Array<{ fieldValue: string; fieldType: TValueObjectIdentifier }> {
    const fieldListNode: FieldListNode = this.getFieldListNode();
    return fieldListNode.getValueObjectFields();
  }

  public hasOnlyOnePrimitiveField():
    | { result: true; type: TBitloopsPrimitives }
    | { result: false } {
    const fieldListNode: FieldListNode = this.getFieldListNode();
    return fieldListNode.hasOnlyOnePrimitiveField();
  }
}
