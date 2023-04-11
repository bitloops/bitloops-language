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
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { queryHandlerKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { StatementNode } from '../statements/Statement.js';
import { ExecuteNode } from '../ExecuteNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';

export class QueryHandlerNode extends ClassTypeNode {
  private static classType = ClassTypes.QueryHandler;
  private static classNodeName = queryHandlerKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: QueryHandlerNode.classType,
      nodeType: BitloopsTypesMapping.TQueryHandler,
      metadata,
      classNodeName: QueryHandlerNode.classNodeName,
    });
  }

  getStatements(): StatementNode[] {
    const executeNode = this.getChildNodeByType<ExecuteNode>(BitloopsTypesMapping.TExecute);
    return executeNode.getStatements();
  }

  getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getParameters(): ParameterNode[] {
    const parameterListNode = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterListNode.getParameters();
  }
}
