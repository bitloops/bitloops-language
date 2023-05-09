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
import { ArgumentListNode } from '../../../nodes/ArgumentList/ArgumentListNode.js';
import { PackageEvaluationNode } from '../../../nodes/Expression/Evaluation/PackageEvaluationNode.js';
import { PackageMethodNameNode } from '../../../nodes/Expression/Evaluation/PackageMethodNameNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackageEvaluationNodeBuilder implements IBuilder<PackageEvaluationNode> {
  private packageEvaluationNode: PackageEvaluationNode;
  private packageIdentifier: IdentifierNode;
  private packageMethodNameNode: PackageMethodNameNode;
  private argumentListNode: ArgumentListNode;

  constructor(metadata?: TNodeMetadata) {
    this.packageEvaluationNode = new PackageEvaluationNode(metadata);
  }

  withPackageIdentifier(packageIdentifier: IdentifierNode): PackageEvaluationNodeBuilder {
    this.packageIdentifier = packageIdentifier;
    return this;
  }

  public withMethodName(packageMethodName: PackageMethodNameNode): PackageEvaluationNodeBuilder {
    this.packageMethodNameNode = packageMethodName;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): PackageEvaluationNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): PackageEvaluationNode {
    this.packageEvaluationNode.addChild(this.packageIdentifier);
    this.packageEvaluationNode.addChild(this.packageMethodNameNode);
    this.packageEvaluationNode.addChild(this.argumentListNode);

    this.packageEvaluationNode.buildObjectValue();

    return this.packageEvaluationNode;
  }
}
