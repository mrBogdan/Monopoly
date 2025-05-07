import { ServiceConfiguration } from '../config/ServiceConfiguration';

export const getTestConfig = (override = {}): ServiceConfiguration => ({
  jwtSecret: 'mytestjwtsecret',
  withMigration: false,
  httpPort: 0,
  postgresConfig: {
    database: 'test',
    host: 'localhost',
    user: 'test',
    password: 'test',
    port: 5432,
  },
  ...override,
})
