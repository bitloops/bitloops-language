import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { MatchVO } from '../match.value-object';
import { ReconciliationReport } from '../../structs/reconciliation-report.struct';
export class ReconciliationDomainService {
  constructor() {}
  public async reconcile(
    reconciliationReportsResult: ReconciliationReport,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    const matchesVO = [];
    for (const match of reconciliationReportsResult.matches) {
      const matchVO = MatchVO.create({
        ledgerTransactionIds: match.ledgerTransactionIds,
        externalTransactionIds: match.externalTransactionIds,
        createdBy: match.createdBy,
      });
      if (matchVO.isFail()) {
        return fail(matchVO.value);
      }
      matchesVO.push(matchVO.value);
    }
    return ok();
  }
}
