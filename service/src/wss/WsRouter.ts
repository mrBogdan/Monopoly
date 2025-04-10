import 'reflect-metadata';

import { getHubs, HubHandler } from './Hub';
import { SUBSCRIBE_METADATA_KEY } from './constants';
import { NotFoundError } from '../errors';

export class WsRouter {
  private hubs: Map<string, object> = new Map();

  constructor() {
    this.buildHubs();
  }

  public findHub(type: string): HubHandler {
    const hub = this.hubs.get(type);

    if (!hub) {
      throw new NotFoundError(`Hub ${hub} not found`);
    }

    return hub as { hub: object, method: string };
  }

  private buildHubs() {
    const hubs = getHubs();

    hubs.forEach((Hub, hubName) => {
      Reflect.ownKeys((Hub as CallableFunction).prototype).forEach(key => {
        const event = Reflect.getMetadata(SUBSCRIBE_METADATA_KEY, Hub, key);

        if (event) {
          const route = this.buildHubKey(hubName, event);
          if (this.hubs.get(route)) {
            throw new Error(`Duplicate event ${event} in hub ${hubName}`);
          }

          this.hubs.set(route, {
            hub: Hub,
            method: key,
          });
        }
      });
    });
  }

  private buildHubKey(hubName: string, event: string): string {
    return `${hubName}:${event}`;
  }
}
