import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
export default function MainPage() {
    const [data, setData] = useState({ total: '000', recent: [] });
    useEffect(() => {
        fetch('/api/attendance/stats')
            .then(res => res.json())
            .then(setData);
    }, []);
    return (
        <div>
            <Navbar />
            <div className="text-center p-8">
                <img src="/logo.png" alt="Class Logo" className="mx-auto w-24" />
                <h1 className="text-2xl font-bold mt-4">Class Name</h1>
                <h2 className="text-5xl font-mono mt-2">{data.total.padStart(3, '0')}</h2>
            </div>
            <div className="p-4">
                <h3 className="text-xl">Recently Checked-in:</h3>
                <ul>{data.recent.map((name, i) => <li key={i}>{name}</li>)}</ul>
            </div>
        </div>
    );
}