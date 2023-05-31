import { ArgumentListNodeBuilder } from '../builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentListNode } from '../nodes/ArgumentList/ArgumentListNode.js';
import { ArgumentNode } from '../nodes/ArgumentList/ArgumentNode.js';
import { ArgumentDirector } from '../../../../../__tests__/target/typescript/core/builders/argument.js';
import { ExpressionBuilderDirector } from './expressionNodeBuilderDirector.js';

export class ArgumentListDirector {
  buildArgumentListWithArgs(argumentNode: ArgumentNode[]): ArgumentListNode {
    const argumentListNode = new ArgumentListNodeBuilder().withArguments(argumentNode).build();
    return argumentListNode;
  }

  buildStringLiteralArgumentList(...stringLiterals: string[]): ArgumentListNode {
    const argumentNodes = stringLiterals.map((stringLiteral) => {
      const stringLiteralExpression = new ExpressionBuilderDirector().buildStringLiteralExpression(
        stringLiteral,
      );
      const argument = new ArgumentDirector().buildArgument(stringLiteralExpression);
      return argument;
    });
    const argumentListNode = new ArgumentListNodeBuilder().withArguments(argumentNodes).build();
    return argumentListNode;
  }

  buildIntegerLiteralArgumentList(...integerLiterals: number[]): ArgumentListNode {
    const argumentNodes = integerLiterals.map((integerLiteral) => {
      const integerLiteralExpression = new ExpressionBuilderDirector().buildInt32LiteralExpression(
        integerLiteral,
      );
      const argument = new ArgumentDirector().buildArgument(integerLiteralExpression);
      return argument;
    });
    const argumentListNode = new ArgumentListNodeBuilder().withArguments(argumentNodes).build();
    return argumentListNode;
  }

  buildArgumentListWithIdentifierExpression(identifierName: string): ArgumentListNode {
    const identifierExpression = new ExpressionBuilderDirector().buildIdentifierExpression(
      identifierName,
    );
    const argument = new ArgumentDirector().buildArgument(identifierExpression);
    const argumentListNode = new ArgumentListNodeBuilder().withArguments([argument]).build();
    return argumentListNode;
  }

  buildArgumentListWithIdentifiers(...identifiers: string[]): ArgumentListNode {
    const argumentNodes = identifiers.map((identifier) => {
      const identifierExpression = new ExpressionBuilderDirector().buildIdentifierExpression(
        identifier,
      );
      const argument = new ArgumentDirector().buildArgument(identifierExpression);
      return argument;
    });
    const argumentListNode = new ArgumentListNodeBuilder().withArguments(argumentNodes).build();
    return argumentListNode;
  }

  buildArgumentListWithThisMemberDotExpression(identifierName: string): ArgumentListNode {
    const memberDotExpression = new ExpressionBuilderDirector().buildThisMemberDotExpression(
      identifierName,
    );
    const argument = new ArgumentDirector().buildArgument(memberDotExpression);
    const argumentListNode = new ArgumentListNodeBuilder().withArguments([argument]).build();
    return argumentListNode;
  }

  buildArgumentListWithMemberDotExpression(
    leftIdentifierName: string,
    rightIdentifierName: string,
  ): ArgumentListNode {
    const memberDotExpression = new ExpressionBuilderDirector().buildMemberDotExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression(leftIdentifierName),
      rightIdentifierName,
    );
    const argument = new ArgumentDirector().buildArgument(memberDotExpression);
    const argumentListNode = new ArgumentListNodeBuilder().withArguments([argument]).build();
    return argumentListNode;
  }

  buildArgumentListWithThisPropsMemberDotExpression(identifierName: string): ArgumentListNode {
    const memberDotPropsExpression = new ExpressionBuilderDirector().buildThisMemberDotExpression(
      'props',
    );
    const memberDotExpression = new ExpressionBuilderDirector().buildMemberDotExpression(
      memberDotPropsExpression,
      identifierName,
    );
    const argument = new ArgumentDirector().buildArgument(memberDotExpression);
    const argumentListNode = new ArgumentListNodeBuilder().withArguments([argument]).build();
    return argumentListNode;
  }
}
