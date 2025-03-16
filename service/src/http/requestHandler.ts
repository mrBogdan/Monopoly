import http from 'node:http';

import {Headers} from './headers';
import { routes } from './routes';

export const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method?.toLowerCase() === 'get' && req.url === routes.health) {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'OK' }));
        return;
    }

    if (req.url === routes.public.signUp) {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'Sign up' }));
        return;
    }

    res.writeHead(404, {'Content-Type': Headers.ContentTypes.json});
    res.end(JSON.stringify({ message: 'Not found' }));
}
