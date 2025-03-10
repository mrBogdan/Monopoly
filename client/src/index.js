const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
  socket.send(JSON.stringify({type: 'game:getTiles'}));
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});
