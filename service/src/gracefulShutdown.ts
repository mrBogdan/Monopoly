import { Server } from 'node:http';

import { WebSocketServer } from 'ws';



export const gracefulShutdown = (httpServer: Server, wss: WebSocketServer) => {
    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received: closing HTTP server');
        httpServer.close(() => {
            console.log('HTTP server closed: closing WebSocket server');
            wss.close(() => {
                console.log('WebSocket server closed: exiting');
                process.exit(0);
            });
        });
    });
};
