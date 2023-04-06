import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { PrivateMethodDeclarationListNode } from '../methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNode } from '../methods/PublicMethodDeclarationListNode.js';
import { StatementNode } from '../statements/Statement.js';

export class DomainServiceNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainService;
  private static classNodeName = 'domainService';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainServiceNode.classType,
      nodeType: BitloopsTypesMapping.TDomainService,
      metadata,
      classNodeName: DomainServiceNode.classNodeName,
    });
  }
  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TIdentifier) as IdentifierNode;
    return identifier;
  }

  public getStatements(): StatementNode[] {
    const publicMethods = this.getChildNodeByType<PublicMethodDeclarationListNode>(
      BitloopsTypesMapping.TPublicMethods,
    );
    const privateMethods = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
    const statements = [];
    if (publicMethods !== null) {
      publicMethods.getPublicMethodNodes().forEach((method) => {
        statements.push(...method.getStatements());
      });
    }

    if (privateMethods !== null) {
      privateMethods.getPrivateMethodNodes().forEach((method) => {
        statements.push(...method.getStatements());
      });
    }
    return statements;
  }

  public getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }
}
