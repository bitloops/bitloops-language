export enum PrimitiveObjectPropertyType {
  Primitive,
  StandardVO,
  ValueObject,
  Entity,
  Array,
}

type PropertyName = string;
export type PrimitiveType = {
  type: PrimitiveObjectPropertyType.Primitive;
  value: string;
};
export type StandardVOType = {
  type: PrimitiveObjectPropertyType.StandardVO;
  identifier: string;
};
export type ValueObjectPrimitives = {
  type: PrimitiveObjectPropertyType.ValueObject;
  identifier: string;
};

export type EntityPrimitives = {
  type: PrimitiveObjectPropertyType.Entity;
  identifier: string;
};

export type TArrayPropertyValue = {
  type: PrimitiveObjectPropertyType.Array;
  value: TGetFieldPrimitivesValue;
};

export type TGetFieldPrimitivesValue =
  | PrimitiveType // primitive, e.g. 'string', 'number', 'boolean'
  | ValueObjectPrimitives
  | StandardVOType
  | EntityPrimitives
  | TArrayPropertyValue;
export type TGetFieldPrimitives = Record<PropertyName, TGetFieldPrimitivesValue>;
