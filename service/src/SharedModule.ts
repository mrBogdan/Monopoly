import { Database } from './database/Database';
import { Module } from './decorators/Module';

@Module({
  services: [Database],
})
export class SharedModule {
}
