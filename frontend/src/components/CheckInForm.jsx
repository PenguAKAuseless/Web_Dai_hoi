import { useState } from 'react';

export default function CheckInForm() {
    const [id, setId] = useState('');
    const [checkin, setCheckin] = useState(null);
    const [recent, setRecent] = useState([]);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to handle admin login
    const login = async () => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (res.ok) setIsAuthenticated(true);
    };

    // Function to handle check-in
    const checkIn = async () => {
        if (!isAuthenticated) return;
        const res = await fetch('/api/attendance/checkin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (res.ok) {
            const data = await res.json();
            setCheckin(data.checkin);
            setRecent(prev => [data.checkin.name, ...prev.slice(0, 4)]);
        }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Admin Password"
                    />
                    <button onClick={login}>Login</button>
                </div>
            ) : (
                <div>
                    <input
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="Enter ID"
                    />
                    <button onClick={checkIn}>Check-in</button>
                </div>
            )}
            {checkin && (
                <div>
                    <h3>Checked in: {checkin.name}</h3>
                </div>
            )}
            {recent.length > 0 && (
                <div>
                    <h3>Recent Check-ins:</h3>
                    <ul>
                        {recent.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
