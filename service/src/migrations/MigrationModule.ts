import { Module } from '../decorators/Module';
import { Client } from 'pg';
import { migrate } from './migration';

export const Migration = Symbol('migration');

@Module({
  services: [{
    param: Migration,
    useFactory: async (db: Client) => {
      await migrate(db);
    },
    inject: [Client],
  }]
})
export class MigrationModule {}
