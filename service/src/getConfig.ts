import { ServiceConfiguration } from './ServiceConfiguration';
import { toNumber } from './nodejs/toNumber';
import { isDevelopment } from './nodejs/getEnv';

export const getConfig = (): ServiceConfiguration => {
  if (isDevelopment()) {
    return {
      httpPort: 8080,
      postgresConfig: {
        user: 'developer',
        password: 'mypassword',
        database: 'monopoly',
        host: '127.0.0.1',
        port: 5432,
      }
    }
  }

  return {
    httpPort: toNumber(process.env.HTTP_PORT) || 8080,
    postgresConfig: {
      user: process.env.POSTGRES_USERNAME || 'Incorrect username',
      password: process.env.POSTGRES_PASSWORD || 'Incorrect password',
      database: process.env.POSTGRES_DATABASE || 'Incorrect database',
      host: process.env.POSTGRES_HOST || 'Incorrect hostname',
      port: toNumber(process.env.POSTGRES_PORT) || 5432,
    }
  }
}
