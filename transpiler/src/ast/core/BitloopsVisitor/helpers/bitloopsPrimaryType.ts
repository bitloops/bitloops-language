/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */

import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { ArrayPrimaryTypeBuilder } from '../../../../refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/ArrayPrimaryTypeBuilder.js';
import { ArrayPrimaryTypeNode } from '../../../../refactoring-arch/intermediate-ast/nodes/BitloopsPrimaryType/ArrayPrimaryTypeNode.js';
import { PrimitiveTypeBuilder } from '../../../../refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/PrimitiveTypeBuilder.js';
import { PrimitiveTypeNode } from '../../../../refactoring-arch/intermediate-ast/nodes/BitloopsPrimaryType/PrimitiveTypeNode.js';
import { BitloopsPrimaryTypeBuilder } from '../../../../refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../../../refactoring-arch/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';

export const bitloopsPrimaryTypeVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BitloopsPrimaryTypeContext,
): BitloopsPrimaryTypeNode => {
  console.log('bitloopsPrimaryTypeVisitor');
  const [primaryType] = _thisVisitor.visitChildren(ctx);
  const primaryTypeNode = new BitloopsPrimaryTypeBuilder().withType(primaryType).build();
  return primaryTypeNode;
};

export const primitivePrimTypeVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PrimitivePrimTypeContext,
): PrimitiveTypeNode => {
  const primitiveType = ctx.primitives().getText();
  const primitiveTypeNode = new PrimitiveTypeBuilder().withType(primitiveType).build();
  return primitiveTypeNode;
};

export const arrayBitloopsPrimTypeVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ArrayBitloopsPrimTypeContext,
): ArrayPrimaryTypeNode => {
  const value = thisVisitor.visit(ctx.bitloopsPrimaryTypeValues());
  const arrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder().withPrimaryType(value).build();

  return arrayBitloopsPrimaryTypeNode;
  // return {
  //   arrayType: {
  //     value,
  //   },
  // };
};
