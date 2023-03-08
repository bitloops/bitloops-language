import { TDependencyInjectionType } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DependencyInjectionClassType } from '../../../nodes/setup/dependency-injections/DependencyInjectionClassType.js';
import { IBuilder } from '../../IBuilder.js';

export class DependencyInjectionClassTypeBuilder implements IBuilder<DependencyInjectionClassType> {
  private dependencyInjectionClassTypeBuilder: DependencyInjectionClassType;
  private type: TDependencyInjectionType;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.dependencyInjectionClassTypeBuilder = new DependencyInjectionClassType(nodeMetadata);
  }

  public withType(type: TDependencyInjectionType): DependencyInjectionClassTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): DependencyInjectionClassType {
    this.dependencyInjectionClassTypeBuilder.buildLeafValue(this.type);

    return this.dependencyInjectionClassTypeBuilder;
  }
}
