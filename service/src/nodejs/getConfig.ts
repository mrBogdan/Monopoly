import { ServiceConfiguration } from '../config/ServiceConfiguration';

import { isDevelopment } from './getEnv';
import { toBoolean } from './toBoolean';
import { toNumber } from './toNumber';

export const getConfig = (override: Partial<ServiceConfiguration> = {}): ServiceConfiguration => {
  if (isDevelopment()) {
    return {
      httpPort: 8080,
      withMigration: toBoolean(process.env.WITH_MIGRATION) || false,
      postgresConfig: {
        user: process.env.POSTGRES_USERNAME || 'developer',
        password: process.env.POSTGRES_PASSWORD || 'mypassword',
        database: process.env.POSTGRES_DATABASE || 'monopoly',
        host: process.env.POSTGRES_HOST || 'postgres',
        port: toNumber(process.env.POSTGRES_PORT) || 5432,
      },
      ...override,
    }
  }

  return {
    httpPort: toNumber(process.env.HTTP_PORT) || 8080,
    withMigration: toBoolean(process.env.WITH_MIGRATION) || false,
    postgresConfig: {
      user: process.env.POSTGRES_USERNAME || 'Incorrect username',
      password: process.env.POSTGRES_PASSWORD || 'Incorrect password',
      database: process.env.POSTGRES_DATABASE || 'Incorrect database',
      host: process.env.POSTGRES_HOST || 'Incorrect hostname',
      port: toNumber(process.env.POSTGRES_PORT) || 5432,
    }
  }
}
