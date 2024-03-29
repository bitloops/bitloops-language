/**
 * @fileoverview gRPC-Web generated client stub for todo
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.20.3
// source: src/bitloops/proto/todo.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as src_bitloops_proto_todo_pb from '../../../src/bitloops/proto/todo_pb';


export class TodoServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorAdd = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/Add',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.AddTodoRequest,
    src_bitloops_proto_todo_pb.AddTodoResponse,
    (request: src_bitloops_proto_todo_pb.AddTodoRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.AddTodoResponse.deserializeBinary
  );

  add(
    request: src_bitloops_proto_todo_pb.AddTodoRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.AddTodoResponse>;

  add(
    request: src_bitloops_proto_todo_pb.AddTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.AddTodoResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.AddTodoResponse>;

  add(
    request: src_bitloops_proto_todo_pb.AddTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.AddTodoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/Add',
        request,
        metadata || {},
        this.methodDescriptorAdd,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/Add',
    request,
    metadata || {},
    this.methodDescriptorAdd);
  }

  methodDescriptorComplete = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/Complete',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.CompleteTodoRequest,
    src_bitloops_proto_todo_pb.CompleteTodoResponse,
    (request: src_bitloops_proto_todo_pb.CompleteTodoRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.CompleteTodoResponse.deserializeBinary
  );

  complete(
    request: src_bitloops_proto_todo_pb.CompleteTodoRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.CompleteTodoResponse>;

  complete(
    request: src_bitloops_proto_todo_pb.CompleteTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.CompleteTodoResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.CompleteTodoResponse>;

  complete(
    request: src_bitloops_proto_todo_pb.CompleteTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.CompleteTodoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/Complete',
        request,
        metadata || {},
        this.methodDescriptorComplete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/Complete',
    request,
    metadata || {},
    this.methodDescriptorComplete);
  }

  methodDescriptorDelete = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/Delete',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.DeleteTodoRequest,
    src_bitloops_proto_todo_pb.DeleteTodoResponse,
    (request: src_bitloops_proto_todo_pb.DeleteTodoRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.DeleteTodoResponse.deserializeBinary
  );

  delete(
    request: src_bitloops_proto_todo_pb.DeleteTodoRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.DeleteTodoResponse>;

  delete(
    request: src_bitloops_proto_todo_pb.DeleteTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.DeleteTodoResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.DeleteTodoResponse>;

  delete(
    request: src_bitloops_proto_todo_pb.DeleteTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.DeleteTodoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/Delete',
        request,
        metadata || {},
        this.methodDescriptorDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/Delete',
    request,
    metadata || {},
    this.methodDescriptorDelete);
  }

  methodDescriptorModifyTitle = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/ModifyTitle',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.ModifyTitleTodoRequest,
    src_bitloops_proto_todo_pb.ModifyTitleTodoResponse,
    (request: src_bitloops_proto_todo_pb.ModifyTitleTodoRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.ModifyTitleTodoResponse.deserializeBinary
  );

  modifyTitle(
    request: src_bitloops_proto_todo_pb.ModifyTitleTodoRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.ModifyTitleTodoResponse>;

  modifyTitle(
    request: src_bitloops_proto_todo_pb.ModifyTitleTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.ModifyTitleTodoResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.ModifyTitleTodoResponse>;

  modifyTitle(
    request: src_bitloops_proto_todo_pb.ModifyTitleTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.ModifyTitleTodoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/ModifyTitle',
        request,
        metadata || {},
        this.methodDescriptorModifyTitle,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/ModifyTitle',
    request,
    metadata || {},
    this.methodDescriptorModifyTitle);
  }

  methodDescriptorUncomplete = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/Uncomplete',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.UncompleteTodoRequest,
    src_bitloops_proto_todo_pb.UncompleteTodoResponse,
    (request: src_bitloops_proto_todo_pb.UncompleteTodoRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.UncompleteTodoResponse.deserializeBinary
  );

  uncomplete(
    request: src_bitloops_proto_todo_pb.UncompleteTodoRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.UncompleteTodoResponse>;

  uncomplete(
    request: src_bitloops_proto_todo_pb.UncompleteTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.UncompleteTodoResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.UncompleteTodoResponse>;

  uncomplete(
    request: src_bitloops_proto_todo_pb.UncompleteTodoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.UncompleteTodoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/Uncomplete',
        request,
        metadata || {},
        this.methodDescriptorUncomplete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/Uncomplete',
    request,
    metadata || {},
    this.methodDescriptorUncomplete);
  }

  methodDescriptorGetTodos = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/GetTodos',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.GetTodosRequest,
    src_bitloops_proto_todo_pb.GetTodosResponse,
    (request: src_bitloops_proto_todo_pb.GetTodosRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.GetTodosResponse.deserializeBinary
  );

  getTodos(
    request: src_bitloops_proto_todo_pb.GetTodosRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.GetTodosResponse>;

  getTodos(
    request: src_bitloops_proto_todo_pb.GetTodosRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.GetTodosResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.GetTodosResponse>;

  getTodos(
    request: src_bitloops_proto_todo_pb.GetTodosRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.GetTodosResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/GetTodos',
        request,
        metadata || {},
        this.methodDescriptorGetTodos,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/GetTodos',
    request,
    metadata || {},
    this.methodDescriptorGetTodos);
  }

  methodDescriptorInitializeSubscriptionConnection = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/InitializeSubscriptionConnection',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.InitializeConnectionRequest,
    src_bitloops_proto_todo_pb.InitializeConnectionResponse,
    (request: src_bitloops_proto_todo_pb.InitializeConnectionRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.InitializeConnectionResponse.deserializeBinary
  );

  initializeSubscriptionConnection(
    request: src_bitloops_proto_todo_pb.InitializeConnectionRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.InitializeConnectionResponse>;

  initializeSubscriptionConnection(
    request: src_bitloops_proto_todo_pb.InitializeConnectionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.InitializeConnectionResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.InitializeConnectionResponse>;

  initializeSubscriptionConnection(
    request: src_bitloops_proto_todo_pb.InitializeConnectionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.InitializeConnectionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/InitializeSubscriptionConnection',
        request,
        metadata || {},
        this.methodDescriptorInitializeSubscriptionConnection,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/InitializeSubscriptionConnection',
    request,
    metadata || {},
    this.methodDescriptorInitializeSubscriptionConnection);
  }

  methodDescriptorKeepSubscriptionAlive = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/KeepSubscriptionAlive',
    grpcWeb.MethodType.UNARY,
    src_bitloops_proto_todo_pb.KeepSubscriptionAliveRequest,
    src_bitloops_proto_todo_pb.KeepSubscriptionAliveResponse,
    (request: src_bitloops_proto_todo_pb.KeepSubscriptionAliveRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.KeepSubscriptionAliveResponse.deserializeBinary
  );

  keepSubscriptionAlive(
    request: src_bitloops_proto_todo_pb.KeepSubscriptionAliveRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_bitloops_proto_todo_pb.KeepSubscriptionAliveResponse>;

  keepSubscriptionAlive(
    request: src_bitloops_proto_todo_pb.KeepSubscriptionAliveRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.KeepSubscriptionAliveResponse) => void): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.KeepSubscriptionAliveResponse>;

  keepSubscriptionAlive(
    request: src_bitloops_proto_todo_pb.KeepSubscriptionAliveRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_bitloops_proto_todo_pb.KeepSubscriptionAliveResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/todo.TodoService/KeepSubscriptionAlive',
        request,
        metadata || {},
        this.methodDescriptorKeepSubscriptionAlive,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/todo.TodoService/KeepSubscriptionAlive',
    request,
    metadata || {},
    this.methodDescriptorKeepSubscriptionAlive);
  }

  methodDescriptorOn = new grpcWeb.MethodDescriptor(
    '/todo.TodoService/On',
    grpcWeb.MethodType.SERVER_STREAMING,
    src_bitloops_proto_todo_pb.OnTodoRequest,
    src_bitloops_proto_todo_pb.OnEvent,
    (request: src_bitloops_proto_todo_pb.OnTodoRequest) => {
      return request.serializeBinary();
    },
    src_bitloops_proto_todo_pb.OnEvent.deserializeBinary
  );

  on(
    request: src_bitloops_proto_todo_pb.OnTodoRequest,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<src_bitloops_proto_todo_pb.OnEvent> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/todo.TodoService/On',
      request,
      metadata || {},
      this.methodDescriptorOn);
  }

}

