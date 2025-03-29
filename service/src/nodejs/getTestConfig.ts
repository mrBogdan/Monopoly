import { ServiceConfiguration } from '../ServiceConfiguration';

export const getTestConfig = (override = {}): ServiceConfiguration => ({
  withMigration: false,
  httpPort: 8080,
  postgresConfig: {
    database: 'test',
    host: 'localhost',
    user: 'test',
    password: 'test',
    port: 5432,
  },
  ...override,
})
