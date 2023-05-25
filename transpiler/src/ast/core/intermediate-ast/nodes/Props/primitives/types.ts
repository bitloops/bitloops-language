// const a: TGetFieldPrimitives = {
//   id: 'string',
//   name: 'string',
//   status: {
//     status: {
//       primitiveValue: 'string',
//       identifier: 'StatusVO',
//     },
//   },
// };
// TODO Better use an Enum with a type field, for each different type of possible value
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
// TODO Fix standard VOs, they should be done just like regular VOs, calling their respective fromPrimitives & toPrimitives
export type StandardVOType = {
  type: PrimitiveObjectPropertyType.StandardVO;
  // Uncomment this?
  // identifier: string;
  value: ValueObjectPrimitives; // We should StandardVO just as a ValueObjects
};
export type ValueObjectPrimitives = {
  type: PrimitiveObjectPropertyType.ValueObject;
  identifier: string;
  value: TGetFieldPrimitives;
};

export type EntityPrimitives = {
  type: PrimitiveObjectPropertyType.Entity;
  identifier: string;
};
// PropertyName,
//   {
//     primitiveValue: TGetFieldPrimitivesValue; // this is the recursive value
//     identifier?: string; // This is the vo identifier, repeated for each field for some reason
//     isStandardVO?: boolean;
//   }
// >;

export type TArrayPropertyValue = {
  type: PrimitiveObjectPropertyType.Array;
  value: TGetFieldPrimitivesValue;
};

export type TGetFieldPrimitivesValue =
  | PrimitiveType // primitive, e.g. 'string', 'number', 'boolean'
  | ValueObjectPrimitives
  | EntityPrimitives
  | TArrayPropertyValue;
export type TGetFieldPrimitives = Record<PropertyName, TGetFieldPrimitivesValue>;
