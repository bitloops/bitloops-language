import { join } from 'path';
import { readFromFile, writeToFile } from '../../../helpers/fileOperations.js';

export class NestProjectUpdate {
  private packageJsonPath: string;
  private tsconfigJsonPath: string;

  constructor(readonly projectRootPath: string) {
    this.packageJsonPath = join(projectRootPath, 'package.json');
    this.tsconfigJsonPath = join(projectRootPath, 'tsconfig.json');
  }

  public async run(): Promise<void> {
    await Promise.all([this.packageJson(), this.tsconfigJson()]);
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
        '@bitloops/bl-boilerplate-infra-nest-jetstream': '^0.0.3',
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
}
