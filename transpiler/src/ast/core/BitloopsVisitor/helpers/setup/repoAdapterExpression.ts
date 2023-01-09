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
import { RepoAdapterExpressionNode } from '../../../intermediate-ast/nodes/setup/repo/RepoAdapterExpressionNode.js';
import { ConcretedRepoPortNode } from '../../../intermediate-ast/nodes/setup/repo/ConcretedRepoPortNode.js';
import { BoundedContextModuleNode } from '../../../intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';
import { RepoAdapterOptionsNode } from '../../../intermediate-ast/nodes/setup/repo/RepoAdapterOptionsNode.js';
import { RepoAdapterExpressionNodeBuilder } from '../../../intermediate-ast/builders/setup/repo/RepoAdapterExpressionNodeBuilder.js';
import { DatabaseTypeNode } from '../../../intermediate-ast/nodes/setup/repo/DatabaseTypeNode.js';

export const repoAdapterExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RepoAdapterExpressionContext,
): RepoAdapterExpressionNode => {
  const databaseTypeNode: DatabaseTypeNode = thisVisitor.visit(ctx.repoAdapterClassName());
  const repoAdapterOptions: RepoAdapterOptionsNode = thisVisitor.visit(ctx.repoAdapterOptions());
  const boundedContextModule: BoundedContextModuleNode = thisVisitor.visit(
    ctx.boundedContextModuleDeclaration(),
  );
  const concretedRepoPort: ConcretedRepoPortNode = thisVisitor.visit(ctx.concretedRepoPort());
  const metadata = produceMetadata(ctx, thisVisitor);

  return new RepoAdapterExpressionNodeBuilder(metadata)
    .withDatabaseType(databaseTypeNode)
    .withOptions(repoAdapterOptions)
    .withBoundedContextModule(boundedContextModule)
    .withConcretedRepoPort(concretedRepoPort)
    .build();
};
