import { actionAdapters, actions } from './actionAdapters';

const notFoundHandler = () => 404;

export const actionFactory = (type: string): CallableFunction => {
  if (!type.includes(':')) {
    const handler = actionAdapters[type];

    if (!handler) {
      return notFoundHandler;
    }

    if (!(handler instanceof Function)) {
      const tryGetMain = handler['main'];

      if (!tryGetMain) {
        return notFoundHandler;
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
        return notFoundHandler;
      }

      return handler;
    }
    default: {
      return notFoundHandler;
    }
  }
}
