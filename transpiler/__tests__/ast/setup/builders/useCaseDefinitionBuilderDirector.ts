import { TIdentifier, TUseCaseDefinition, TUseCaseIdentifier } from '../../../../src/types.js';
import { ArgumentListBuilderDirector } from '../../core/builders/argumentListBuilderDirector.js';
import { BoundedContextModuleBuilderDirector } from './boundedContextModuleBuilderDirector.js';
import { UseCaseDefinitionBuilder } from './useCaseDefinitionBuilder.js';
import { UseCaseExpressionBuilder } from './useCaseExpressionBuilder.js';

export class UseCaseDefinitionBuilderDirector {
  private builder: UseCaseDefinitionBuilder;

  constructor() {
    this.builder = new UseCaseDefinitionBuilder();
  }

  buildUseCaseDefinitionWithoutDependencies({
    constIdentifier,
    useCaseIdentifier,
    boundedContextName,
    moduleName,
  }: {
    constIdentifier: TIdentifier;
    useCaseIdentifier: TUseCaseIdentifier;
    boundedContextName: string;
    moduleName: string;
  }): TUseCaseDefinition {
    const argumentList = new ArgumentListBuilderDirector().buildEmptyArgumentList();
    const bcModule = new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
      boundedContextName,
      moduleName,
    });
    const useCaseExpression = new UseCaseExpressionBuilder()
      .withArguments(argumentList)
      .withBoundedContextModule(bcModule)
      .withIdentifier(useCaseIdentifier)
      .build();
    return this.builder.withIdentifier(constIdentifier).withExpression(useCaseExpression).build();
  }

  buildUseCaseDefinitionWithDependencies({
    constIdentifier,
    useCaseIdentifier,
    boundedContextName,
    moduleName,
    dependencies,
  }: {
    constIdentifier: TIdentifier;
    useCaseIdentifier: TUseCaseIdentifier;
    boundedContextName: string;
    moduleName: string;
    dependencies: string[];
  }): TUseCaseDefinition {
    const argumentList = new ArgumentListBuilderDirector().buildArgumentList(dependencies);
    const bcModule = new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
      boundedContextName,
      moduleName,
    });
    const useCaseExpression = new UseCaseExpressionBuilder()
      .withArguments(argumentList)
      .withBoundedContextModule(bcModule)
      .withIdentifier(useCaseIdentifier)
      .build();
    return this.builder.withIdentifier(constIdentifier).withExpression(useCaseExpression).build();
  }
}
