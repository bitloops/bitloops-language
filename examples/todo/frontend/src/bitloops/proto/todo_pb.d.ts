import * as jspb from 'google-protobuf'



export class InitializeConnectionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeConnectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeConnectionRequest): InitializeConnectionRequest.AsObject;
  static serializeBinaryToWriter(message: InitializeConnectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeConnectionRequest;
  static deserializeBinaryFromReader(message: InitializeConnectionRequest, reader: jspb.BinaryReader): InitializeConnectionRequest;
}

export namespace InitializeConnectionRequest {
  export type AsObject = {
  }
}

export class InitializeConnectionResponse extends jspb.Message {
  getSubscriberid(): string;
  setSubscriberid(value: string): InitializeConnectionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeConnectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeConnectionResponse): InitializeConnectionResponse.AsObject;
  static serializeBinaryToWriter(message: InitializeConnectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeConnectionResponse;
  static deserializeBinaryFromReader(message: InitializeConnectionResponse, reader: jspb.BinaryReader): InitializeConnectionResponse;
}

export namespace InitializeConnectionResponse {
  export type AsObject = {
    subscriberid: string,
  }
}

export class KeepSubscriptionAliveRequest extends jspb.Message {
  getSubscriberid(): string;
  setSubscriberid(value: string): KeepSubscriptionAliveRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeepSubscriptionAliveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: KeepSubscriptionAliveRequest): KeepSubscriptionAliveRequest.AsObject;
  static serializeBinaryToWriter(message: KeepSubscriptionAliveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeepSubscriptionAliveRequest;
  static deserializeBinaryFromReader(message: KeepSubscriptionAliveRequest, reader: jspb.BinaryReader): KeepSubscriptionAliveRequest;
}

export namespace KeepSubscriptionAliveRequest {
  export type AsObject = {
    subscriberid: string,
  }
}

export class KeepSubscriptionAliveResponse extends jspb.Message {
  getRenewedauthtoken(): string;
  setRenewedauthtoken(value: string): KeepSubscriptionAliveResponse;
  hasRenewedauthtoken(): boolean;
  clearRenewedauthtoken(): KeepSubscriptionAliveResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeepSubscriptionAliveResponse.AsObject;
  static toObject(includeInstance: boolean, msg: KeepSubscriptionAliveResponse): KeepSubscriptionAliveResponse.AsObject;
  static serializeBinaryToWriter(message: KeepSubscriptionAliveResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeepSubscriptionAliveResponse;
  static deserializeBinaryFromReader(message: KeepSubscriptionAliveResponse, reader: jspb.BinaryReader): KeepSubscriptionAliveResponse;
}

export namespace KeepSubscriptionAliveResponse {
  export type AsObject = {
    renewedauthtoken?: string,
  }

  export enum RenewedauthtokenCase { 
    _RENEWEDAUTHTOKEN_NOT_SET = 0,
    RENEWEDAUTHTOKEN = 1,
  }
}

export class OnTodoRequest extends jspb.Message {
  getSubscriberid(): string;
  setSubscriberid(value: string): OnTodoRequest;

  getEventsList(): Array<TODO_EVENTS>;
  setEventsList(value: Array<TODO_EVENTS>): OnTodoRequest;
  clearEventsList(): OnTodoRequest;
  addEvents(value: TODO_EVENTS, index?: number): OnTodoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OnTodoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: OnTodoRequest): OnTodoRequest.AsObject;
  static serializeBinaryToWriter(message: OnTodoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OnTodoRequest;
  static deserializeBinaryFromReader(message: OnTodoRequest, reader: jspb.BinaryReader): OnTodoRequest;
}

export namespace OnTodoRequest {
  export type AsObject = {
    subscriberid: string,
    eventsList: Array<TODO_EVENTS>,
  }
}

export class OnEvent extends jspb.Message {
  getOnadded(): Todo | undefined;
  setOnadded(value?: Todo): OnEvent;
  hasOnadded(): boolean;
  clearOnadded(): OnEvent;

  getOncompleted(): Todo | undefined;
  setOncompleted(value?: Todo): OnEvent;
  hasOncompleted(): boolean;
  clearOncompleted(): OnEvent;

  getOndeleted(): Todo | undefined;
  setOndeleted(value?: Todo): OnEvent;
  hasOndeleted(): boolean;
  clearOndeleted(): OnEvent;

  getOnmodifiedtitle(): Todo | undefined;
  setOnmodifiedtitle(value?: Todo): OnEvent;
  hasOnmodifiedtitle(): boolean;
  clearOnmodifiedtitle(): OnEvent;

  getOnuncompleted(): Todo | undefined;
  setOnuncompleted(value?: Todo): OnEvent;
  hasOnuncompleted(): boolean;
  clearOnuncompleted(): OnEvent;

  getEventCase(): OnEvent.EventCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OnEvent.AsObject;
  static toObject(includeInstance: boolean, msg: OnEvent): OnEvent.AsObject;
  static serializeBinaryToWriter(message: OnEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OnEvent;
  static deserializeBinaryFromReader(message: OnEvent, reader: jspb.BinaryReader): OnEvent;
}

export namespace OnEvent {
  export type AsObject = {
    onadded?: Todo.AsObject,
    oncompleted?: Todo.AsObject,
    ondeleted?: Todo.AsObject,
    onmodifiedtitle?: Todo.AsObject,
    onuncompleted?: Todo.AsObject,
  }

  export enum EventCase { 
    EVENT_NOT_SET = 0,
    ONADDED = 1,
    ONCOMPLETED = 2,
    ONDELETED = 3,
    ONMODIFIEDTITLE = 4,
    ONUNCOMPLETED = 5,
  }
}

export class ErrorResponse extends jspb.Message {
  getCode(): string;
  setCode(value: string): ErrorResponse;

  getMessage(): string;
  setMessage(value: string): ErrorResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorResponse): ErrorResponse.AsObject;
  static serializeBinaryToWriter(message: ErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorResponse;
  static deserializeBinaryFromReader(message: ErrorResponse, reader: jspb.BinaryReader): ErrorResponse;
}

export namespace ErrorResponse {
  export type AsObject = {
    code: string,
    message: string,
  }
}

export class AddTodoRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): AddTodoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTodoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddTodoRequest): AddTodoRequest.AsObject;
  static serializeBinaryToWriter(message: AddTodoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTodoRequest;
  static deserializeBinaryFromReader(message: AddTodoRequest, reader: jspb.BinaryReader): AddTodoRequest;
}

export namespace AddTodoRequest {
  export type AsObject = {
    title: string,
  }
}

export class AddTodoResponse extends jspb.Message {
  getOk(): AddTodoOKResponse | undefined;
  setOk(value?: AddTodoOKResponse): AddTodoResponse;
  hasOk(): boolean;
  clearOk(): AddTodoResponse;

  getError(): ErrorResponse | undefined;
  setError(value?: ErrorResponse): AddTodoResponse;
  hasError(): boolean;
  clearError(): AddTodoResponse;

  getResultCase(): AddTodoResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTodoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddTodoResponse): AddTodoResponse.AsObject;
  static serializeBinaryToWriter(message: AddTodoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTodoResponse;
  static deserializeBinaryFromReader(message: AddTodoResponse, reader: jspb.BinaryReader): AddTodoResponse;
}

export namespace AddTodoResponse {
  export type AsObject = {
    ok?: AddTodoOKResponse.AsObject,
    error?: ErrorResponse.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class AddTodoOKResponse extends jspb.Message {
  getId(): string;
  setId(value: string): AddTodoOKResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTodoOKResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddTodoOKResponse): AddTodoOKResponse.AsObject;
  static serializeBinaryToWriter(message: AddTodoOKResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTodoOKResponse;
  static deserializeBinaryFromReader(message: AddTodoOKResponse, reader: jspb.BinaryReader): AddTodoOKResponse;
}

export namespace AddTodoOKResponse {
  export type AsObject = {
    id: string,
  }
}

export class CompleteTodoRequest extends jspb.Message {
  getId(): string;
  setId(value: string): CompleteTodoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompleteTodoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CompleteTodoRequest): CompleteTodoRequest.AsObject;
  static serializeBinaryToWriter(message: CompleteTodoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompleteTodoRequest;
  static deserializeBinaryFromReader(message: CompleteTodoRequest, reader: jspb.BinaryReader): CompleteTodoRequest;
}

export namespace CompleteTodoRequest {
  export type AsObject = {
    id: string,
  }
}

export class CompleteTodoResponse extends jspb.Message {
  getOk(): CompleteTodoOKResponse | undefined;
  setOk(value?: CompleteTodoOKResponse): CompleteTodoResponse;
  hasOk(): boolean;
  clearOk(): CompleteTodoResponse;

  getError(): ErrorResponse | undefined;
  setError(value?: ErrorResponse): CompleteTodoResponse;
  hasError(): boolean;
  clearError(): CompleteTodoResponse;

  getResultCase(): CompleteTodoResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompleteTodoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CompleteTodoResponse): CompleteTodoResponse.AsObject;
  static serializeBinaryToWriter(message: CompleteTodoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompleteTodoResponse;
  static deserializeBinaryFromReader(message: CompleteTodoResponse, reader: jspb.BinaryReader): CompleteTodoResponse;
}

export namespace CompleteTodoResponse {
  export type AsObject = {
    ok?: CompleteTodoOKResponse.AsObject,
    error?: ErrorResponse.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class CompleteTodoOKResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompleteTodoOKResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CompleteTodoOKResponse): CompleteTodoOKResponse.AsObject;
  static serializeBinaryToWriter(message: CompleteTodoOKResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompleteTodoOKResponse;
  static deserializeBinaryFromReader(message: CompleteTodoOKResponse, reader: jspb.BinaryReader): CompleteTodoOKResponse;
}

export namespace CompleteTodoOKResponse {
  export type AsObject = {
  }
}

export class DeleteTodoRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteTodoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTodoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTodoRequest): DeleteTodoRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteTodoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTodoRequest;
  static deserializeBinaryFromReader(message: DeleteTodoRequest, reader: jspb.BinaryReader): DeleteTodoRequest;
}

export namespace DeleteTodoRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteTodoResponse extends jspb.Message {
  getOk(): DeleteTodoOKResponse | undefined;
  setOk(value?: DeleteTodoOKResponse): DeleteTodoResponse;
  hasOk(): boolean;
  clearOk(): DeleteTodoResponse;

  getError(): ErrorResponse | undefined;
  setError(value?: ErrorResponse): DeleteTodoResponse;
  hasError(): boolean;
  clearError(): DeleteTodoResponse;

  getResultCase(): DeleteTodoResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTodoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTodoResponse): DeleteTodoResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteTodoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTodoResponse;
  static deserializeBinaryFromReader(message: DeleteTodoResponse, reader: jspb.BinaryReader): DeleteTodoResponse;
}

export namespace DeleteTodoResponse {
  export type AsObject = {
    ok?: DeleteTodoOKResponse.AsObject,
    error?: ErrorResponse.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class DeleteTodoOKResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTodoOKResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTodoOKResponse): DeleteTodoOKResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteTodoOKResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTodoOKResponse;
  static deserializeBinaryFromReader(message: DeleteTodoOKResponse, reader: jspb.BinaryReader): DeleteTodoOKResponse;
}

export namespace DeleteTodoOKResponse {
  export type AsObject = {
  }
}

export class ModifyTitleTodoRequest extends jspb.Message {
  getId(): string;
  setId(value: string): ModifyTitleTodoRequest;

  getTitle(): string;
  setTitle(value: string): ModifyTitleTodoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModifyTitleTodoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ModifyTitleTodoRequest): ModifyTitleTodoRequest.AsObject;
  static serializeBinaryToWriter(message: ModifyTitleTodoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModifyTitleTodoRequest;
  static deserializeBinaryFromReader(message: ModifyTitleTodoRequest, reader: jspb.BinaryReader): ModifyTitleTodoRequest;
}

export namespace ModifyTitleTodoRequest {
  export type AsObject = {
    id: string,
    title: string,
  }
}

export class ModifyTitleTodoResponse extends jspb.Message {
  getOk(): ModifyTitleTodoOKResponse | undefined;
  setOk(value?: ModifyTitleTodoOKResponse): ModifyTitleTodoResponse;
  hasOk(): boolean;
  clearOk(): ModifyTitleTodoResponse;

  getError(): ErrorResponse | undefined;
  setError(value?: ErrorResponse): ModifyTitleTodoResponse;
  hasError(): boolean;
  clearError(): ModifyTitleTodoResponse;

  getResultCase(): ModifyTitleTodoResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModifyTitleTodoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ModifyTitleTodoResponse): ModifyTitleTodoResponse.AsObject;
  static serializeBinaryToWriter(message: ModifyTitleTodoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModifyTitleTodoResponse;
  static deserializeBinaryFromReader(message: ModifyTitleTodoResponse, reader: jspb.BinaryReader): ModifyTitleTodoResponse;
}

export namespace ModifyTitleTodoResponse {
  export type AsObject = {
    ok?: ModifyTitleTodoOKResponse.AsObject,
    error?: ErrorResponse.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class ModifyTitleTodoOKResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModifyTitleTodoOKResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ModifyTitleTodoOKResponse): ModifyTitleTodoOKResponse.AsObject;
  static serializeBinaryToWriter(message: ModifyTitleTodoOKResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModifyTitleTodoOKResponse;
  static deserializeBinaryFromReader(message: ModifyTitleTodoOKResponse, reader: jspb.BinaryReader): ModifyTitleTodoOKResponse;
}

export namespace ModifyTitleTodoOKResponse {
  export type AsObject = {
  }
}

export class UncompleteTodoRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UncompleteTodoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UncompleteTodoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UncompleteTodoRequest): UncompleteTodoRequest.AsObject;
  static serializeBinaryToWriter(message: UncompleteTodoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UncompleteTodoRequest;
  static deserializeBinaryFromReader(message: UncompleteTodoRequest, reader: jspb.BinaryReader): UncompleteTodoRequest;
}

export namespace UncompleteTodoRequest {
  export type AsObject = {
    id: string,
  }
}

export class UncompleteTodoResponse extends jspb.Message {
  getOk(): UncompleteTodoOKResponse | undefined;
  setOk(value?: UncompleteTodoOKResponse): UncompleteTodoResponse;
  hasOk(): boolean;
  clearOk(): UncompleteTodoResponse;

  getError(): ErrorResponse | undefined;
  setError(value?: ErrorResponse): UncompleteTodoResponse;
  hasError(): boolean;
  clearError(): UncompleteTodoResponse;

  getResultCase(): UncompleteTodoResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UncompleteTodoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UncompleteTodoResponse): UncompleteTodoResponse.AsObject;
  static serializeBinaryToWriter(message: UncompleteTodoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UncompleteTodoResponse;
  static deserializeBinaryFromReader(message: UncompleteTodoResponse, reader: jspb.BinaryReader): UncompleteTodoResponse;
}

export namespace UncompleteTodoResponse {
  export type AsObject = {
    ok?: UncompleteTodoOKResponse.AsObject,
    error?: ErrorResponse.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class UncompleteTodoOKResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UncompleteTodoOKResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UncompleteTodoOKResponse): UncompleteTodoOKResponse.AsObject;
  static serializeBinaryToWriter(message: UncompleteTodoOKResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UncompleteTodoOKResponse;
  static deserializeBinaryFromReader(message: UncompleteTodoOKResponse, reader: jspb.BinaryReader): UncompleteTodoOKResponse;
}

export namespace UncompleteTodoOKResponse {
  export type AsObject = {
  }
}

export class GetTodosRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTodosRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTodosRequest): GetTodosRequest.AsObject;
  static serializeBinaryToWriter(message: GetTodosRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTodosRequest;
  static deserializeBinaryFromReader(message: GetTodosRequest, reader: jspb.BinaryReader): GetTodosRequest;
}

export namespace GetTodosRequest {
  export type AsObject = {
  }
}

export class GetTodosResponse extends jspb.Message {
  getOk(): GetTodosOKResponse | undefined;
  setOk(value?: GetTodosOKResponse): GetTodosResponse;
  hasOk(): boolean;
  clearOk(): GetTodosResponse;

  getError(): ErrorResponse | undefined;
  setError(value?: ErrorResponse): GetTodosResponse;
  hasError(): boolean;
  clearError(): GetTodosResponse;

  getResultCase(): GetTodosResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTodosResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTodosResponse): GetTodosResponse.AsObject;
  static serializeBinaryToWriter(message: GetTodosResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTodosResponse;
  static deserializeBinaryFromReader(message: GetTodosResponse, reader: jspb.BinaryReader): GetTodosResponse;
}

export namespace GetTodosResponse {
  export type AsObject = {
    ok?: GetTodosOKResponse.AsObject,
    error?: ErrorResponse.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class GetTodosOKResponse extends jspb.Message {
  getTodosList(): Array<Todo>;
  setTodosList(value: Array<Todo>): GetTodosOKResponse;
  clearTodosList(): GetTodosOKResponse;
  addTodos(value?: Todo, index?: number): Todo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTodosOKResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTodosOKResponse): GetTodosOKResponse.AsObject;
  static serializeBinaryToWriter(message: GetTodosOKResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTodosOKResponse;
  static deserializeBinaryFromReader(message: GetTodosOKResponse, reader: jspb.BinaryReader): GetTodosOKResponse;
}

export namespace GetTodosOKResponse {
  export type AsObject = {
    todosList: Array<Todo.AsObject>,
  }
}

export class Todo extends jspb.Message {
  getId(): string;
  setId(value: string): Todo;

  getTitle(): string;
  setTitle(value: string): Todo;

  getCompleted(): boolean;
  setCompleted(value: boolean): Todo;

  getUserid(): string;
  setUserid(value: string): Todo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Todo.AsObject;
  static toObject(includeInstance: boolean, msg: Todo): Todo.AsObject;
  static serializeBinaryToWriter(message: Todo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Todo;
  static deserializeBinaryFromReader(message: Todo, reader: jspb.BinaryReader): Todo;
}

export namespace Todo {
  export type AsObject = {
    id: string,
    title: string,
    completed: boolean,
    userid: string,
  }
}

export enum TODO_EVENTS { 
  ADDED = 0,
  COMPLETED = 1,
  DELETED = 2,
  MODIFIED_TITLE = 3,
  UNCOMPLETED = 4,
}
