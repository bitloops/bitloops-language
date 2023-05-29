
  import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    Inject,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
  import { BUSES_TOKENS } from '@bitloops/bl-boilerplate-infra-nest-jetstream';
  import {
    Application,
    Infra,
  } from '@bitloops/bl-boilerplate-core';
  import {
    AuthService,
    JwtAuthGuard,
    LocalAuthGuard,
  } from '@bitloops/bl-boilerplate-infra-nest-auth-passport';
  import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
  import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

  class RegisterDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()
    readonly password: string;
  }
  
  @Controller('auth')
  export class AuthController {
    constructor(
      @Inject(BUSES_TOKENS.PUBSUB_COMMAND_BUS)
      private readonly commandBus: Infra.CommandBus.IPubSubCommandBus,
      @Inject(BUSES_TOKENS.PUBSUB_QUERY_BYS)
      private readonly queryBus: Infra.QueryBus.IQueryBus,
      private readonly authService: AuthService,
    ) {}
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @Traceable({
      operation: 'LoginController',
    })
    async login(@Request() req) {
      const jwt = this.authService.login(req.user);
      return jwt;
    }
  
    @Post('register')
    async register(@Body() body: RegisterDTO) {
      const user = { email: body.email, password: body.password };
      const result = await this.authService.register(user);
      if (result.isOk()) return result.value;
      else {
        switch (result.value.constructor) {
          case Application.Repo.Errors.Conflict:
            throw new HttpException(result.value, HttpStatus.CONFLICT);
          case Application.Repo.Errors.Unexpected:
          default:
            throw new HttpException(
              'Server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
    }
  }  
  