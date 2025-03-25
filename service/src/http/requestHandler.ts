import http from 'node:http';

import { Headers } from './headers';
import { Router } from './router/Router';
import { Methods } from './Methods';
import { globalContainer } from '../di/Container';

export const requestHandler = (router: Router) => async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const route = router.findRoute(req.url || '/', req.method?.toUpperCase() as Methods);

    const handler = route.handler();
    const instance = globalContainer.resolve(handler.controller());
    const response = await instance[handler.action()](req, res);
    res.writeHead(200, Headers.ContentTypes.json);
    res.end(JSON.stringify(response));
  } catch
    (error) {
    console.error(error);

    res.writeHead(404, Headers.ContentTypes.json);
    res.end(JSON.stringify({message: 'Not found'}));
  }
};
