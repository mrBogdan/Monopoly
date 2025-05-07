import { Module } from '../decorators';
import { getConfig } from '../nodejs';

import { ConfigService, getConfigValue } from './ConfigService';

@Module({
  services: [ConfigService, getConfigValue(getConfig())]
})
export class ConfigModule {}
