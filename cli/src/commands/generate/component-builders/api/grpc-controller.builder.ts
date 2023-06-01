import { CasingUtils } from '../../../../utils/casing.js';
import { CodeSnippets } from '../../data-sets/common/code-snippets.js';
import { getPubSubHandlerNameFromIntegrationEvent } from '../../data-sets/common/names.js';

/**
 * This receives the openAI responses and process them in order to create the final file result.
 */
export class GrpcControllerBuilder {
  static IMPORTS_METHODS_SEPARATOR = '---';

  static getControllerClassName(packageName: string): string {
    const pascalPackage = CasingUtils.anyCaseToPascalCase(packageName);
    return `${pascalPackage}GrpcController`;
  }

  static assemble(
    inputs: string[],
    packageName: string,
    grpcServiceName: string,
    integrationEvents: string[],
  ): string {
    const controllerClassName = this.getControllerClassName(packageName);
    // Every input contains imports and methods
    const [importsForMethods, methods] = inputs.reduce(
      (acc, input) => {
        const sanitizedInput = CodeSnippets.sanitizeTypescript(input);
        const [imports, methods] = sanitizedInput.split(
          GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR,
        );
        acc[0] += imports;
        acc[1] += methods;
        return acc;
      },
      ['', ''],
    );
    const imports = this.createImports(importsForMethods, packageName);
    const controllerClass = this.methodsWrapper(
      methods,
      integrationEvents,
      packageName,
      grpcServiceName,
      controllerClassName,
    );
    return imports + controllerClass;
  }

  private static createImports(importsForMethods: string, packageName: string): string {
    return `
import { ${packageName} } from '../proto/generated/${packageName}'
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
${importsForMethods}
`;
  }

  private static createSubscribeToPubSubIntegrationEvents(integrationEvents: string[]): string {
    return `
  async subscribeToPubSubIntegrationEvents() {
    ${integrationEvents
      .map((eventName) => {
        const pubSubHandlerName = getPubSubHandlerNameFromIntegrationEvent(eventName);

        const handlerIdentifier =
          pubSubHandlerName.charAt(0).toLowerCase() + pubSubHandlerName.slice(1);
        const topicIdentifier = handlerIdentifier + 'Topic';

        return `
          const ${handlerIdentifier} = new ${pubSubHandlerName}(subscriptions, subscribers);
          const ${topicIdentifier} = NatsPubSubIntegrationEventsBus.getTopicFromHandler(${handlerIdentifier});
          console.log(\`Subscribing to PubSub integration event \${${topicIdentifier}}\`);
          await this.pubSubIntegrationEventBus.subscribe(${topicIdentifier}, ${handlerIdentifier});
        `;
      })
      .join('\n')}
    }
    `;
  }

  /**
   *
   * @param methods
   * @param integrationEvents
   * @param packageName
   * @param grpcService
   * @param controllerClassName  TodoGrpcController
   * @returns
   */
  private static methodsWrapper(
    methods: string,
    integrationEvents: string[],
    packageName: string,
    grpcService: string,
    controllerClassName: string,
  ): string {
    let result = '';

    const needsRealTimeSubscriptions = integrationEvents.length > 0;

    if (needsRealTimeSubscriptions) {
      result += `export type Subscribers = {
      [subscriberId: string]: {
        timestamp: number;
        call?: ServerWritableStream<any, ${packageName}.Todo>;
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
      call: ServerWritableStream<any, ${packageName}.Todo>,
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
    }`;
    }

    result += `

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
export class ${controllerClassName} {
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
    ${needsRealTimeSubscriptions ? 'this.subscribeToPubSubIntegrationEvents();' : ''}
  }


    ${methods}
  `;

    if (needsRealTimeSubscriptions) {
      result += `
  @GrpcMethod('${grpcService}', 'InitializeSubscriptionConnection')
  async initializeSubscriptionConnection(): Promise<${packageName}.InitializeConnectionResponse> {
    const ctx = await asyncLocalStorage.getStore()?.get('context');
    const authToken = ctx.jwt;
    const userId = ctx.userId;
    const subscriberId = uuid();
    subscribers[subscriberId] = {
      timestamp: Date.now(),
      authToken,
      userId,
    };
    const response = new ${packageName}.InitializeConnectionResponse({ subscriberId });
    console.log('Subscription response', response.toObject());
    return response;
  }

  @GrpcMethod('${grpcService}', 'KeepSubscriptionAlive')
  async keepSubscriptionAlive(
    request: ${packageName}.KeepSubscriptionAliveRequest,
  ): Promise<${packageName}.KeepSubscriptionAliveResponse> {
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
    const response = new ${packageName}.KeepSubscriptionAliveResponse({
      renewedAuthToken,
    });
    return response;
  }

  ${this.createSubscribeToPubSubIntegrationEvents(integrationEvents)}
    `;
    }
    result += '}';
    return result;
  }
}
