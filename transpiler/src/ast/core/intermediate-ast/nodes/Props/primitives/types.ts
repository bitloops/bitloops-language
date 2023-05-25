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
  Array,
}

type PropertyName = string;
export type PrimitiveType = {
  type: PrimitiveObjectPropertyType.Primitive;
  value: string;
};
export type StandardVOType = {
  type: PrimitiveObjectPropertyType.StandardVO;
  value: ValueObjectPrimitives; // We should StandardVO just as a ValueObjects
};
// value object, e.g. { status: { status: { primitiveValue: 'string', identifier: 'StatusVO' }} }
export type ValueObjectPrimitives = {
  type: PrimitiveObjectPropertyType.ValueObject;
  identifier: string;
  value: TGetFieldPrimitives;
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
  | TArrayPropertyValue; // [TGetFieldPrimitivesValue]; // array of any of the above
export type TGetFieldPrimitives = Record<PropertyName, TGetFieldPrimitivesValue>;
