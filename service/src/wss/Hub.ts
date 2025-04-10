import 'reflect-metadata';

import { HUB_METADATA_KEY } from './constants';

const hubs = new Map<string, object>();

export type HubHandler = {
  hub: object;
  method: string;
}

export function Hub(hub: string): ClassDecorator {
  return function (target: object) {
    Reflect.defineMetadata(HUB_METADATA_KEY, hub, target);
    hubs.set(hub, target);
  }
}

export function getHubs(): Map<string, object> {
  return hubs;
}


