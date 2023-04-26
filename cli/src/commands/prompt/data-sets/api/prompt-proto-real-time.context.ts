import { ChatCompletionRequestMessage } from 'openai';
import { CodeSnippets } from '../common/code-snippets.js';

const PROTO = `syntax = "proto3";

package todo;

service TodoService {
	rpc Add(AddTodoRequest) returns (AddTodoResponse);
  rpc Complete (CompleteTodoRequest) returns (CompleteTodoResponse);
  rpc Uncomplete (UncompleteTodoRequest) returns (UncompleteTodoResponse);
  rpc ModifyTitle (ModifyTitleTodoRequest) returns (ModifyTitleTodoResponse);
  rpc Delete (DeleteTodoRequest) returns (DeleteTodoResponse);
	rpc GetAll(GetAllTodosRequest) returns (GetAllTodosResponse);
}

message ErrorResponse {
  string code = 1;
  string message = 2;
}

message AddTodoRequest {
	string title = 1;
}

message AddTodoResponse {
  oneof result {
    AddTodoOKResponse ok = 1;
    AddTodoErrorResponse error = 2;
  }
}

message AddTodoErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse invalidTitleLengthError = 3;
  }
}

message AddTodoOKResponse {
  string id = 1;
}

message CompleteTodoRequest {
  string id = 1;
}

message CompleteTodoResponse {
  oneof result {
    CompleteTodoOKResponse ok = 1;
    CompleteTodoErrorResponse error = 2;
  }
}

message CompleteTodoErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoAlreadyExistsError = 3;
  }
}

message DeleteTodoOKResponse {}

message DeleteTodoRequest {
  string id = 1;
}

message DeleteTodoResponse {
  oneof result {
    DeleteTodoOKResponse ok = 1;
    DeleteTodoErrorResponse error = 2;
  }
}

message DeleteTodoErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoAlreadyExistsError = 3;
  }
}

message CompleteTodoOKResponse {}

message GetAllTodosRequest {}

message GetAllTodosResponse {
  oneof result {
    GetAllTodosOKResponse ok = 1;
    GetAllTodosErrorResponse error = 2;
  }
}

message GetAllTodosErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
  }
}

message GetAllTodosOKResponse {
  repeated Todo todos = 1;
}

message ModifyTitleTodoRequest {
  string id = 1;
  string title = 2;
}

message ModifyTitleTodoResponse {
  oneof result {
    ModifyTitleTodoOKResponse ok = 1;
    ModifyTitleTodoErrorResponse error = 2;
  }
}

message ModifyTitleTodoErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoDoesNotExistError = 3;
    ErrorResponse invalidTitleLengthError = 4;
  }
}

message ModifyTitleTodoOKResponse {}

message UncompleteTodoRequest {
  string id = 1;
}

message UncompleteTodoResponse {
  oneof result {
    UncompleteTodoOKResponse ok = 1;
    UncompleteTodoErrorResponse error = 2;
  }
}

message UncompleteTodoErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoAlreadyExistsError = 3;
  }
}

message UncompleteTodoOKResponse {}

message Todo {
  string id = 1;
  string title = 2;
  bool completed = 3;
  string userId = 4;
}`;

const messageInstructions = (protobuf: string): string => {
  return ` 
  You will add rpcs for real time events in the given protobuf file.
  Provided this Protobuf file:
  ${CodeSnippets.openProto()}
  ${protobuf}
  ${CodeSnippets.closeProto()}


  You will add 3 rpcs like this, inside the existing service.
  ${CodeSnippets.openProto()}
    rpc InitializeSubscriptionConnection(InitializeConnectionRequest) returns (InitializeConnectionResponse);
    rpc KeepSubscriptionAlive(KeepSubscriptionAliveRequest) returns (KeepSubscriptionAliveResponse);
    rpc On(OnTodoRequest) returns (stream OnEvent);
  ${CodeSnippets.closeProto()}
  The OnEvent stream can be oneof many possible events.
  Create one event only for every rpc based on commands of CQRS included in the service.
  Don't create events for the rpcs that are based on queries of CQRS.
  For example addTodo rpc would correspond to an onAdded event.
  
  The OnTodoRequest will have the subscriberId, and an array of events the user wants to subscribe to.
  Define an enum of all possible events mentioned above.
  You should keep existing messages intact. 
`;
};
export const promptProtoRealTimeStreamsMessages = (
  protobuf: string,
): ChatCompletionRequestMessage[] => [
  {
    role: 'system',
    content:
      'Given a protobuf file for a service, you add real time event streams in it. The service is implemented with CQRS. You respond with code only.',
  },
  {
    role: 'user',
    content: messageInstructions(PROTO),
  },
  {
    role: 'assistant',
    content: `
  '''proto
  syntax = "proto3";

  package todo;
  
  service TodoService {
    rpc Add(AddTodoRequest) returns (AddTodoResponse);
    rpc Delete (DeleteTodoRequest) returns (DeleteTodoResponse);
    rpc GetAll(GetAllTodosRequest) returns (GetAllTodosResponse);
    rpc InitializeSubscriptionConnection(InitializeConnectionRequest) returns (InitializeConnectionResponse);
    rpc KeepSubscriptionAlive(KeepSubscriptionAliveRequest) returns (KeepSubscriptionAliveResponse);
    rpc On(OnTodoRequest) returns (stream OnEvent);
  }
  
  message InitializeConnectionRequest {}
  message InitializeConnectionResponse {
    string subscriberId = 1;
  }
  
  message KeepSubscriptionAliveRequest {
    string subscriberId = 1;
  }
  message KeepSubscriptionAliveResponse {
    optional string renewedAuthToken = 1;
  }
  
  enum TODO_EVENTS {
    ADDED = 0;
    DELETED = 1;
  }
  
  message OnTodoRequest {
    string subscriberId = 1;
    repeated TODO_EVENTS events = 2;
  }
  
  message OnEvent {
    oneof event {
      Todo onAdded = 1;
      Todo onDeleted = 2;
    }
  }
  
  message ErrorResponse {
    string code = 1;
    string message = 2;
  }
  
  message AddTodoRequest {
    string title = 1;
  }
  
  message AddTodoResponse {
    oneof result {
      AddTodoOKResponse ok = 1;
      AddTodoErrorResponse error = 2;
    }
  }
  
  message AddTodoErrorResponse {
    oneof error {
      ErrorResponse unauthorizedError = 1;
      ErrorResponse systemUnavailableError = 2;
      ErrorResponse invalidTitleLengthError = 3;
    }
  }
  
  message AddTodoOKResponse {
    string id = 1;
  }
  
  message DeleteTodoOKResponse {}
  
  message DeleteTodoRequest {
    string id = 1;
  }
  
  message DeleteTodoResponse {
    oneof result {
      DeleteTodoOKResponse ok = 1;
      DeleteTodoErrorResponse error = 2;
    }
  }
  
  message DeleteTodoErrorResponse {
    oneof error {
      ErrorResponse unauthorizedError = 1;
      ErrorResponse systemUnavailableError = 2;
      ErrorResponse todoAlreadyExistsError = 3;
    }
  }
  
  message GetAllTodosRequest {}
  
  message GetAllTodosResponse {
    oneof result {
      GetAllTodosOKResponse ok = 1;
      GetAllTodosErrorResponse error = 2;
    }
  }
  
  message GetAllTodosErrorResponse {
    oneof error {
      ErrorResponse unauthorizedError = 1;
      ErrorResponse systemUnavailableError = 2;
    }
  }
  
  message GetAllTodosOKResponse {
    repeated Todo todos = 1;
  }
  
  message Todo {
    string id = 1;
    string title = 2;
    bool completed = 3;
    string userId = 4;
  }
'''
  `,
  },
  {
    role: 'user',
    content: messageInstructions(protobuf),
  },
];
