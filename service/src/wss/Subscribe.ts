import 'reflect-metadata';

import { SUBSCRIBE_METADATA_KEY } from './constants';

export function Subscribe(event: string = ''): MethodDecorator {
  return function (target: object, key: string | symbol) {
    Reflect.defineMetadata(SUBSCRIBE_METADATA_KEY, event, target, key);
  }
}
