export type RepoConcretion = 'Mock' | 'Mongo' | 'Postgres';
export type ServiceConcretion = 'Mock';
export type Concretion = RepoConcretion | ServiceConcretion;
type FileName = string;
export type FileNameAndConcretion = [FileName, Concretion];
export const CONCRETIONS = {
  SERVICES: {},
  REPOSITORIES: {
    MONGO: 'Mongo',
    PG: 'Postgres',
  },
  MOCK: 'Mock',
};
