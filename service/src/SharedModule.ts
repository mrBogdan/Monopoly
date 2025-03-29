import { Module } from './decorators/Module';
import { ConfigService } from './ConfigService';
import { Database } from './Database';

@Module({
  services: [ConfigService, Database],
})
export class SharedModule {
}
