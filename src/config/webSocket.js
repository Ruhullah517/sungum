const WebSocket = require('ws');

let clients = [];

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.on('close', () => {
            console.log('Client disconnected');
            clients = clients.filter(client => client.readyState === WebSocket.OPEN);
        });
    });
}

function broadcastNotification(notification) {
    console.log('Broadcasting notification:', notification);
    clients = clients.filter(ws => ws.readyState === WebSocket.OPEN); // Remove inactive clients
    clients.forEach(ws => ws.send(JSON.stringify(notification)));
}

module.exports = { setupWebSocket, broadcastNotification };
