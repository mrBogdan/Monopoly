import { Module } from './decorators/Module';
import { Database } from './database/Database';
import { Clock } from './clock';

@Module({
  services: [Database, Clock],
})
export class SharedModule {
}
