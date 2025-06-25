export type TContext = {
  jwt: string;
  userId?: string;
  orchestratorInstanceIds?: string; // orchestratorNameId: orchestratorInstanceId2
};
