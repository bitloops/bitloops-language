import { AsyncLocalStorage } from 'node:async_hooks';

// type AsyncLocalStorageKeys = 'correlationId' | 'userContext' | 'context';

export type AsyncLocalStorageStore = Map<string, any>;

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageStore>();
