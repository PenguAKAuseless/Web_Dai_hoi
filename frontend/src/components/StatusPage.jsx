import { useState, useEffect } from "react";

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export default function CheckInPage() {
    const [checkinList, setCheckinList] = useState([]);
    const [displayQueue, setQueue] = useState([]);
    const [id, setId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(WS_BASE_URL);
        setSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            ws.send(JSON.stringify({ type: 'GET_ATTENDANCE_LOGS' }));
        };

        ws.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);
            console.log(type, payload);

            try {
                switch (type) {
                    case 'ATTENDANCE_LOGS':
                        setCheckinList(payload);
                        if (payload.length > 0) {
                            setQueue([payload[0]]);
                        }
                        break;
                    case 'CHECKIN_SUCCESS':
                        setQueue((prev) => [payload.delegate, ...prev]);
                        setCheckinList((prev) => [payload.delegate, ...prev]);
                        break;
                    case 'NEW_CHECKIN':
                        setQueue((prev) => [payload.delegate, ...prev]);
                        setCheckinList((prev) => [payload.delegate, ...prev]);
                        break;
                    case 'ERROR':
                        setErrorMessage(payload.message);
                        break;
                    default:
                        console.error('Unknown message type:', type);
                }
            } catch (error) {
                console.error('Error parsing message:', event.data);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setErrorMessage('WebSocket error');
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            ws.close();
        };
    }, []);

    const checkIn = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'CHECKIN_ATTENDANCE', payload: { registrationId: id } }));
        } else {
            setErrorMessage('WebSocket connection is not open');
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: "url('/background.png')" }}>
            {/* CHECK-IN Header */}
            <div className="flex items-center justify-center h-1/5 mt-10 w-full">
                <div className="w-2/3 text-center">
                    <h1 className="text-6xl font-black text-orange-500 uppercase tracking-wide" style={{
                        fontFamily: 'Montserrat Black, sans-serif',
                        textShadow: '0 0 6px white, 0 0 10px white',
                        background: 'linear-gradient(to right, #f07307, #ffb049)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        CHECK-IN
                    </h1>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex w-full h-4/5 justify-around items-center mt-8">
                {/* Left Section */}
                <div className="w-2/5 h-full flex flex-col justify-center items-center text-center relative">
                    {displayQueue.length > 0 ? (
                        <div className="relative flex justify-center items-center w-64 h-64 m-auto">
                            {/* Welcome text */}
                            <div className="absolute -top-1/4 flex flex-col z-10 w-full">
                                <p className="text-4xl font-semibold text-blue-500 uppercase mt-3" style={{ fontFamily: 'Montserrat Black, sans-serif' }}>
                                    CHÀO MỪNG
                                </p>
                            </div>

                            {/* Profile Image */}
                            <img
                                src={displayQueue[0].image}
                                alt="Checked-in Person"
                                className="w-52 h-52 rounded-full object-cover absolute animate-fadeIn"
                            />
                            <img
                                src="./frame.png"
                                alt="Frame"
                                className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            />

                            {/* Profile Info */}
                            <div className="absolute top-full w-full" style={{ fontFamily: 'Montserrat Black, sans-serif' }}>
                                <p className="text-xl font-black text-blue-800 mb-0">MSSV: {displayQueue[0].delegate_id}</p>
                                <p className="text-5xl font-black text-orange-500 uppercase mt-3">{displayQueue[0].name}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-center items-center w-full h-1/3">
                                <img src="/logo.png" alt="Logo" className="max-w-full max-h-full w-auto" />
                            </div>
                            <div className="mt-4">
                                <img src="/ten-dai-hoi.png" alt="Đại hội đại biểu" className="max-w-full" />
                            </div>
                        </>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex w-1/2 h-full justify-start items-center">
                    <div className="bg-white bg-opacity-35 rounded-3xl border-10 border-orange-500 flex flex-col items-start justify-start overflow-hidden mr-10 p-5 w-3/4 h-3/4" style={{ fontFamily: 'Montserrat Black, sans-serif' }}>
                        {/* Input Section */}
                        <div className="flex items-center rounded-full border-3 border-blue-600 bg-white overflow-hidden w-full">
                            <input
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        checkIn();
                                        setId("");
                                    }
                                }}
                                className="flex-1 border-none text-base outline-none py-2.5 px-5"
                                placeholder="Nhập số ID của bạn..."
                                style={{ fontFamily: 'Montserrat Black, sans-serif' }}
                            />
                            <button
                                onClick={() => {
                                    checkIn();
                                    setId("");
                                }}
                                className="bg-green-600 text-white border-none py-2.5 px-5 rounded-r-full text-xl cursor-pointer transition-colors hover:bg-green-800"
                                style={{ fontFamily: 'Montserrat Bold, sans-serif', fontWeight: 'bolder' }}
                            >
                                ▶
                            </button>
                        </div>

                        {/* Check-in List */}
                        <div className="w-full mt-4">
                            <table className="w-full border-collapse text-xl">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2.5 px-6 text-blue-500 font-bold border-b-4 border-blue-500">Họ và tên</th>
                                        <th className="text-left py-2.5 px-6 text-blue-500 font-bold border-b-4 border-blue-500">MSSV</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkinList.map((delegate) => (
                                        <tr key={delegate.delegate_id}>
                                            <td className="text-left py-2.5 px-6 w-4/5">{delegate.name}</td>
                                            <td className="text-left py-2.5 px-6 w-1/5">{delegate.delegate_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add custom animation for fade in effect */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}