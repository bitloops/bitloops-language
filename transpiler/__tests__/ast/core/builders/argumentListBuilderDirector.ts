import { TArgumentList } from '../../../../src/types.js';
import { ArgumentBuilderDirector } from './argumentDirector.js';

export class ArgumentListBuilderDirector {
  buildArgumentList(args: string[]): TArgumentList {
    const list: TArgumentList = [];
    for (const arg of args) {
      list.push(new ArgumentBuilderDirector().buildIdentifierArgument(arg));
    }
    return list;
  }
}
