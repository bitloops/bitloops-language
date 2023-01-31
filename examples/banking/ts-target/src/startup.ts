import { Container } from '@bitloops/bl-boilerplate-core';
import { appConfig } from './config';

(async () => {
  console.log('container initialization');
  await Container.initializeServices(appConfig);
  console.log('after container initialization');
  await import('./shared/infra/rest/fastify/app0');

  // subscriptions
  await import('./bounded-contexts/banking/banking/subscriptions');
  // await import('./bounded-contexts/notification/notification/subscriptions');
})();
