export type GetTopicsParams = {
  boundedContext: string;
  processId?: string;
  commandHandlerName: string;
  correlationId: string;
};

export type GetTopicsResponse = {
  errorsTopic: string;
  okTopic: string;
};
