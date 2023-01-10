import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { StatementNode } from '../statements/Statement.js';
import { UseCaseExecuteNode } from './UseCaseExecuteNode.js';

export class UseCaseNode extends ClassTypeNode {
  private static classType = ClassTypes.UseCase;
  private static classNodeName = 'UseCase';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: UseCaseNode.classType,
      nodeType: BitloopsTypesMapping.TUseCase,
      metadata,
      classNodeName: UseCaseNode.classNodeName,
    });
  }

  getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getStatements(): StatementNode[] {
    const useCaseExecute = this.getChildNodeByType<UseCaseExecuteNode>(
      BitloopsTypesMapping.TUseCaseExecute,
    );
    return useCaseExecute.getStatements();
  }
}
