export const generateMainConfiguration = (): string => {
  return `
  export interface AppConfig {
    http: {
      port: number;
      ip: string;
    };
    grpc: {
      port: number;
      ip: string;
      packageName: string;
      protoPath: string;
    };
    database: {
      iam_mongo: {
        database: string;
        host: string;
        users_collection: string;
      };
      todo_mongo: {
        database: string;
        host: string;
      };
      marketing_mongo: {
        database: string;
        host: string;
        users_collection: string;
      };
    };
    nats: {
      host: string;
      port: number;
    };
  }
  export default (): AppConfig => ({
    http: {
      port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 8082,
      ip: process.env.HTTP_IP ?? '0.0.0.0',
    },
    grpc: {
      port: process.env.GRPC_PORT ? parseInt(process.env.GRPC_PORT, 10) : 8081,
      ip: process.env.GRPC_IP ?? '0.0.0.0',
      packageName: process.env.GRPC_PACKAGE_NAME ?? 'todo',
      protoPath: process.env.GRPC_PROTO_PATH ?? 'src/proto/todo.proto',
    },
    database: {
      iam_mongo: {
        database: process.env.IAM_DATABASE_NAME ?? 'iam',
        host: process.env.IAM_DATABASE_HOST ?? 'localhost',
        users_collection: process.env.IAM_DATABASE_USERS_COLLECTION ?? 'users',
      },
      todo_mongo: {
        database: process.env.TODO_DATABASE_NAME ?? 'todo',
        host: process.env.TODO_DATABASE_HOST ?? 'localhost',
      },
      marketing_mongo: {
        database: process.env.MARKETING_DATABASE_NAME ?? 'marketing',
        host: process.env.MARKETING_DATABASE_HOST ?? 'localhost',
        users_collection:
          process.env.MARKETING_DATABASE_USERS_COLLECTION ?? 'users',
      },
    },
    nats: {
      host: process.env.NATS_HOST ?? 'localhost',
      port: process.env.NATS_PORT ? parseInt(process.env.NATS_PORT) : 4222,
    },
  });
  
  `;
};

export const generateAuthConfiguration = (): string => {
  return `
  export interface AuthEnvironmentVariables {
    jwtSecret: string;
    JWT_LIFETIME_SECONDS: number;
    database: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
  }
  
  export default () => ({
    jwtSecret:
      process.env.JWT_SECRET ||
      (() => {
        throw new Error('JWT_SECRET is required');
      })(),
    JWT_LIFETIME_SECONDS: process.env.JWT_LIFETIME_SECONDS || 3600,
    database: {
      host: process.env.PG_HOST ?? 'localhost',
      port: process.env.PG_PORT ? +process.env.PG_PORT : 5432,
      user: process.env.PG_USER ?? 'user',
      password: process.env.PG_PASSWORD ?? 'postgres',
      database: process.env.PG_DATABASE ?? 'iam',
    },
  });
  
  `;
};
