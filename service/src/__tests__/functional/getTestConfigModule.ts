import { Module } from '../../decorators/Module';
import { ConfigService, getConfigValue } from '../../config/ConfigService';
import { ServiceConfiguration } from '../../config/ServiceConfiguration';

export const getTestConfigModule = (config: ServiceConfiguration) => {
  @Module({
    services: [ConfigService, getConfigValue(config)]
  })
  class TestConfigModule {}

  return TestConfigModule;
}
