import 'reflect-metadata';

import { HUB_METADATA_KEY } from './constants';

export function Hub(hub: string): ClassDecorator {
  return function (target: object) {
    Reflect.defineMetadata(HUB_METADATA_KEY, hub, target);
  }
}
