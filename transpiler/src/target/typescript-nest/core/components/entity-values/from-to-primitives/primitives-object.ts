import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { EntityDeclarationNode } from '../../../../../../ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { PropsNode } from '../../../../../../ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { TGetFieldPrimitives } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { RootEntityDeclarationNode } from '../../../../../../ast/core/intermediate-ast/nodes/RootEntity/RootEntityDeclarationNode.js';
import { ValueObjectDeclarationNode } from '../../../../../../ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';

export const getPrimitivesObject = (
  model: IntermediateASTTree,
  classTypeIdentifier: string,
): TGetFieldPrimitives => {
  model.getClassTypeNodes;
  const classTypeNode = model.getClassTypeByIdentifier(classTypeIdentifier);
  if (!classTypeNode) throw new Error(`ClassTypeNode not found for ${classTypeIdentifier}`);

  let propsNode: PropsNode;
  if (classTypeNode instanceof ValueObjectDeclarationNode) {
    propsNode = model.getPropsNodeOfValueObject(classTypeNode);
  } else if (
    classTypeNode instanceof EntityDeclarationNode ||
    classTypeNode instanceof RootEntityDeclarationNode
  ) {
    propsNode = model.getPropsNodeOfEntity(classTypeNode);
  }
  if (!propsNode) throw new Error(`PropsNode not found for ${classTypeIdentifier}`);

  const fieldPrimitives = propsNode.getFieldsPrimitives(model);
  return fieldPrimitives;
};
