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
  optional?: boolean;
};
export type StandardVOType = {
  type: PrimitiveObjectPropertyType.StandardVO;
  identifier: string;
  optional?: boolean;
};
export type ValueObjectPrimitives = {
  type: PrimitiveObjectPropertyType.ValueObject;
  identifier: string;
  optional?: boolean;
};

export type EntityPrimitives = {
  type: PrimitiveObjectPropertyType.Entity;
  identifier: string;
  optional?: boolean;
};

export type TArrayPropertyValue = {
  type: PrimitiveObjectPropertyType.Array;
  value: TGetFieldPrimitivesValue;
  optional?: boolean;
};

export type TGetFieldPrimitivesValue =
  | PrimitiveType // primitive, e.g. 'string', 'number', 'boolean'
  | ValueObjectPrimitives
  | StandardVOType
  | EntityPrimitives
  | TArrayPropertyValue;
export type TGetFieldPrimitives = Record<PropertyName, TGetFieldPrimitivesValue>;
