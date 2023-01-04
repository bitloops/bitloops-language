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

import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { PackageConcretionNodeBuilder } from '../../../intermediate-ast/builders/package/PackageConcretionNodeBuilder.js';
import { PackageAdapterClassNameNode } from '../../../intermediate-ast/nodes/package/packageAdapters/PackageAdapterClassNameNode.js';
import { PackageAdapterIdentifierNode } from '../../../intermediate-ast/nodes/package/packageAdapters/PackageAdapterIdentifierNode.js';
// import { PackageConcretionNode } from '../../../intermediate-ast/nodes/package/PackageConcretionNode.js';
import { BoundedContextModuleNode } from '../../../intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const packageConcretionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PackageConcretionContext,
): void => {
  const boundedContextModuleNode: BoundedContextModuleNode = thisVisitor.visit(
    ctx.boundedContextModuleDeclaration(),
  );

  const packageAdapterClassNameNode: PackageAdapterClassNameNode = thisVisitor.visit(
    ctx.packageAdapterClassName(),
  );

  const packageAdapterIdentifierNode: PackageAdapterIdentifierNode = thisVisitor.visit(
    ctx.packageAdapterIdentifier(),
  );

  const metadata = produceMetadata(ctx, thisVisitor);

  //   const packageConcretionNode: PackageConcretionNode =
  new PackageConcretionNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withBoundedContextModule(boundedContextModuleNode)
    .withAdapterClassName(packageAdapterClassNameNode)
    .withAdapterIdentifier(packageAdapterIdentifierNode)
    .build();
};
