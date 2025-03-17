import { useState, useEffect } from "react";
import "./CheckInPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CheckInPage() {
    const [checkinList, setCheckin] = useState([]);
    const [displayQueue, setQueue] = useState([]);
    const [id, setId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const checkIn = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/attendance/checkin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ registrationId: id }),
                credentials: 'include'
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Check-in failed");

            setQueue((prev) => [...prev, data.delegate]);
            setCheckin((prev) => [...prev, data.delegate]);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="checkin-page">
            <div className="checkin-content">
                <div className="checkin-left-section">
                    {displayQueue.length > 0 ? (
                        <>
                            <img
                                src={displayQueue[0].image || "/logo.png"}
                                alt="Checked-in Person"
                                className="profile-img fade-in"
                            />
                            <p className="delegate-name">Họ và tên: {displayQueue[0].name}</p>
                            <p className="delegate-id">MSCB/MSSV: {displayQueue[0].delegate_id}</p>
                        </>
                    ) : (
                        <>
                            <div className="logo-container">
                                <img src="/logo.png" alt="Logo Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="logo" />
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
                            className="input-field"
                            placeholder="Enter ID"
                        />
                        <button onClick={checkIn} className="checkin-btn">Check-in</button>
                    </div>
                    <div className="checkin-list">
                        {checkinList.slice(1).map((delegate) => (
                            <div key={delegate.delegate_id} className="list-item">
                                <p className="user-name">{delegate.name} ({delegate.delegate_id})</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}