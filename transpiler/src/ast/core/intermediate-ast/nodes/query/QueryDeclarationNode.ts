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
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { FieldNode } from '../FieldList/FieldNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class QueryDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.Query;
  private static classNodeName = 'query';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: QueryDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TQuery,
      metadata,
      classNodeName: QueryDeclarationNode.classNodeName,
    });
  }

  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TIdentifier) as IdentifierNode;
    return identifier;
  }

  public getFieldNodes(): FieldNode[] {
    const fieldListNode = this.getChildNodeByType(BitloopsTypesMapping.TVariables) as FieldListNode;
    return fieldListNode.getFieldNodes();
  }

  public getFieldListNode(): FieldListNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TVariables) as FieldListNode;
  }

  public getFieldNodeType(fieldIdentifier: string): string {
    const fieldNodeList = this.getFieldListNode();
    return fieldNodeList.getFieldNodeType(fieldIdentifier);
  }
}
