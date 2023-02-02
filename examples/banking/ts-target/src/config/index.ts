import { Constants } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID as BANKING_CONTEXT_ID } from '../bounded-contexts/banking/banking/config';
import { CONTEXT_ID as MARKETING_CONTEXT_ID } from '../bounded-contexts/marketing/marketing/config';

// banking remove this line and implement it correctly
const isProduction = process.env.IS_PRODUCTION === 'true';
console.log('isProduction', isProduction);

const appConfig: Constants.ApplicationConfig = {
  //NOTES:
  //- Command and Query bus need to be the same because message bus needed for response topic is figured out by them
  // - Integration and Command need to be the same because integration is subscribed to a message bus for the response of the command
  CONTEXT_IDs_MAPPINGS: {
    [BANKING_CONTEXT_ID]: {
      COMMAND_BUS: Constants.CONTEXT_TYPES.InProcess,
      EVENT_BUS: Constants.CONTEXT_TYPES.InProcess,
      INTEGRATION_EVENT_BUS: Constants.CONTEXT_TYPES.InProcess,
      QUERY_BUS: Constants.CONTEXT_TYPES.InProcess,
    },
    [MARKETING_CONTEXT_ID]: {
      COMMAND_BUS: Constants.CONTEXT_TYPES.InProcess,
      EVENT_BUS: Constants.CONTEXT_TYPES.InProcess,
      INTEGRATION_EVENT_BUS: Constants.CONTEXT_TYPES.InProcess,
      QUERY_BUS: Constants.CONTEXT_TYPES.InProcess,
    },
  },
};

export { isProduction, appConfig };
