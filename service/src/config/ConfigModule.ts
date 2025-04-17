import { Module } from '../decorators/Module';
import { getConfig } from '../nodejs/getConfig';

import { ConfigService, getConfigValue } from './ConfigService';

@Module({
  services: [ConfigService, getConfigValue(getConfig())]
})
export class ConfigModule {}
