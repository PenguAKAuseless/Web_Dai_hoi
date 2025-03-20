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
            <div className="checkin-content">
                <div className="checkin-left-section">
                    {displayQueue.length > 0 ? (
                        <>
                            <img
                                src={displayQueue[0].image}
                                alt="Checked-in Person"
                                className="profile-img fade-in"
                            />
                            <p className="delegate-name">Họ và tên: {displayQueue[0].name}</p>
                            <p className="delegate-id">MSCB/MSSV: {displayQueue[0].delegate_id}</p>
                        </>
                    ) : (
                        <>
                            <div className="checkin-logo-container">
                                <img src="/logo.png" alt="Logo Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="checkin-logo" />
                            </div>
                            <div className="name-container">
                                <img src="/Ten_Dai_hoi.png" alt="Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="ten-dai-hoi" />
                            </div>
                        </>
                    )}
                </div>
                <div className="checkin-right-section">
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
                            placeholder="Enter ID"
                        />
                        <button
                            onClick={() => {
                                checkIn();
                                setId("");
                            }}
                            className="checkin-btn"
                        >
                            Check-in
                        </button>
                    </div>
                    <div className="checkin-list">
                        {checkinList.map((delegate) => (
                            <div key={delegate.delegate_id} className="list-item">
                                <p className="user-name">{delegate.delegate_id} {delegate.name} </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}