import { WebSocketServer } from 'ws';

export const getWebSocketServer = (): WebSocketServer => {
  const wss = new WebSocketServer({noServer: true});
  wss.on('error', console.error);

  wss.on('connection', (ws) => {
    ws.on('error', console.error);
  });

  wss.on('close', () => {
    console.log('Client disconnected');
  });


  return wss;
};
