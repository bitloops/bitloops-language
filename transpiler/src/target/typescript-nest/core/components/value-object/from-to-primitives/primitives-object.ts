import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { TGetFieldPrimitives } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';

export const getValueObjectPrimitivesObject = (
  model: IntermediateASTTree,
  voIdentifier: string,
): TGetFieldPrimitives => {
  const valueObjectNode = model.getValueObjectByIdentifier(voIdentifier);

  const propsNode = model.getPropsNodeOfValueObject(valueObjectNode);
  const fieldPrimitives = propsNode.getFieldsPrimitives(model);
  // This should not contain Entities, RootEntities etc, should be checked in the validation phase
  // (since we are handling props for ValueObjects)
  return fieldPrimitives;
};
