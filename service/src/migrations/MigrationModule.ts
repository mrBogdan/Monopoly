import { Client } from 'pg';

import { CONFIG } from '../config/ConfigService';
import { ServiceConfiguration } from '../config/ServiceConfiguration';
import { Module } from '../decorators/Module';

import { migrate } from './migration';

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
