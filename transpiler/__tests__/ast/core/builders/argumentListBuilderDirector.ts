import { TArgument, TArgumentList } from '../../../../src/types.js';
import { ArgumentBuilderDirector } from './argumentDirector.js';

export class ArgumentListBuilderDirector {
  buildArgumentListWithArgs(args: TArgument[]): TArgumentList {
    return {
      argumentList: args,
    };
  }
  buildArgumentList(args: string[]): TArgumentList {
    const list: TArgumentList = {
      argumentList: [],
    };
    for (const arg of args) {
      list.argumentList.push(new ArgumentBuilderDirector().buildIdentifierArgument(arg));
    }
    return list;
  }

  buildStringLiteralArguments(args: string[]): TArgumentList {
    const list: TArgumentList = {
      argumentList: [],
    };
    for (const arg of args) {
      list.argumentList.push(new ArgumentBuilderDirector().buildStringArgument(arg));
    }
    return list;
  }

  /*
   * e.g. person.props.title
   */
  buildMemberDotArguments(args: string[][]): TArgumentList {
    const list: TArgumentList = {
      argumentList: [],
    };
    list.argumentList = args.map((arg) =>
      new ArgumentBuilderDirector().buildMemberDotArgument(arg),
    );
    return list;
  }

  buildThisMemberDotArguments(args: string[][]): TArgumentList {
    const list: TArgumentList = {
      argumentList: [],
    };
    list.argumentList = args.map((arg) =>
      new ArgumentBuilderDirector().buildThisMemberDotArgument(arg),
    );
    return list;
  }
}
