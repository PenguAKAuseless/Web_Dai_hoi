import { useState } from 'react';
import Navbar from '../components/Navbar';
export default function CheckInPage() {
    const [registration, setRegistration] = useState(null);
    const [recent, setRecent] = useState([]);
    const [id, setId] = useState('');

    const checkIn = async () => {
        const res = await fetch('/api/attendance/checkin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        if (res.ok) {
            const data = await res.json();
            setRegistration(data.registration);
            setRecent(prev => [data.registration.name, ...prev.slice(0, 4)]);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-8">
                <input value={id} onChange={e => setId(e.target.value)} className="border p-2" placeholder="Enter ID" />
                <button onClick={checkIn} className="ml-2 bg-green-500 p-2">Check-in</button>
            </div>
            <div className="flex p-4">
                <div className="w-1/2 bg-gray-200 p-4 text-center">
                    {registration && (<>
                        <img src={registration.image_url || '/logo-placeholder.png'} alt="Dai_bieu" className="mx-auto w-24" />
                        <p>{registration.name} ({registration.id})</p>
                    </>)}
                </div>
                <div className="w-1/2 p-4">
                    <h3 className="text-xl">Recently Checked-in:</h3>
                    <ul>{recent.map((name, i) => <li key={i}>{name}</li>)}</ul>
                </div>
            </div>
        </div>
    );
}