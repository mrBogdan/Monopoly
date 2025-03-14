import { actionAdapters, actions } from './actionAdapters';
import { NotFoundError } from '../errors/NotFoundError';

export const actionFactory = (type: string): CallableFunction => {
  if (!type.includes(':')) {
    const handler = actionAdapters[type];

    if (!handler) {
      throw new NotFoundError(`Action "${type}" not found`);
    }

    if (!(handler instanceof Function)) {
      const tryGetMain = handler['main'];

      if (!tryGetMain) {
        throw new NotFoundError(`Action "${type}" method not found`);
      }

      return tryGetMain;
    }

    return handler;
  }

  const [controller, action] = type.split(':');
  switch (controller.toLowerCase()) {
    case actions.Game: {
      const adapter = actionAdapters[controller];
      const handler = adapter[action];

      if (!handler) {
        throw new NotFoundError(`Action "${type}" not found`);
      }

      return handler;
    }
    default: {
      throw new NotFoundError(`Action "${type}" not found`);
    }
  }
}
