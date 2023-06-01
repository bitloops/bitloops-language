import { join } from 'path';
import { readFromFile, writeToFile } from '../../../helpers/fileOperations.js';

export class NestProjectUpdate {
  private packageJsonPath: string;
  private tsconfigJsonPath: string;

  constructor(private readonly projectRootPath: string) {
    this.packageJsonPath = join(projectRootPath, 'package.json');
    this.tsconfigJsonPath = join(projectRootPath, 'tsconfig.json');
  }

  public async run(): Promise<void> {
    await Promise.all([
      this.packageJson(),
      this.tsconfigJson(),
      this.createDockerFile(),
      this.createDockerIgnoreFile(),
      this.createDevelopmentEnv(),
    ]);
  }

  private async packageJson(): Promise<void> {
    const currentPackageJsonRaw = readFromFile(this.packageJsonPath);
    const currentPackageJson = JSON.parse(currentPackageJsonRaw);
    const newPackageJson = {
      ...currentPackageJson,
      scripts: {
        ...currentPackageJson.scripts,
        proto:
          'protoc --ts_out=./src/proto/generated --ts_opt=target=node --js_out=import_style=commonjs,binary:./src/proto/generated -I ./src/proto ./src/proto/*.proto',
      },
      dependencies: {
        ...currentPackageJson.dependencies,
        '@bitloops/bl-boilerplate-core': '^0.4.0',
        '@bitloops/bl-boilerplate-infra-mongo': '^0.1.2',
        '@bitloops/bl-boilerplate-infra-nest-auth-passport': '^0.2.0',
        '@bitloops/bl-boilerplate-infra-nest-jetstream': '^0.0.5',
        '@bitloops/bl-boilerplate-infra-postgres': '^0.1.1',
        '@bitloops/bl-boilerplate-infra-telemetry': '^0.1.3',
        '@nestjs/platform-fastify': '^9.4.0',
        '@grpc/grpc-js': '^1.8.13',
        '@nestjs/config': '^2.3.1',
        '@nestjs/microservices': '^9.3.10',
        'class-transformer': '^0.5.1',
        'class-validator': '^0.14.0',
        'google-protobuf': '^3.21.2',
        jsonwebtoken: '^9.0.0',
        mongodb: '^5.2.0',
        nats: '^2.13.1',
        uuid: '^9.0.0',
      },
      devDependencies: {
        ...currentPackageJson.devDependencies,
        '@nestjs/cli': '^9.0.0',
        '@nestjs/schematics': '^9.0.0',
        '@nestjs/testing': '^9.0.0',
        '@types/google-protobuf': '^3.15.6',
        '@types/jest': '29.5.0',
        '@types/jsonwebtoken': '^9.0.1',
        '@types/node': '18.15.11',
        '@types/supertest': '^2.0.11',
        '@typescript-eslint/eslint-plugin': '^5.57.1',
        '@typescript-eslint/parser': '^5.57.0',
        eslint: '^8.0.1',
        'eslint-config-prettier': '^8.3.0',
        'eslint-plugin-prettier': '^4.0.0',
        'grpc-tools': '^1.12.4',
        grpc_tools_node_protoc_ts: '^5.3.3',
        jest: '29.5.0',
        passport: '^0.6.0',
        prettier: '^2.3.2',
        'protoc-gen-ts': '^0.8.6',
        'source-map-support': '^0.5.20',
        supertest: '^6.1.3',
        'ts-jest': '29.1.0',
        'ts-loader': '^9.2.3',
        'ts-node': '^10.0.0',
        'tsconfig-paths': '4.1.1',
        'protoc-gen-js': '^3.21.2',
        '@protobuf-ts/protoc': '^2.9.0',
        typescript: '4.9.5',
      },
    };
    delete newPackageJson.dependencies['@nestjs/platform-express'];
    delete newPackageJson.devDependencies['@types/express'];
    // "@nestjs/platform-express": "^9.0.0",
    writeToFile(JSON.stringify(newPackageJson, null, 2), this.packageJsonPath);
  }
  private tsconfigJson(): void {
    const currentTsconfigJsonRaw = readFromFile(this.tsconfigJsonPath);
    const currentTsconfigJson = JSON.parse(currentTsconfigJsonRaw);
    delete currentTsconfigJson.compilerOptions.strictNullChecks;
    const newTsconfig = {
      ...currentTsconfigJson,
      compilerOptions: {
        ...currentTsconfigJson.compilerOptions,
        paths: {
          '@src/*': ['src/*'],
          '@modules/*': ['src/modules/*'],
          '@config/*': ['src/configs/*'],
          '@bitloops/*': ['src/bitloops/*'],
          '@lib/*': ['src/lib/*'],
          '@tests/*': ['tests/*'],
        },
      },
    };
    writeToFile(JSON.stringify(newTsconfig, null, 2), this.tsconfigJsonPath);
  }

  private createDockerFile(): void {
    const dockerFilePath = join(this.projectRootPath, 'Dockerfile');
    const dockerFileContent = `FROM node:19-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
#      BUILD      
# Install dependencies (--immutable makes sure the exact versions in the lockfile gets installed)
RUN yarn install --immutable
RUN yarn proto
# Build the app
RUN yarn build
#      RUN        
# Set the env to "production"
ENV JWT_SECRET "p2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B"
ENV JWT_LIFETIME_SECONDS 3600
ENV HTTP_IP todo-backend
ENV GRPC_IP todo-backend
ENV IAM_DATABASE_HOST todo-backend
ENV TODO_DATABASE_HOST bl-mongo
ENV PG_IAM_HOST bl-postgres
ENV PG_HOST bl-postgres
ENV MONGO_HOST bl-mongo
ENV MARKETING_DATABASE_HOST bl-mongo
ENV NATS_HOST bl-nats
ENV GRAFANA_ADMIN_USER admin
ENV GRAFANA_ADMIN_PASSWORD admin
ENV NODE_ENV production
ENV AUTH_URL "http://todo-backend:8082/auth/login"
ENV PROXY_URL "http://todo-backend:8080"
ENV REGISTRATION_URL "http://todo-backend:8082/auth/register"
# Expose the port on which the app will be running (3000 is the default that \`serve\` uses)
EXPOSE 8081 8082
# Start the app
CMD [ "yarn", "start:prod" ]`;
    writeToFile(dockerFileContent, dockerFilePath);
  }

  private createDockerIgnoreFile(): void {
    const dockerIgnoreFilePath = join(this.projectRootPath, '.dockerignore');
    const content = `# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

.git 

# Compiled binary addons (http://nodejs.org/api/addons.html)
build
build/Release

# Dependency directory
# https://www.npmjs.org/doc/misc/npm-faq.html#should-i-check-my-node_modules-folder-into-git
node_modules
dist

server/*.spec.js
kubernetes`;
    writeToFile(content, dockerIgnoreFilePath);
  }

  private createDevelopmentEnv(): void {
    const developmentEnvPath = join(this.projectRootPath, '.development.env');
    const content = `# copy and rename this to .development.env to add your configurations
JWT_SECRET=p2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B # !!! replace this with your own secret
JWT_LIFETIME_SECONDS=3600
HTTP_IP=localhost
GRPC_IP=localhost
IAM_DATABASE_HOST=localhost
TODO_DATABASE_HOST=localhost
PG_HOST=localhost
PG_IAM_HOST=localhost
MONGO_HOST=localhost
MARKETING_DATABASE_HOST=localhost
NATS_HOST=localhost`;
    writeToFile(content, developmentEnvPath);
  }
}
