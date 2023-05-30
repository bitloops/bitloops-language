
    

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
  
import { BecomeUnavailableCommand } from '@lib/bounded-contexts/driver/driver-availability/commands/become-unavailable.command';
import { ApplicationErrors } from '@lib/bounded-contexts/driver/driver-availability/application/errors';
import { driver } from '../proto/generated/driver';

import { Application } from '@bitloops/bl-boilerplate-core';
import { GetDriverAvailabilityQuery } from '@lib/bounded-contexts/driver/driver-availability/queries/get-driver-availability.query';
import { DomainErrors } from '@lib/bounded-contexts/driver/driver-availability/domain/errors';
import { BecomeAvailableCommand } from '@lib/bounded-contexts/driver/driver-availability/core-module/commands/become-available.command';


    

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
export class DriverGrpcController {
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
    
  }


    
  @GrpcMethod('DriverService', 'BecomeUnavailable')
  @Traceable({
    operation: 'BecomeUnavailableController',
    serviceName: 'API',
  })
  async becomeUnavailable(data: driver.BecomeUnavailableRequest): Promise<driver.BecomeUnavailableResponse> {
    const command = new BecomeUnavailableCommand({ id: data.id });
    const result = await this.commandBus.request(command);
    if (result.isOk) {
      return new driver.BecomeUnavailableResponse({
        ok: new driver.BecomeUnavailableOKResponse({}),
      });
    }
    const error = result.error;
    switch (error.errorId) {
      case ApplicationErrors.DriverNotFoundError.errorId: {
        return new driver.BecomeUnavailableResponse({
          error: new driver.BecomeUnavailableErrorResponse({
            driverNotFoundError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      case Application.Repo.Errors.Unexpected.errorId: {
        return new driver.BecomeUnavailableResponse({
          error: new driver.BecomeUnavailableErrorResponse({
            unexpectedError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      default: {
        return new driver.BecomeUnavailableResponse({
          error: new driver.BecomeUnavailableErrorResponse({
            unexpectedError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
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
            }),
            createdAt: driverAvailability.createdAt,
            updatedAt: driverAvailability.updatedAt,
          }),
        }),
      });
    }
    const error = result.error;
    switch (error.errorId) {
      case ApplicationErrors.DriverNotFoundError.errorId: {
        return new driver.GetDriverAvailabilityResponse({
          error: new driver.GetDriverAvailabilityErrorResponse({
            driverNotFoundError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      case Application.Repo.Errors.Unexpected.errorId: {
        return new driver.GetDriverAvailabilityResponse({
          error: new driver.GetDriverAvailabilityErrorResponse({
            unexpectedError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      default: {
        return new driver.GetDriverAvailabilityResponse({
          error: new driver.GetDriverAvailabilityErrorResponse({
            unexpectedError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
    }
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
    }
    const error = result.error;
    switch (error.errorId) {
      case DomainErrors.AccountIsBlockedError.errorId: {
        return new driver.BecomeAvailableResponse({
          error: new driver.BecomeAvailableErrorResponse({
            accountIsBlockedError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      case Application.Repo.Errors.Unexpected.errorId: {
        return new driver.BecomeAvailableResponse({
          error: new driver.BecomeAvailableErrorResponse({
            unexpectedError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      case ApplicationErrors.DriverNotFoundError.errorId: {
        return new driver.BecomeAvailableResponse({
          error: new driver.BecomeAvailableErrorResponse({
            driverNotFoundError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      default: {
        return new driver.BecomeAvailableResponse({
          error: new driver.BecomeAvailableErrorResponse({
            unexpectedError: new driver.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
    }
  }

  
  }