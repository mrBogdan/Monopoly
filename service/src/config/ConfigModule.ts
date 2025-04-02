import { Module } from '../decorators/Module';
import { ConfigService, getConfigValue } from './ConfigService';
import { getConfig } from '../nodejs/getConfig';

@Module({
  services: [ConfigService, getConfigValue(getConfig())]
})
export class ConfigModule {}
