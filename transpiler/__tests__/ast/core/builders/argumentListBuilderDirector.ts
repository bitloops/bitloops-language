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

  buildStringLiteralArguments(args: string[]): TArgumentList {
    const list: TArgumentList = [];
    for (const arg of args) {
      list.push(new ArgumentBuilderDirector().buildStringArgument(arg));
    }
    return list;
  }

  /*
   * e.g. person.props.title
   */
  buildMemberDotArguments(args: string[][]): TArgumentList {
    const list: TArgumentList = args.map((arg) =>
      new ArgumentBuilderDirector().buildMemberDotArgument(arg),
    );
    return list;
  }

  buildThisMemberDotArguments(args: string[][]): TArgumentList {
    const list: TArgumentList = args.map((arg) =>
      new ArgumentBuilderDirector().buildThisMemberDotArgument(arg),
    );
    return list;
  }
}
