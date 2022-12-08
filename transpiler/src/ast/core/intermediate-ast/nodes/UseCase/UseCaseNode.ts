import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class UseCaseNode extends ClassTypeNode {
  private static classType = ClassTypes.UseCases;
  private static classNodeName = 'UseCase';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: UseCaseNode.classType,
      nodeType: BitloopsTypesMapping.TUseCase,
      metadata,
      classNodeName: UseCaseNode.classNodeName,
    });
  }
}
