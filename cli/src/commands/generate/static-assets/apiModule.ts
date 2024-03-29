import { ConfigUtils } from '../../../utils/config.js';
import { GrpcControllerBuilder } from '../component-builders/api/grpc-controller.builder.js';

export const generateApiModule = async (): Promise<string> => {
  const bitloopsProjectConfig = await ConfigUtils.readBitloopsProjectConfigFile();
  const packageName = bitloopsProjectConfig.api.grpc.package;

  const grpcControllerClassName = GrpcControllerBuilder.getControllerClassName(packageName);
  const jetStreamServers = `[
    \`nats://\${process.env.NATS_HOST ?? 'localhost'}:\${
      process.env.NATS_PORT ?? 4222
    }\`,
  ]`;
  return `
  import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './authentication.controller';
import { ${grpcControllerClassName} } from './${packageName}.grpc.controller';
import {
  JetstreamModule,
  NatsStreamingIntegrationEventBus,
  NatsStreamingMessageBus,
} from '@bitloops/bl-boilerplate-infra-nest-jetstream';
import configuration from '@src/config/configuration';
import authConfiguration, {
  AuthEnvironmentVariables,
} from '@src/config/auth.configuration';
import { AuthModule } from '@bitloops/bl-boilerplate-infra-nest-auth-passport';
import {
  TracingModule,
} from '@bitloops/bl-boilerplate-infra-telemetry';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env', 
      load: [configuration, authConfiguration],
    }),
    AuthModule.forRootAsync({
      jwtOptions: {
        useFactory: (
          configService: ConfigService<AuthEnvironmentVariables, true>,
        ) => ({
          secret: configService.get('jwtSecret'),
          signOptions: {
            expiresIn: \`\${configService.get('JWT_LIFETIME_SECONDS')}s\`,
          },
        }),
        inject: [ConfigService],
      },
      postgresOptions: {
        useFactory: (
          configService: ConfigService<AuthEnvironmentVariables, true>,
        ) => ({
          database: configService.get('database.database', { infer: true }),
          host: configService.get('database.host', { infer: true }),
          port: configService.get('database.port', { infer: true }),
          user: configService.get('database.user', { infer: true }),
          password: configService.get('database.password', { infer: true }),
          max: 20,
        }),
        inject: [ConfigService],
      },
      integrationEventBus: NatsStreamingIntegrationEventBus as any,
    }),
    JetstreamModule.forRoot({
      servers: ${jetStreamServers}
    }),

    TracingModule.register({
      messageBus: NatsStreamingMessageBus,
    }),
  ],
  controllers: [AuthController, ${grpcControllerClassName}],
})
export class ApiModule {
}
`;
};
