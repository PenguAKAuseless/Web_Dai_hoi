import { useEffect, useState } from 'react';
import PieChart from '../components/PieChart';
import './MainPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MainPage() {
    const [checkedIn, setCheckedIn] = useState(0);
    const [total, setTotal] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchTotalDelegates = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/attendance/stats`);
            const stats = await res.json();
            setTotal(stats.total);
        } catch (error) {
            console.error("Error fetching total delegates:", error);
        }
    };

    const fetchCheckedInCount = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/attendance/stats`);
            const stats = await res.json();
            setCheckedIn(stats.checkedIn);
        } catch (error) {
            console.error("Error fetching checked-in count:", error);
        }
    };

    useEffect(() => {
        fetchTotalDelegates();
        fetchCheckedInCount();
        const interval = setInterval(fetchCheckedInCount, 5000);
        return () => clearInterval(interval);
    }, []);

    const login = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.error || "Login failed.");
                return;
            }

            alert("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/check-in";
            }, 3000);
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                    <img src="/Ten_Dai_hoi.png" alt="Event Title" className="ten-dai-hoi" />
                </div>
                <div className="right-section">
                    <PieChart checkedIn={checkedIn} total={total} />
                </div>
            </div>
        </div>
    );
}