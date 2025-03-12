import { useState, useEffect } from "react";
import "./CheckInPage.css";

const API_BASE_URL = process.env.RENDER_EXTERNAL_URL || "http://26.234.170.147:8000";

export default function CheckInPage() {
    const [queue, setQueue] = useState([]);
    const [id, setId] = useState("");

    async function checkAdmin() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/admin-status`, {
                method: "GET",
                credentials: "include", // Ensures cookies/session are sent
            });
            const data = await response.json();

            console.log("Admin status response:", data);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (!data.isAdmin) {
                console.error("Not an admin! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/"; // Redirect
                }, 3000);
            }
        } catch (error) {
            console.error("Admin check failed:", error);
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

            if (!res.ok) throw new Error("Check-in failed");

            const data = await res.json();
            if (data.attendance) {
                setQueue((prev) => [...prev, data.attendance]);
                // Update the total count in the local storage
                localStorage.setItem('totalCheckedIn', data.total);
            } else {
                console.error("Invalid check-in response:", data);
            }
        } catch (error) {
            console.error("Check-in error:", error.message);
        }
    };

    return (
        <div className="checkin-page">
            <div className="input-section">
                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="input-field"
                    placeholder="Enter ID"
                />
                <button onClick={checkIn} className="checkin-btn">Check-in</button>
            </div>
            <div className="content">
                <div className="left-section">
                    {queue.length > 0 ? (
                        <>
                            <img
                                src={queue[0].image_url || "/logo-placeholder.png"}
                                alt="Checked-in Person"
                                className="profile-img fade-in"
                            />
                            <p className="user-name">{queue[0].name} ({queue[0].id})</p>
                        </>
                    ) : (
                        <>
                            <img src="/logo.png" alt="Idle" className="idle-img" />
                            <p className="idle-text">Waiting for Check-in...</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}