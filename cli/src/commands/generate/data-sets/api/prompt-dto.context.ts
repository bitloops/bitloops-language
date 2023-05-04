import { ChatCompletionRequestMessage } from 'openai';
import { CodeSnippets } from '../common/code-snippets.js';

/**
 * POSSIBLE IMPROVEMENTS
 * Perhaps we could instruct the model to skip any field related to the primary id of the command's entity.
 * For example for the createTodoCommand {id, title, userId}
 * the Dto would be {title}, since id would probably be a url param, and userId would be extracted from
 * command.metadata.context.userId.
 */

const COMMANDS = [
  `
  export type TAddTodoCommand = {
    title: string;
  };
  
  export class AddTodoCommand extends Application.Command {
    public title: string;
  
    constructor(props: TAddTodoCommand) {
      super('Todo');
      this.title = props.title;
    }
  }
  `,
  `
  export type TCompleteTodoCommand = {
    todoId: string;
  };
  
  export class CompleteTodoCommand extends Application.Command {
    public id: string;
  
    constructor(
      props: TCompleteTodoCommand,
      metadata?: Partial<Application.TCommandMetadata>,
    ) {
      super('Todo', metadata);
      this.id = props.todoId;
    }
  }
  `,
  ` export type TDeleteTodoCommand = {
  id: string;
};

export class DeleteTodoCommand extends Application.Command {
  public id: string;

  constructor(props: TDeleteTodoCommand) {
    super('Todo');
    this.id = props.id;
  }
}
`,
  `
export type TModifyTodoTitleCommand = {
  id: string;
  title: string;
};
export class ModifyTodoTitleCommand extends Application.Command {
  public readonly id: string;
  public readonly title: string;

  constructor(modifyTitleTodo: TModifyTodoTitleCommand) {
    super('Todo');
    this.id = modifyTitleTodo.id;
    this.title = modifyTitleTodo.title;
  }
}`,
  `
export type TUncompleteTodoCommand = {
  id: string;
};

export class UncompleteTodoCommand extends Application.Command {
  public id: string;

  constructor(props: TUncompleteTodoCommand) {
    super('Todo');
    this.id = props.id;
  }
}
`,
];
const QUERIES = [
  ` export class GetTodosQuery extends Application.Query {
  cnstructor() {
    super('Todo');
  }
}`,
];
const messageInstructions = (commands: string[], queries: string[]): string => {
  // console.log({
  //   commandsLength: commands.length,
  // });

  return ` 
  Create one dto for each command/query. Use relevant class validator decorators based on each property's type.
  Here are the commands and queries.
  ${CodeSnippets.openTypescript()}
  ${commands.join('\n')}
  ${queries.join('\n')}
  ${CodeSnippets.closeTypescript()}
  Your response should contain all the result files, separated by ---
`;
};

export const promptDtoMessages = (
  commands: string[],
  queries: string[],
): ChatCompletionRequestMessage[] => [
  {
    role: 'system',
    content:
      'You generate class Dtos for NestJs & Typescript, using class-validator. You respond with code only.',
  },
  {
    role: 'user',
    content: messageInstructions(COMMANDS, QUERIES),
  },
  {
    role: 'assistant',
    content: `
  ${CodeSnippets.openTypescript()}
import { IsString, IsNotEmpty } from 'class-validator';

export class AddTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
---
import { IsString, IsNotEmpty } from 'class-validator';

export class CompleteTodoDto {
  @IsNotEmpty()
  @IsString()
  todoId: string;
}
---
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteTodoDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
---
import { IsString, IsNotEmpty } from 'class-validator';

export class ModifyTodoTitleDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
---
import { IsString, IsNotEmpty } from 'class-validator';

export class UncompleteTodoDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
---
export class GetTodosDto {}

${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructions(commands, queries),
  },
];
