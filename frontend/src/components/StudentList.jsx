import { useEffect, useState } from 'react';

export default function StudentList() {
    const [stats, setStats] = useState({ total: 0, recent: [] });

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch('/api/attendance/stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2>Total Attendance: {stats.total.toString().padStart(3, '0')}</h2>
            <h3>Recently Checked-in:</h3>
            <ul>
                {stats.recent.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
}
import { useEffect, useState } from 'react';

export default function AttendanceList() {
    const [stats, setStats] = useState({ total: 0, recent: [] });

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch('/api/attendance/stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2>Total Attendance: {stats.total.toString().padStart(3, '0')}</h2>
            <h3>Recently Checked-in:</h3>
            <ul>
                {stats.recent.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
}
