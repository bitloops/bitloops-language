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
import { PackageAdapterClassNameNode } from '../../../intermediate-ast/nodes/package/packageAdapters/PackageAdapterClassNameNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';
import { PackageAdapterIdentifierNode } from '../../../intermediate-ast/nodes/package/packageAdapters/PackageAdapterIdentifierNode.js';
import { PackageAdapterClassNameNodeBuilder } from '../../../intermediate-ast/builders/package/packageAdapters/PackageAdapterClassNameNodeBuilder.js';

export const packageAdapterClassNameVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PackageAdapterClassNameContext,
): PackageAdapterClassNameNode => {
  const packageAdapterIdentifier: PackageAdapterIdentifierNode = thisVisitor.visit(
    ctx.packageAdapterIdentifier(),
  );

  const metadata = produceMetadata(ctx, thisVisitor);

  const packageAdapterClassNameNode: PackageAdapterClassNameNode =
    new PackageAdapterClassNameNodeBuilder(metadata)
      .withIdentifier(packageAdapterIdentifier)
      .build();

  return packageAdapterClassNameNode;
};
