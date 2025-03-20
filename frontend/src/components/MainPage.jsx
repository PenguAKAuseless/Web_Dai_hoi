import { useEffect, useState } from 'react';
import PieChart from './PieChart';
import '../styles/MainPage.css';

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL; // WebSocket Server URL

export default function MainPage() {
    const [checkedIn, setCheckedIn] = useState(0);
    const [total, setTotal] = useState(104);

    useEffect(() => {
        const ws = new WebSocket(WS_BASE_URL);

        ws.onopen = () => {
            console.log("WebSocket connected");
            ws.send(JSON.stringify({ type: 'GET_ATTENDANCE_STATS' })); // Request initial stats
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'ATTENDANCE_STATS') {
                    setCheckedIn(message.payload.total);
                } else if (message.type === 'NEW_CHECKIN') {
                    setCheckedIn((prev) => prev + 1); // Increment count on new check-in
                }
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        };

        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("WebSocket disconnected");

        return () => ws.close(); // Cleanup WebSocket connection on unmount
    }, []);

    return (
        <div className="main-page">
            <div className="main-content">
                <div className="main-left-section">
                    <div className="logo-container">
                        <img src="/logo.png" alt="Logo Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="logo" />
                    </div>
                    <div className="name-container">
                        <img src="/Ten_Dai_hoi.png" alt="Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="ten-dai-hoi" />
                    </div>
                </div>
                <div className="main-right-section">
                    {total > 0 && (
                        <div className={`chart-container ${total > 0 ? "visible" : ""}`}>
                            <PieChart checkedIn={checkedIn} notCheckedIn={total - checkedIn} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
