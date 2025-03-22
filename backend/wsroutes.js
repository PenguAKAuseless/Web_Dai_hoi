import { WebSocketServer } from 'ws';
import pool from "./db.js";

console.log(await pool.query("SELECT * FROM conference;"))

const setupWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    // Keep-alive mechanism
    let keepAliveInterval;

    function startKeepAlive() {
        // Clear any existing interval
        if (keepAliveInterval) clearInterval(keepAliveInterval);

        // Create a fake client connection every 5 minutes
        keepAliveInterval = setInterval(() => {
            console.log('Sending keep-alive ping');
            // Ping all clients to keep connections alive
            wss.clients.forEach(client => {
                try {
                    client.ping();
                } catch (err) {
                    console.error('Ping error:', err);
                }
            });

            // If there are no clients, you could make an internal request to your server
            if (wss.clients.size === 0) {
                console.log('No clients connected, keeping server active');
                // You could add additional logic here if needed
            }
        }, 2 * 60 * 1000); // 2 minutes interval
    }

    // Start the keep-alive as soon as the server starts
    startKeepAlive();

    wss.on('connection', (ws) => {
        console.log('New client connected');

        ws.on('message', async (message) => {
            try {
                const { type, payload } = JSON.parse(message);
            
                switch (type) {
                    case 'GET_ATTENDANCE_LOGS':
                        const logsResult = await pool.query(`
                            SELECT attendance_log.*, conference.name, conference.image
                            FROM attendance_log
                            JOIN conference ON attendance_log.delegate_id = conference.delegate_id
                            ORDER BY attendance_log.log_id DESC;
                        `);
                        ws.send(JSON.stringify({ type: 'ATTENDANCE_LOGS', payload: logsResult.rows }));
                        break;

                    case 'CHECKIN_ATTENDANCE':
                        const { registrationId } = payload;
                        const logResult = await pool.query('SELECT * FROM attendance_log WHERE delegate_id = $1', [registrationId]);
                        if (logResult.rows.length > 0) {
                            ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Already checked in' } }));
                            break;
                        }
                        const delegateCheckResult = await pool.query('SELECT * FROM conference WHERE delegate_id = $1', [registrationId]);
                        if (delegateCheckResult.rows.length === 0) {
                            ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Delegate not found' } }));
                            break;
                        }
                        const newCheckin = { delegate: delegateCheckResult.rows[0] };
                        await pool.query(
                            'INSERT INTO attendance_log (delegate_id, timestamp) VALUES ($1, NOW())',
                            [registrationId]
                        );
                        ws.send(JSON.stringify({ type: 'CHECKIN_SUCCESS', payload: newCheckin }));

                        // Broadcast the new check-in to all connected clients
                        wss.clients.forEach(client => {
                            if (client !== ws && client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify({ type: 'NEW_CHECKIN', payload: newCheckin }));
                            }
                        });
                        break;

                    default:
                        ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Unknown message type' } }));
                        break;
                }
            } catch (err) {
                ws.send(JSON.stringify({ type: 'ERROR', payload: { message: err.message } }));
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    return wss;
};

export default setupWebSocket;