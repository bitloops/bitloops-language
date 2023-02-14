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
import { ArrayPrimaryTypeBuilder } from '../../intermediate-ast/builders/BitloopsPrimaryType/ArrayPrimaryTypeBuilder.js';
import { ArrayPrimaryTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/ArrayPrimaryTypeNode.js';
import { PrimitiveTypeBuilder } from '../../intermediate-ast/builders/BitloopsPrimaryType/PrimitiveTypeBuilder.js';
import { PrimitiveTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/PrimitiveTypeNode.js';
import { BitloopsPrimaryTypeBuilder } from '../../intermediate-ast/builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { produceMetadata } from '../metadata.js';

export const bitloopsPrimaryTypeVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BitloopsPrimaryTypeContext,
): BitloopsPrimaryTypeNode => {
  const metadata = produceMetadata(ctx, _thisVisitor);
  const [primaryTypeNode] = _thisVisitor.visitChildren(ctx);
  const bitloopsPrimaryTypeNode = new BitloopsPrimaryTypeBuilder(metadata)
    .withPrimaryType(primaryTypeNode)
    .build();
  return bitloopsPrimaryTypeNode;
};

export const primitivePrimTypeVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PrimitivePrimTypeContext,
): PrimitiveTypeNode => {
  const metadata = produceMetadata(ctx, _thisVisitor);
  const primitiveType = ctx.primitives().getText();
  const primitiveTypeNode = new PrimitiveTypeBuilder(metadata).withType(primitiveType).build();
  return primitiveTypeNode;
};

export const arrayBitloopsPrimTypeVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ArrayBitloopsPrimTypeContext,
): ArrayPrimaryTypeNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const value = thisVisitor.visit(ctx.bitloopsPrimaryTypeValues());
  const arrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder(metadata)
    .withPrimaryType(value)
    .build();

  return arrayBitloopsPrimaryTypeNode;
  // return {
  //   arrayType: {
  //     value,
  //   },
  // };
};
