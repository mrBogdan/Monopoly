import { Inject } from '../di/Inject';
import { ServiceConfiguration } from './ServiceConfiguration';

export const CONFIG = Symbol('Config');

export class ConfigService {
  constructor(@Inject(CONFIG) private readonly config: ServiceConfiguration) {
  }

  get(key: string): unknown {
    return (this.config as never)[key];
  }
}

export const getConfigValue = (config: ServiceConfiguration) => ({
  param: CONFIG,
  useValue: config,
});
