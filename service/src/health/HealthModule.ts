import { Module } from '../decorators/Module';
import { HealthController } from './HealthController';
import { PingHub } from './PingHub';

@Module({
  controllers: [
    HealthController,
  ],
  services: [PingHub]
})
export class HealthModule {}
