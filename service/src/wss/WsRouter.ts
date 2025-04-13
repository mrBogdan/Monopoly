import 'reflect-metadata';

import { getHubs, HubHandler } from './Hub';
import { NotFoundError } from '../errors';
import { SUBSCRIBE_METADATA_KEY } from './constants';

export class WsRouter {
  private hubs: Map<string, object> = new Map();

  constructor() {
    this.buildHubs();
  }

  public findHub(type: string): HubHandler {
    const hub = this.hubs.get(type);

    if (!hub) {
      throw new NotFoundError(`Hub "${type}" not found`);
    }

    return hub as HubHandler;
  }

  private buildHubs() {
    const hubs = getHubs();

    hubs.forEach((Hub, hubName) => {
      Reflect.ownKeys((Hub as CallableFunction).prototype).forEach(classMethod => {
        const event = Reflect.getOwnMetadata(SUBSCRIBE_METADATA_KEY, (Hub as CallableFunction).prototype, classMethod);

        if (event !== undefined) {
          const route = this.buildHubKey(hubName, event);
          if (this.hubs.get(route)) {
            throw new Error(`Duplicate event ${event} in hub ${hubName}`);
          }

          this.hubs.set(route, {
            hub: Hub,
            method: classMethod.toString(),
          });
        }
      });
    });

    if (this.hubs.size === 0) {
      console.warn('No hubs found');
    }
  }

  private buildHubKey(hubName: string, event: string): string {
    if (event === '') {
      return hubName;
    }

    return `${hubName}:${event}`;
  }
}
