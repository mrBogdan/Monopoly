import { WebSocketServer } from 'ws';

const run = async () => {
  const wss = new WebSocketServer({
    port: 8080,
  });

  wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (msg) => {
      console.log({ msg });
    });
  });
};

run();
