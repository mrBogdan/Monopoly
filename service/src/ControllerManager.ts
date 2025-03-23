/* eslint-disable @typescript-eslint/no-explicit-any */

import { HealthController } from './health/HealthController';
import { globalContainer } from './di/Container';

export class ControllerManager {
  private constructor() {
    globalContainer.register(HealthController);
  }

  static instance: ControllerManager;

  static getInstance() {
    if (!ControllerManager.instance) {
      ControllerManager.instance = new ControllerManager();
    }
    return ControllerManager.instance;
  }
}
