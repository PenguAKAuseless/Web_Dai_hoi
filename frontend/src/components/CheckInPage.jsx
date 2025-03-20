import { useState, useEffect } from "react";
import "../styles/CheckInPage.css";

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export default function CheckInPage() {
    const [checkinList, setCheckin] = useState([]);
    const [displayQueue, setQueue] = useState([]);
    const [id, setId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(WS_BASE_URL);
        setSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            ws.send(JSON.stringify({ type: 'GET_ATTENDANCE_LOGS' }));
        };

        ws.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);
            console.log(type, payload);

            try {
                switch (type) {
                    case 'ATTENDANCE_LOGS':
                        setCheckin(payload);
                        if (payload.length > 0) {
                            setQueue([payload[0]]);
                        }
                        break;
                    case 'CHECKIN_SUCCESS':
                        setQueue((prev) => [payload.delegate, ...prev]);
                        setCheckin((prev) => [payload.delegate, ...prev]);
                        break;
                    case 'NEW_CHECKIN':
                        setQueue((prev) => [payload.delegate, ...prev]);
                        setCheckin((prev) => [payload.delegate, ...prev]);
                        break;
                    case 'ERROR':
                        setErrorMessage(payload.message);
                        break;
                    default:
                        console.error('Unknown message type:', type);
                }
            } catch (error) {
                console.error('Error parsing message:', event.data);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setErrorMessage('WebSocket error');
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            ws.close();
        };
    }, []);

    const checkIn = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'CHECKIN_ATTENDANCE', payload: { registrationId: id } }));
        } else {
            setErrorMessage('WebSocket connection is not open');
        }
    };

    return (
        <div className="checkin-page">
            <div className="checkin-text-container">
                <img src="./check-in-text.png" className="checkin-text" />
            </div>
            <div className="checkin-content">
                <div className="checkin-left-section">
                    {displayQueue.length > 0 ? (
                        <div className="profile-container">
                            <div className="welcome-container">
                                <p className="welcome">Chào mừng</p>
                            </div>
                            <img
                                src={displayQueue[0].image}
                                alt="Checked-in Person"
                                className="profile-img fade-in"
                            />
                            <img
                                src="./frame.png"
                                alt="Frame"
                                className="frame-overlay"
                            />
                            <div class="profile-info">
                                <p class="delegate-id">MSSV: {displayQueue[0].delegate_id} </p>
                                <p class="delegate-name">{displayQueue[0].name}</p>
                            </div>
                        </div>

                    ) : (
                        <>
                            <div className="checkin-logo-container">
                                <img src="/logo.png" alt="Logo" className="checkin-logo" />
                            </div>
                            <div className="name-container">
                                <img src="/Ten_Dai_hoi.png" alt="Đại hội đại biểu" className="ten-dai-hoi" />
                            </div>
                        </>
                    )}
                </div>
                <div className="checkin-right-section">
                    <div className="checkin-bulletin">

                        <div className="input-section">
                            <input
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        checkIn();
                                        setId("");
                                    }
                                }}
                                className="input-field"
                                placeholder="Nhập ID..."
                            />
                            <button
                                onClick={() => {
                                    checkIn();
                                    setId("");
                                }}
                                className="checkin-btn"
                            >
                                ▶
                            </button>
                        </div>
                        <div className="checkin-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="th-name">Họ và tên</th>
                                        <th className="th-id">MSSV</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkinList.map((delegate) => (
                                        <tr key={delegate.delegate_id}>
                                            <td className="td-name">{delegate.name}</td>
                                            <td className="td-id">{delegate.delegate_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}