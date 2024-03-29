import { BitloopsIdentifierTypeNode } from '../../ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { DomainRuleIdentifierNode } from '../../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleIdentifierNode.js';
import { EntityIdentifierNode } from '../../ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { ErrorIdentifierNode } from '../../ast/core/intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { IdentifierExpressionNode } from '../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { IdentifierNode } from '../../ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { IntermediateASTNodeValidationError } from '../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { PackagePortIdentifierNode } from '../../ast/core/intermediate-ast/nodes/package/packagePort/PackagePortIdentifierNode.js';
import { ReadModelIdentifierNode } from '../../ast/core/intermediate-ast/nodes/readModel/ReadModelIdentifierNode.js';
import { BoundedContextNameNode } from '../../ast/core/intermediate-ast/nodes/setup/BoundedContextNameNode.js';

type identifierNode =
  | BitloopsIdentifierTypeNode
  | EntityIdentifierNode
  | ReadModelIdentifierNode
  | ErrorIdentifierNode
  | DomainRuleIdentifierNode
  | IdentifierExpressionNode
  | PackagePortIdentifierNode
  | IdentifierNode;

export class identifierValidationError extends IntermediateASTNodeValidationError {
  constructor(name: string, node: identifierNode, bcName?: string) {
    const bc = bcName ? ` in bounded context ${bcName}` : '';
    const message = `Identifier ${name} not found${bc}: from ${node.getMetadata().start.line}:${
      node.getMetadata().start.column
    } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
      node.getMetadata().fileId
    }`;
    const metadata = node.getMetadata();
    super(message, metadata);
  }
}

export class boundedContextValidationError extends IntermediateASTNodeValidationError {
  constructor(node: BoundedContextNameNode) {
    const message = `Bounded Context ${node.getName()} not found: from ${
      node.getMetadata().start.line
    }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
      node.getMetadata().end.column
    } of file ${node.getMetadata().fileId}`;
    const metadata = node.getMetadata();
    super(message, metadata);
  }
}
