
      
  import { driver } from '../proto/generated/driver';

  import {
    Controller,
    Inject,
    Injectable,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { RpcException, GrpcMethod } from '@nestjs/microservices';
  import { ConfigService } from '@nestjs/config';
  import { Metadata, ServerWritableStream } from '@grpc/grpc-js';
  import { v4 as uuid } from 'uuid';
  import * as jwtwebtoken from 'jsonwebtoken';
  import {
    BUSES_TOKENS,
    NatsPubSubIntegrationEventsBus,
  } from '@bitloops/bl-boilerplate-infra-nest-jetstream';
  import {
    AsyncLocalStorageInterceptor,
    JwtGrpcAuthGuard,
  } from '@bitloops/bl-boilerplate-infra-nest-auth-passport';
  import { Infra, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
  import { CorrelationIdInterceptor } from '@bitloops/bl-boilerplate-infra-telemetry';
  import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
  import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
  
import { BecomeAvailableCommand } from '@lib/bounded-contexts/driver/driver/commands/become-available.command';

  
  import { DriverAvailablePubSubIntegrationEventHandler } from './pub-sub-handlers/driver-available.integration-handler';
  import { DriverUnavailablePubSubIntegrationEventHandler } from './pub-sub-handlers/driver-unavailable.integration-handler';

  
import { BecomeUnavailableCommand } from '@lib/bounded-contexts/driver/driver/commands/become-unavailable.command';

  
    import { GetDriverAvailabilityQuery } from '@lib/bounded-contexts/driver/driver/queries/get-driver-availability.query';

  


    
      
export type Subscribers = {
  [subscriberId: string]: {
    timestamp: number;
    call?: ServerWritableStream<any, todo.Todo>;
    authToken: string;
    userId: string;
  };
};
const subscribers: Subscribers = {};

export type Subscriptions = {
  [integrationEvent: string]: {
    subscribers: string[];
  };
};
const subscriptions: Subscriptions = {};

// Every 30 seconds, we check if a subscriber has been inactive for more than 1 minute
// If so, we end their call and promise and remove them from the subscribers list
setInterval(() => {
  const subscriberIds = Object.keys(subscribers);
  for (const subscriberId of subscriberIds) {
    const subscriber = subscribers[subscriberId];
    if (subscriber.timestamp < Date.now() - 600 * 1000) {
      subscriber.call?.end();
      delete subscribers[subscriberId];
    }
  }
}, 30 * 1000);

async function subscribe(
  subscriberId: string,
  topics: string[],
  call: ServerWritableStream<any, todo.Todo>,
  resolveSubscription: (value: unknown) => void,
) {
  const ctx = asyncLocalStorage.getStore()?.get('context');
  await new Promise((resolve) => {
    call.on('end', () => {
      resolveSubscription(true);
      resolve(true);
    });

    call.on('error', () => {
      resolveSubscription(true);
      resolve(true);
    });

    call.on('close', () => {
      resolveSubscription(true);
      resolve(true);
    });

    call.on('finish', () => {
      resolveSubscription(true);
      resolve(true);
    });
    subscribers[subscriberId] = {
      timestamp: Date.now(),
      call,
      authToken: ctx.jwt,
      userId: ctx.userId,
    };
    topics.forEach((topic) => {
      if (!subscriptions[topic]) {
        subscriptions[topic] = {
          subscribers: [subscriberId],
        };
      } else {
        subscriptions[topic].subscribers.push(subscriberId);
      }
    });
  });
}

async function sha256Hash(message: string) {
  // Convert the message to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  // Generate the hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

@Injectable()
@Controller()
@UseGuards(JwtGrpcAuthGuard)
@UseInterceptors(CorrelationIdInterceptor, AsyncLocalStorageInterceptor)
export class TodoGrpcController {
  private readonly JWT_SECRET: string;
  private readonly JWT_LIFETIME_SECONDS: string;
  constructor(
    @Inject(BUSES_TOKENS.PUBSUB_COMMAND_BUS)
    private readonly commandBus: Infra.CommandBus.IPubSubCommandBus,
    @Inject(BUSES_TOKENS.PUBSUB_QUERY_BYS)
    private readonly queryBus: Infra.QueryBus.IQueryBus,
    @Inject(BUSES_TOKENS.PUBSUB_INTEGRATION_EVENT_BUS)
    private readonly pubSubIntegrationEventBus: Infra.EventBus.IEventBus,
    private configService: ConfigService<AuthEnvironmentVariables, true>,
  ) {
    this.JWT_SECRET = this.configService.get('jwtSecret', { infer: true });
    this.JWT_LIFETIME_SECONDS = this.configService.get('JWT_LIFETIME_SECONDS', {
      infer: true,
    });
    if (this.JWT_SECRET === '') {
      throw new Error('JWT_SECRET is not defined in env!');
    }
    this.subscribeToPubSubIntegrationEvents();
  }


    
  @GrpcMethod('DriverService', 'BecomeAvailable')
  @Traceable({
    operation: 'BecomeAvailableController',
    serviceName: 'API',
  })
  async becomeAvailable(data: driver.BecomeAvailableRequest): Promise<driver.BecomeAvailableResponse> {
    const command = new BecomeAvailableCommand({ id: data.id });
    const result = await this.commandBus.request(command);
    if (result.isOk) {
      return new driver.BecomeAvailableResponse({
        ok: new driver.BecomeAvailableOKResponse({}),
      });
    } else {
      const error = result.error;
      return new driver.BecomeAvailableResponse({
        error: new driver.BecomeAvailableErrorResponse({
          unexpectedError: new driver.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  }

  

  @GrpcMethod('DriverService', 'On')
  async on(
    request: driver.OnDriverRequest,
    metadata: Metadata,
    call: ServerWritableStream<driver.OnDriverRequest, driver.DriverAvailability>,
  ) {
    const { subscriberId, events } = request;
    await new Promise((resolve) => {
      const topics = events.map((i) => {
        switch (i) {
          case driver.DRIVER_EVENTS.AVAILABLE:
            return DriverAvailablePubSubIntegrationEventHandler.name;
          case driver.DRIVER_EVENTS.UNAVAILABLE:
            return DriverUnavailablePubSubIntegrationEventHandler.name;
        }
      });
      subscribe(subscriberId, topics, call, resolve);
    });
  }
  
  @GrpcMethod('DriverService', 'BecomeUnavailable')
  @Traceable({
    operation: 'BecomeUnavailableController',
    serviceName: 'API',
  })
  async becomeUnavailable(
    data: driver.BecomeUnavailableRequest,
  ): Promise<driver.BecomeUnavailableResponse> {
    const command = new BecomeUnavailableCommand({ id: data.id });
    const result = await this.commandBus.request(command);
    if (result.isOk) {
      return new driver.BecomeUnavailableResponse({
        ok: new driver.BecomeUnavailableOKResponse({}),
      });
    } else {
      const error = result.error;
      return new driver.BecomeUnavailableResponse({
        error: new driver.BecomeUnavailableErrorResponse({
          unexpectedError: new driver.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  }

  
  @GrpcMethod('DriverService', 'GetDriverAvailability')
  @Traceable({
    operation: 'GetDriverAvailabilityController',
    serviceName: 'API',
  })
  async getDriverAvailability(
    data: driver.GetDriverAvailabilityRequest,
  ): Promise<driver.GetDriverAvailabilityResponse> {
    const result = await this.queryBus.request(
      new GetDriverAvailabilityQuery({ id: data.id }),
    );
    if (result.isOk) {
      const driverAvailability = result.data;
      return new driver.GetDriverAvailabilityResponse({
        ok: new driver.GetDriverAvailabilityOKResponse({
          driverAvailability: new driver.DriverAvailability({
            id: driverAvailability.id,
            accountStatus: new driver.AccountStatus({
              isActive: driverAvailability.accountStatus.isActive,
              isBlocked: driverAvailability.accountStatus.isBlocked,
            }),
            availabilityStatus: new driver.AvailabilityStatus({
              isAvailable: driverAvailability.availabilityStatus.isAvailable,
            }),
            blockReason: new driver.BlockReason({
              reason: driverAvailability.blockReason.reason,
              description: driverAvailability.blockReason.description,
            }),
          }),
        }),
      });
    } else {
      const error = result.error;
      console.error('Error while fetching driver availability:', error?.message);
      return new driver.GetDriverAvailabilityResponse({
        error: new driver.GetDriverAvailabilityErrorResponse({
          unexpectedError: new driver.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  }
  

  @GrpcMethod('TodoService', 'InitializeSubscriptionConnection')
  async initializeSubscriptionConnection(): Promise<todo.InitializeConnectionResponse> {
    const ctx = await asyncLocalStorage.getStore()?.get('context');
    const authToken = ctx.jwt;
    const userId = ctx.userId;
    const subscriberId = uuid();
    subscribers[subscriberId] = {
      timestamp: Date.now(),
      authToken,
      userId,
    };
    const response = new todo.InitializeConnectionResponse({ subscriberId });
    console.log('Subscription response', response.toObject());
    return response;
  }

  @GrpcMethod('TodoService', 'KeepSubscriptionAlive')
  async keepSubscriptionAlive(
    request: todo.KeepSubscriptionAliveRequest,
  ): Promise<todo.KeepSubscriptionAliveResponse> {
    const subscriberId = request.subscriberId;
    const subscriber = subscribers[subscriberId];
    if (!subscriber) {
      throw new RpcException('Invalid subscription');
    }
    const ctx = await asyncLocalStorage.getStore()?.get('context');
    const { userId, jwt, email } = ctx;
    // Step 1. Check if the subscriber exists and that the userId matches
    if (subscriber.authToken !== jwt || subscriber.userId !== userId) {
      throw new RpcException('Invalid subscription');
    }
    // Step 2. Check if the JWT is nearing expiration and update if necessary
    let renewedAuthToken: string | undefined = undefined;
    try {
      const jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET) as jwtwebtoken.JwtPayload;
      if (jwtPayload.exp && jwtPayload.exp - Math.floor(Date.now() / 1000) < 3550) {
        renewedAuthToken = jwtwebtoken.sign(
          {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + Number(this.JWT_LIFETIME_SECONDS),
            sub: userId,
          },
          this.JWT_SECRET,
        );
      }
    } catch (err) {
      console.error('Error while verifying JWT', err);
      throw new RpcException('Invalid JWT!');
    }
    // Step 3. Updated the timestamp to show that the subscriber is still alive
    subscribers[subscriberId] = {
      ...subscribers[subscriberId],
      timestamp: Date.now(),
      authToken: renewedAuthToken || subscribers[subscriberId].authToken,
    };
    // Step 4. Send back the response
    const response = new todo.KeepSubscriptionAliveResponse({
      renewedAuthToken,
    });
    return response;
  }

  
  async subscribeToPubSubIntegrationEvents() {
    
    }
    
}


    
        