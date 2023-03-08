/**
 *  Bitloops Language
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

import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { RepoAdapterNode } from '../../../../../../ast/core/intermediate-ast/nodes/RepoAdapterNode.js';
import { RepoPortNode } from '../../../../../../ast/core/intermediate-ast/nodes/repo-port/RepoPortNode.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';

type ErrorMessage = string;
type Response =
  | [
      {
        repoAdapterNode: RepoAdapterNode;
        repoPortNode: RepoPortNode;
      },
      null,
    ]
  | [null, ErrorMessage];

export const findRepoAdapterAndRepoPort = (
  model: IntermediateASTTree,
  concretedRepoPort: string,
  repoAdapterInstanceName: string,
): Response => {
  const repoPorts = model.getRootChildrenNodesByType<RepoPortNode>(BitloopsTypesMapping.TRepoPort);

  const repoPortNode = repoPorts.find(
    (node) => node.getIdentifier().getIdentifierName() === concretedRepoPort,
  );

  if (!repoPortNode) {
    return [null, `Repo port ${concretedRepoPort} not found in model!`];
  }

  const repoAdapterDefinitions = model.getRootChildrenNodesByType<RepoAdapterNode>(
    BitloopsTypesMapping.TRepoAdapter,
  );

  const repoAdapterDefinition = repoAdapterDefinitions.find(
    (node) => node.getIdentifier().getIdentifierName() === repoAdapterInstanceName,
  );

  if (!repoAdapterDefinition) {
    return [null, `Repo adapter ${repoAdapterInstanceName} not found in model!`];
  }

  return [
    {
      repoAdapterNode: repoAdapterDefinition,
      repoPortNode,
    },
    null,
  ];
};
