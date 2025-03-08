import { WebSocketServer } from 'ws';
import { Action } from './action/Action';
import { actionFactory } from './actionFactory';

const PORT = process.env.PORT || 8080;

const run = async () => {
  const wss = new WebSocketServer({
    port: +PORT,
  });

  wss.on("listening", () => {
    console.log(`[WS] Server is running on: ${PORT}`);
  });

  wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (msg) => {
      const request: Action = JSON.parse(msg.toString());

      console.log({request});

      const handler = actionFactory(request.type);

      const response = handler(request);

      ws.send(JSON.stringify(response));
    });
  });
};

run();

process.on('uncaughtException', console.error);
