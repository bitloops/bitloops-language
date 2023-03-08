import { BitloopsIdentifierTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { GraphQLControllerExecuteReturnTypeNode } from '../nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';
import { GraphQLControllerIdentifierNode } from '../nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';
import { RESTControllerIdentifierNode } from '../nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { DomainRuleIdentifierNode } from '../nodes/DomainRule/DomainRuleIdentifierNode.js';
import { EntityIdentifierNode } from '../nodes/Entity/EntityIdentifierNode.js';
import { ErrorIdentifierNode } from '../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { IdentifierExpressionNode } from '../nodes/Expression/IdentifierExpression.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { IntermediateASTNodeValidationError } from '../nodes/IntermediateASTNode.js';
import { PackagePortIdentifierNode } from '../nodes/package/packagePort/PackagePortIdentifierNode.js';
import { ReadModelIdentifierNode } from '../nodes/readModel/ReadModelIdentifierNode.js';
import { BoundedContextNameNode } from '../nodes/setup/BoundedContextNameNode.js';
import { ConcretedRepoPortNode } from '../nodes/setup/repo/ConcretedRepoPortNode.js';
import { UseCaseIdentifierNode } from '../nodes/UseCase/UseCaseIdentifierNode.js';

type identifierNode =
  | BitloopsIdentifierTypeNode
  | EntityIdentifierNode
  | ReadModelIdentifierNode
  | ErrorIdentifierNode
  // | DomainCreateParameterTypeNode
  | GraphQLControllerExecuteReturnTypeNode
  | DomainRuleIdentifierNode
  | UseCaseIdentifierNode
  | ConcretedRepoPortNode
  | IdentifierExpressionNode
  | GraphQLControllerIdentifierNode
  | PackagePortIdentifierNode
  | IdentifierNode
  | RESTControllerIdentifierNode;

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
