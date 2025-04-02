import { Module } from '../decorators/Module';
import { Client } from 'pg';
import { migrate } from './migration';
import { ServiceConfiguration } from '../config/ServiceConfiguration';
import { CONFIG } from '../config/ConfigService';

export const Migration = Symbol('migration');

@Module({
  services: [{
    param: Migration,
    useFactory: async (db: Client, config: ServiceConfiguration) => {
      if (!config.withMigration) {
        return;
      }

      await migrate(db);
    },
    inject: [Client, CONFIG],
  }]
})
export class MigrationModule {}
