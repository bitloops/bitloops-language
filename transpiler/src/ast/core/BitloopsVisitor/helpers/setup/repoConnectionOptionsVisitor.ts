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

import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { RepoConnectionOptionsNodeBuilder } from '../../../intermediate-ast/builders/setup/repo/RepoConnectionOptionsNodeBuilder.js';
import { IntermediateASTNode } from '../../../intermediate-ast/nodes/IntermediateASTNode.js';
import { DatabaseHostNode } from '../../../intermediate-ast/nodes/setup/repo/DatabaseHostNode.js';
import { DatabaseNameNode } from '../../../intermediate-ast/nodes/setup/repo/DatabaseName.js';
import { DatabasePortNode } from '../../../intermediate-ast/nodes/setup/repo/DatabasePortNode.js';
import { RepoConnectionOptionsNode } from '../../../intermediate-ast/nodes/setup/repo/RepoConnectionOptionsNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const repoConnectionOptionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RepoConnectionOptionsContext,
): RepoConnectionOptionsNode => {
  const repoConnectionOptionsAndCommas = thisVisitor.visitChildren(ctx);

  const repoConnectionOptions: IntermediateASTNode[] = repoConnectionOptionsAndCommas.filter(
    (child: any) => child !== undefined,
  );

  const databaseNameNode = repoConnectionOptions.find(
    (node) => node.getNodeType() === BitloopsTypesMapping.TRepoDatabase,
  ) as DatabaseNameNode;
  const hostNode = repoConnectionOptions.find(
    (node) => node.getNodeType() === BitloopsTypesMapping.TRepoHost,
  ) as DatabaseHostNode;
  const portNode = repoConnectionOptions.find(
    (node) => node.getNodeType() === BitloopsTypesMapping.TRepoConfigPort,
  ) as DatabasePortNode;

  if (!databaseNameNode || !hostNode || !portNode) {
    // Maybe add this in a validation status?
    throw new Error('Missing database name, host or port');
  }

  return new RepoConnectionOptionsNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withDatabaseName(databaseNameNode)
    .withHost(hostNode)
    .withPort(portNode)
    .build();
};
