import { TBoundedContextModule } from '../../../../src/types.js';
import { BoundedContextModuleBuilder } from './boundedContextModuleBuilder.js';
import { WordsWithSpacesBuilder } from './wordsWithSpacesBuilder.js';

export class BoundedContextModuleBuilderDirector {
  private builder: BoundedContextModuleBuilder;

  constructor() {
    this.builder = new BoundedContextModuleBuilder();
  }

  buildBoundedContextModule({
    boundedContextName,
    moduleName,
  }: {
    boundedContextName: string;
    moduleName: string;
  }): TBoundedContextModule {
    const boundedContext = new WordsWithSpacesBuilder().withName(boundedContextName).build();
    const module = new WordsWithSpacesBuilder().withName(moduleName).build();

    return this.builder.withBoundedContext(boundedContext).withModule(module).build();
  }
}
