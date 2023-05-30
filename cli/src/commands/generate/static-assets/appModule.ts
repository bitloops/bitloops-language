import { yieldModuleInfo } from '../../../utils/bounded-context-module.generator.js';
import { CasingUtils } from '../../../utils/casing.js';
import { ComponentsInfo } from '../interfaces/infra-code-generator.js';

export const generateAppModule = (componentsInfo: ComponentsInfo): string => {
  const modulesForImport: Array<{
    moduleClassName: string;
    moduleImportPath: string;
  }> = [];
  for (const { boundedContextName, moduleName } of yieldModuleInfo(componentsInfo)) {
    const pascalModuleName = CasingUtils.anyCaseToPascalCase(moduleName);
    modulesForImport.push({
      moduleClassName: `${pascalModuleName}Module`,
      moduleImportPath: `./bounded-contexts/${boundedContextName}/${moduleName}/${moduleName}.module`,
    });
  }

  const jetStreamServers = `[
    \`nats://\${process.env.NATS_HOST ?? 'localhost'}:\${
      process.env.NATS_PORT ?? 4222
    }\`,
  ],`;

  const moduleImports = modulesForImport
    .map(
      ({ moduleClassName, moduleImportPath }) =>
        `import { ${moduleClassName} } from '${moduleImportPath}';`,
    )
    .join('\n');

  // import { TodoModule } from './bounded-contexts/todo/todo/todo.module';
  // import { MarketingModule } from './bounded-contexts/marketing/marketing/marketing.module';
  // import { AuthenticationModule } from './bounded-contexts/iam/authentication/authentication.module';

  const mongoUrl = `\`mongodb://\${process.env.MONGO_HOST || 'localhost'}:\${
    process.env.MONGO_PORT || 30001
  }/?directConnection=true&replicaSet=my-replica-set\``;

  return `
  import { Module } from '@nestjs/common';
  ${moduleImports}
import {
  JetstreamModule,
  NatsStreamingMessageBus,
} from '@bitloops/bl-boilerplate-infra-nest-jetstream';
import { PostgresModule } from '@bitloops/bl-boilerplate-infra-postgres';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import authConfiguration from './config/auth.configuration';
import { MongoModule } from '@bitloops/bl-boilerplate-infra-mongo';
import { TracingModule } from '@bitloops/bl-boilerplate-infra-telemetry';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_FILE || '.development.env',
      load: [configuration, authConfiguration],
    }),
    JetstreamModule.forRoot({
      servers: ${jetStreamServers}
    }),
    PostgresModule.forRoot({
      database: process.env.PG_IAM_DATABASE ?? 'iam',
      host: process.env.PG_IAM_HOST ?? 'localhost',
      port: process.env.PG_IAM_PORT ? +process.env.PG_IAM_PORT : 5432,
      user: process.env.PG_IAM_USER ?? 'user',
      password: process.env.PG_IAM_PASSWORD ?? 'postgres',
      max: 20,
    }),
    MongoModule.forRoot({
      url: ${mongoUrl},
    }),
    ${modulesForImport.map(({ moduleClassName }) => moduleClassName).join(',\n')},
    TracingModule.register({
      messageBus: NatsStreamingMessageBus,
    }),
  ],
})
export class AppModule {}
  `;
};
