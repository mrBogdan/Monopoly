import { WebSocketServer } from 'ws';

import { getMessageHandler } from './getMessageHandler';

let wss: WebSocketServer | null = null;

export const getWebSocketServer = (): WebSocketServer => {
    if (!wss) {
        wss = new WebSocketServer({noServer: true});
        wss.on('error', console.error);

        wss.on('connection', (ws) => {
            ws.on('error', console.error);

            ws.on('message', getMessageHandler(ws));
        });

        wss.on('close', () => {
            console.log('Client disconnected');
        });
    }

    return wss;
};
