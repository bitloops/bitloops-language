import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { EntityDeclarationNode } from '../../../../../../ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { TGetFieldPrimitives } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { RootEntityDeclarationNode } from '../../../../../../ast/core/intermediate-ast/nodes/RootEntity/RootEntityDeclarationNode.js';

export const getEntityPrimitivesObject = (
  model: IntermediateASTTree,
  entityIdentifier: string,
): TGetFieldPrimitives => {
  let entityNode: EntityDeclarationNode | RootEntityDeclarationNode;
  entityNode = model.getEntityByIdentifier(entityIdentifier) as EntityDeclarationNode;
  if (entityNode === null) {
    entityNode = model.getRootEntityByIdentifier(entityIdentifier) as RootEntityDeclarationNode;
  }

  const propsNode = model.getPropsNodeOfEntity(entityNode);
  const fieldPrimitives = propsNode.getFieldsPrimitives(model);
  return fieldPrimitives;
};
