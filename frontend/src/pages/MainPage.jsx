import { useEffect, useState } from 'react';
import PieChart from '../components/PieChart';
import './MainPage.css';

const API_BASE_URL = process.env.RENDER_EXTERNAL_URL || "http://26.234.170.147:8000";

export default function MainPage() {
    const [checkedIn, setCheckedIn] = useState(0);
    const [total, setTotal] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");

    const fetchTotalDelegates = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/attendance/stats`);
            const stats = await res.json();
            setTotal(stats.total);
            localStorage.setItem('totalDelegates', stats.total);
        } catch (error) {
            console.error("Error fetching total delegates:", error);
        }
    };

    const fetchCheckedInCount = () => {
        const checkedInCount = localStorage.getItem('totalCheckedIn');
        setCheckedIn(checkedInCount ? parseInt(checkedInCount, 10) : 0);
    };

    useEffect(() => {
        const totalDelegates = localStorage.getItem('totalDelegates');
        if (!totalDelegates) {
            fetchTotalDelegates(); // Fetch total delegates only once if not in local storage
        } else {
            setTotal(parseInt(totalDelegates, 10));
        }
        fetchCheckedInCount(); // Initial fetch
        const interval = setInterval(fetchCheckedInCount, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const login = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Show popup message
                alert("Login successful! Redirecting...");

                // Wait for 3 seconds before redirecting
                setTimeout(() => {
                    window.location.href = "/check-in"; // Redirect
                }, 3000);
            } else {
                alert("Login failed: " + data.error); // Show error message
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="main-page">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            {menuOpen && (
                <div className="menu">
                    <h2>Login</h2>
                    <input
                        type="text"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button onClick={login} className="login-btn">Login</button>
                </div>
            )}
            <div className="content">
                <div className="left-section">
                    <img src="/logo.png" alt="Class Logo" className="logo" />
                    <img src="/Ten_Dai_hoi.png" alt="Đại hội Đại biểu Hội Sinh viên Việt Nam khoa Khoa học và Máy tính, nhiệm kỳ 2025 - 2028" className="ten-dai-hoi" />
                </div>
                <div className="right-section">
                    <PieChart checkedIn={checkedIn} total={total} />
                </div>
            </div>
        </div>
    );
}