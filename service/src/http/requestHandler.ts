import http from 'node:http';

import { Headers } from './headers';
import { Router } from './router/Router';
import { Methods } from './Methods';
import { globalContainer } from '../di/Container';

export const requestHandler = (router: Router) => (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        const route = router.findRoute(req.url || '/', req.method?.toUpperCase() as Methods);

        if (route) {
            const handler = route.handler();

            if (!handler) {
                res.writeHead(404, {'Content-Type': Headers.ContentTypes.json});
                res.end(JSON.stringify({ message: 'Not found' }));
                return;
            }
            const instance = globalContainer.resolve(handler?.controller());
            instance[handler?.action()](req, res);
            res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
            res.end(JSON.stringify({ message: 'OK' }));
            return;
        }
    } catch (error) {
        console.error(error);

        res.writeHead(404, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'Not found' }));
    }
}
