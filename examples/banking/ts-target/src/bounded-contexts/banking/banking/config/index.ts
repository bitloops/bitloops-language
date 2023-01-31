const CONTEXT_ID = 'banking';

//TODO move it to npm package?
type IntegrationEventsData = {
  eventName: string;
};

const INTEGRATION_EVENTS: Record<string, IntegrationEventsData> = {
  TODO_CREATED: {
    eventName: 'TODO_CREATED_EVENT_NAME',
  },
};
export { CONTEXT_ID, INTEGRATION_EVENTS };
