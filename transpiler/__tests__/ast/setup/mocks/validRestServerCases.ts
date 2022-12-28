import { RestServerNodeDirector } from '../builders/restServerNodeDirector.js';

export const VALID_REST_SERVER_CASES = [
  {
    restServer: new RestServerNodeDirector().buildRestServer(),
  },
];
