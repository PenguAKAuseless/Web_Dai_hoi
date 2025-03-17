import { useEffect, useState } from 'react';
import PieChart from '../components/PieChart';
import './MainPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MainPage() {
    const [checkedIn, setCheckedIn] = useState(0);
    const [total, setTotal] = useState(104);

    const fetchCheckedInCount = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/attendance/stats`);
            const stats = await res.json();
            if (!isNaN(stats.checkedIn)) {
                setCheckedIn(stats.checkedIn);
            }
        } catch (error) {
            console.error("Error fetching checked-in count:", error);
        }
    };

    useEffect(() => {
        fetchCheckedInCount();
        const interval = setInterval(fetchCheckedInCount, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main-page">
            <div className="main-content">
                <div className="main-left-section">
                    <div className="logo-container">
                        <img src="/logo.png" alt="Logo Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="logo" />
                    </div>
                    <img src="/Ten_Dai_hoi.png" alt="Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="ten-dai-hoi" />
                </div>
                <div className="main-right-section">
                    {total > 0 && (
                        <div className={`chart-container ${total > 0 ? "visible" : ""}`}>
                            <PieChart checkedIn={checkedIn} total={total} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}