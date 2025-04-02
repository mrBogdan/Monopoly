import { Module } from './decorators/Module';
import { Database } from './database/Database';

@Module({
  services: [Database],
})
export class SharedModule {
}
