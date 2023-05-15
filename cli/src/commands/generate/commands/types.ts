export type ResultOrError<Result> = [Result, null] | [null, Error];
// Define the Command interface
export interface Command {
  execute(): Promise<ResultOrError<string>>;
  usedTokens?: number;
  totalCost: number;
  fileName: string | null;
}
