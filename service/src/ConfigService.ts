import { Inject } from './di/Inject';
import { CONFIG } from './SharedModule';

export class ConfigService {
  constructor(@Inject(CONFIG) private readonly config: never) {
  }

  get(key: string): unknown {
    return this.config[key];
  }
}
