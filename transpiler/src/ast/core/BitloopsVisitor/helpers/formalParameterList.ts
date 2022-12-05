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

import { produceMetadata } from './../metadata.js';
import { ParameterListNode } from './../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { ParameterListNodeBuilder } from './../../intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ParameterNodeBuilder } from './../../intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { ParameterIdentifierNodeBuilder } from './../../intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { BitloopsPrimaryTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { ParameterNode } from '../../intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { ParameterIdentifierNode } from '../../intermediate-ast/nodes/ParameterList/ParameterIdentifierNode.js';

export const formalParameterListVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.FormalParameterListContext,
): ParameterListNode => {
  const parameterFieldAndCommas = thisVisitor.visitChildren(ctx);
  const parameterFields = parameterFieldAndCommas.filter(
    (parameterField) => parameterField !== undefined,
  );
  const metadata = produceMetadata(ctx, thisVisitor);
  return new ParameterListNodeBuilder(metadata).withParameters(parameterFields).build();
};

export const formalParameterVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.FormalParameterContext,
): ParameterNode => {
  const type: BitloopsPrimaryTypeNode = thisVisitor.visit(ctx.typeAnnotation());
  const parameterIdentifier: ParameterIdentifierNode = thisVisitor.visit(
    ctx.formalParameterIdentifier(),
  );

  const metadata = produceMetadata(ctx, thisVisitor);
  return new ParameterNodeBuilder(metadata)
    .withIdentifier(parameterIdentifier)
    .withType(type)
    .build();
};

export const formalParameterArgIdentifierVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.FormalParameterIdentifierContext,
): ParameterIdentifierNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  return new ParameterIdentifierNodeBuilder(metadata)
    .withIdentifier(ctx.Identifier().getText())
    .build();
};
