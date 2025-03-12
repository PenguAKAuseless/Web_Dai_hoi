import { useEffect, useState } from 'react';
import './MainPage.css';

const API_BASE_URL = process.env.RENDER_EXTERNAL_URL || "http://26.234.170.147:8000";

export default function MainPage() {
    const [data, setData] = useState({ total: '000', recent: [] });
    const [menuOpen, setMenuOpen] = useState(false);
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/attendance/stats`)
            .then(res => res.json())
            .then(setData);
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
                    <h2 className="counter-title">ATTENDANT COUNTER</h2>
                    <div className="pie-chart">PIE CHART</div>
                </div>
            </div>
        </div>
    );
}
