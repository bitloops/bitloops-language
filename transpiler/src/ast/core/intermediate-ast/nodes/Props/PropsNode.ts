import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../../target/typescript/core/modelToTargetLanguage.js';
import { BitloopsPrimTypeIdentifiers } from '../../../../../target/typescript/core/type-identifiers/bitloopsPrimType.js';
import { bitloopsIdentifiersTypeKey } from '../../../../../types.js';
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { PropsIdentifierNode } from './PropsIdentifierNode.js';

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

  public getFieldsPrimitives(tree: IntermediateASTTree): Record<string, any> {
    const fieldNodes = this.getFieldListNode().getFieldNodes();
    const primitivesValues = {};
    fieldNodes.forEach((fieldNode) => {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeValue();

      let typeTarget;
      if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
        const res = modelToTargetLanguage({
          type: BitloopsTypesMapping.TBitloopsPrimaryType,
          value: { type },
        });
        typeTarget = res.output;
        primitivesValues[identifier] = typeTarget;
      } else if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
        typeTarget = BitloopsPrimTypeIdentifiers.builtInClassToPrimitiveType(type);
        primitivesValues[identifier] = typeTarget;
      } else if (BitloopsPrimTypeIdentifiers.isBitloopsValueObjectIdentifier(type)) {
        const valueObject = tree.getValueObjectByIdentifier(type[bitloopsIdentifiersTypeKey]);
        const propsNode = tree.getPropsNodeOfValueObject(valueObject);
        const fieldPrimitives = propsNode.getFieldsPrimitives(tree);
        primitivesValues[identifier] = {};
        for (const [fieldPrimitiveKey, fieldPrimitiveValue] of Object.entries(fieldPrimitives)) {
          primitivesValues[identifier][fieldPrimitiveKey] = fieldPrimitiveValue;
        }
      }
    });
    return primitivesValues;
  }
}
