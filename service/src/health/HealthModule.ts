import { Module } from '../decorators/Module';

import { HealthController } from './HealthController';

@Module({
  controllers: [
    HealthController,
  ]
})
export class HealthModule {}
