import http, { Server } from 'http';

const Headers = {
    ContentTypes: {
        json: 'application/json',
        plain: 'text/plain',
    },
}

const server = http.createServer((req, res) => {
    if (req.method?.toLowerCase() === 'get' && req.url === '/health') {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'OK' }));
        return;
    }

    if (req.url === 'public/sign-up') {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'Sign up' }));
        return;
    }

    res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
    res.end(JSON.stringify({ message: 'Hello, World!' }));
});

export const getHttpServer = (): Server => {
    return server;
};

