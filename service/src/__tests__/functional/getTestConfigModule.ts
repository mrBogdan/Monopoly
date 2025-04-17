import { ConfigService, getConfigValue } from '../../config/ConfigService';
import { ServiceConfiguration } from '../../config/ServiceConfiguration';
import { Module } from '../../decorators/Module';

export const getTestConfigModule = (config: ServiceConfiguration) => {
  @Module({
    services: [ConfigService, getConfigValue(config)]
  })
  class TestConfigModule {}

  return TestConfigModule;
}
