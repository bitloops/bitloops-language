// TODO Decorate each command Handler with a
// @SystemEvents() decorator that will emit events for each error/ok
// in these 2 topics
//   [bc].processId.CreateReconciliationReportCommandHandler.errors.correlationId
//   [bc].processId.CreateReconciliationReportCommandHandler.ok.correlationId
import { AsyncLocalStorageService } from './async-local-storage.service';

export { SystemEvents as Traceable } from './system-events.decorator';
export { InfraModule as TracingModule } from './infra.module';

// This is to be removed, and replaced with the AsyncLocalStorageService
export const asyncLocalStorage = AsyncLocalStorageService.asyncLocalStorage;
