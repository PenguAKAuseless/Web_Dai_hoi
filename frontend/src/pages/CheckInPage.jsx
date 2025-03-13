import { useState, useEffect } from "react";
import "./CheckInPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CheckInPage() {
    const [queue, setQueue] = useState([]);
    const [id, setId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function checkAdmin() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/admin-status`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();

            if (!response.ok || !data.isAdmin) {
                setErrorMessage("Not an admin! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/";
                }, 10000);
            }
        } catch (error) {
            setErrorMessage("Admin check failed.");
        }
    }

    useEffect(() => {
        checkAdmin();
    }, []);

    useEffect(() => {
        if (queue.length > 0) {
            const timer = setTimeout(() => {
                setQueue((prev) => prev.slice(1));
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [queue]);

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
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="checkin-page">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="input-section">
                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="input-field"
                    placeholder="Enter ID"
                />
                <button onClick={checkIn} className="checkin-btn">Check-in</button>
            </div>
            <div className="checkin-content">
                <div className="checkin-left-section">
                    {queue.length > 0 ? (
                        <>
                            <img
                                src={queue[0].image_url || "/logo-placeholder.png"}
                                alt="Checked-in Person"
                                className="profile-img fade-in"
                            />
                            <p className="user-name">{queue[0].name} ({queue[0].delegate_id})</p>
                        </>
                    ) : (
                        <>
                            <img src="/logo.png" alt="Idle" className="idle-img" />
                            <p className="idle-text">Waiting for Check-in...</p>
                        </>
                    )}
                </div>
                <div className="checkin-right-section">
                    <div className="queue-list">
                        {queue.slice(1).map((delegate) => (
                            <div key={delegate.delegate_id} className="queue-item">
                                <img
                                    src={delegate.image_url || "/logo-placeholder.png"}
                                    alt="Checked-in Person"
                                    className="profile-img"
                                />
                                <p className="user-name">{delegate.name} ({delegate.delegate_id})</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}