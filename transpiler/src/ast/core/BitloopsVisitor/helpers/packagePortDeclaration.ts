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
import { PackageAdapterListNodeBuilder } from '../../intermediate-ast/builders/package/packageAdapters/PackageAdapterListNodeBuilder.js';
import { PackageNodeBuilder } from '../../intermediate-ast/builders/package/PackageNodeBuilder.js';
import { PackagePortIdentifierNodeBuilder } from '../../intermediate-ast/builders/package/packagePort/PackagePortIdentifierNodeBuilder.js';
import { PackagePortNodeBuilder } from '../../intermediate-ast/builders/package/packagePort/PackagePortNodeBuilder.js';
import { MethodDefinitionListNode } from '../../intermediate-ast/nodes/method-definitions/MethodDefinitionListNode.js';
import { PackagePortIdentifierNode } from '../../intermediate-ast/nodes/package/packagePort/PackagePortIdentifierNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

export const packagePortIdentifierVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PackagePortIdentifierContext,
): PackagePortIdentifierNode => {
  return new PackagePortIdentifierNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withName(ctx.PackagePortIdentifier().getText())
    .build();
};

export const packagePortDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PackagePortDeclarationContext,
): void => {
  const packagePortIdentifierNode: PackagePortIdentifierNode = thisVisitor.visit(
    ctx.packagePortIdentifier(),
  );
  const methodDefinitions: MethodDefinitionListNode = thisVisitor.visit(ctx.methodDefinitionList());

  const portNode = new PackagePortNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withIdentifier(packagePortIdentifierNode)
    .withMethodDefinitions(methodDefinitions)
    .build();

  const emptyAdapterListNode = new PackageAdapterListNodeBuilder().withAdapters([]).build();

  new PackageNodeBuilder(thisVisitor.intermediateASTTree, produceMetadata(ctx, thisVisitor))
    .withPort(portNode)
    .withAdapters(emptyAdapterListNode)
    .build();
};
