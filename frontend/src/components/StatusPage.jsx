import { useEffect, useState } from 'react';
import PieChart from './PieChart';
import '../styles/StatusPage.css';

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL; // WebSocket Server URL

export default function StatusPage() {
    const [checkinList, setCheckinList] = useState([]);
    const [checkedIn, setCheckedIn] = useState(0);
    const [total, setTotal] = useState(104);

    useEffect(() => {
        const ws = new WebSocket(WS_BASE_URL);

        ws.onopen = () => {
            console.log("WebSocket connected");
            ws.send(JSON.stringify({ type: 'GET_ATTENDANCE_LOGS' })); // Request initial stats
        };

        ws.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);
            try {
                switch(type) {
                    case 'ATTENDANCE_LOGS':
                        setCheckinList(payload);
                        setCheckedIn(payload.length);
                        break;
                    case 'NEW_CHECKIN':
                        setCheckinList((prev) => [payload.delegate, ...prev]);
                        setCheckedIn((prev) => prev + 1)
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

        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("WebSocket disconnected");

        return () => ws.close(); // Cleanup WebSocket connection on unmount
    }, []);

    return (
        <div className="status-page">
            <div className="content">
                <div className="left-section">
                    {total > 0 && (
                        <div className={`chart-container ${total > 0 ? "visible" : ""}`}>
                            <PieChart checkedIn={checkedIn} notCheckedIn={total - checkedIn} />
                        </div>
                    )}
                </div>
                <div className="right-section">
                    <div className="checkin-bulletin">
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
