import { useState, useEffect } from "react";

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export default function CheckInPage() {
    const [checkinList, setCheckinList] = useState([]);
    const [displayQueue, setQueue] = useState([]);
    const [id, setId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [socket, setSocket] = useState(null);

    // Function to request attendance logs
    const requestAttendanceLogs = (ws) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log('Requesting attendance logs');
            ws.send(JSON.stringify({ type: 'GET_ATTENDANCE_LOGS' }));
        }
    };

    useEffect(() => {
        const ws = new WebSocket(WS_BASE_URL);
        setSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            requestAttendanceLogs(ws);
        };

        ws.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);
            console.log(type, payload);

            try {
                switch (type) {
                    case 'ATTENDANCE_LOGS':
                        setCheckinList(payload);
                        if (payload.length > 0) {
                            setQueue(payload);
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

        // Add event listener for page refresh/reload
        window.addEventListener('load', () => {
            console.log('Page loaded/refreshed');
            if (ws.readyState === WebSocket.OPEN) {
                requestAttendanceLogs(ws);
            }
        });

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
        <div className="bg-gradient-to-br from-blue-300 to-yellow-100 min-h-screen flex flex-col"
            style={{
                backgroundImage: "url('/background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}>

            {/* Main content container */}
            <div className="z-10 w-full h-screen flex flex-col">
                {/* CHECK-IN Header */}
                <div className="w-full flex justify-center mt-8 mb-6">
                    <img src="./check-in-text.png" alt="CHECK-IN" className="h-16" />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-row justify-between px-12 flex-1">
                    {/* Left Section - Logo and Event Information OR Welcome Message */}
                    <div className="w-1/2 flex flex-col items-center justify-center">
                        {displayQueue.length > 0 ? (
                            // Welcome content (replaces logo & ten-dai-hoi when someone checks in)
                            <div className="flex flex-col items-center animate-fadeIn w-full max-w-md mx-auto">
                                <p className="text-5xl font-bold text-blue-500 mb-6 text-center"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    CHÀO MỪNG
                                </p>

                                {/* Simple frame and image implementation - centered */}
                                <div className="mb-8 relative mx-auto" style={{ width: "300px", height: "300px" }}>
                                    {/* Blue circular frame */}
                                    <div className="w-full h-full rounded-full"
                                        style={{
                                            boxShadow: "0 0 0 12px #1597d8",
                                            position: "absolute",
                                            top: 0,
                                            left: 0
                                        }}>
                                    </div>

                                    {/* Profile image */}
                                    <div className="w-full h-full overflow-hidden rounded-full">
                                        <img
                                            src={displayQueue[0].image}
                                            alt="Checked-in Person"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <p className="text-2xl font-bold text-blue-600 mb-2 text-center"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    MSSV: {displayQueue[0].delegate_id}
                                </p>
                                {/* Larger name display */}
                                <p className="text-5xl font-extrabold text-orange-500 uppercase text-center"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    {displayQueue[0].name}
                                </p>
                            </div>
                        ) : (
                            // Default left side with logo and event title
                            <div className="flex flex-col items-center max-w-md mx-auto">
                                {/* Logo */}
                                <div className="mb-6 w-64">
                                    <img src="/logo.png" alt="Logo" className="w-full h-auto" />
                                </div>

                                {/* Đại hội đại biểu text */}
                                <div className="w-full">
                                    <img src="/ten-dai-hoi.png" alt="Đại hội đại biểu" className="w-full h-auto" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section - Check-in Form and Attendee List */}
                    <div className="w-1/2 flex justify-center items-center">
                        <div className="bg-white bg-opacity-35 p-6 w-full max-w-xl h-auto"
                            style={{
                                border: "8px solid #ee6709",
                                borderRadius: "67px",
                            }}
                        >
                            {/* Input Section */}
                            <div className="flex items-center rounded-full border-4 border-blue-400 bg-white overflow-hidden mb-6">
                                <input
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            checkIn();
                                            setId("");
                                        }
                                    }}
                                    className="flex-1 border-none text-lg outline-none py-3 px-6"
                                    placeholder="Nhập số ID của bạn..."
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                                />
                                <button
                                    onClick={() => {
                                        checkIn();
                                        setId("");
                                    }}
                                    className="bg-green-600 text-white border-none py-3 px-6 text-xl flex items-center justify-center"
                                    style={{ fontFamily: 'Montserrat, sans-serif', width: '60px' }}
                                >
                                    <span className="transform text-xl">➡</span>
                                </button>
                            </div>

                            {/* Headers for the list */}
                            <div className="flex w-full border-b-4 border-blue-500 pb-2 mb-2">
                                <div className="text-blue-500 font-bold text-xl w-2/3 text-center pl-2"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    Họ và tên
                                </div>
                                <div className="text-blue-500 font-bold text-xl w-1/3 text-center pl-2"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    MSSV
                                </div>
                            </div>

                            {/* Attendee List with fixed height */}
                            <div className="overflow-y-auto custom-scrollbar" style={{ height: "calc(100vh - 350px)", maxHeight: "420px" }}>
                                {checkinList.map((delegate) => (
                                    <div key={delegate.delegate_id} className="flex w-full py-2 border-b border-gray-200">
                                        <div className="w-3/4 pl-2 text-lg font-bold uppercase"
                                            style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                            {delegate.name}
                                        </div>
                                        <div className="w-1/4 pl-2 text-lg font-bold">
                                            {delegate.delegate_id}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>  
                </div>
            </div>

            {/* Animations and Custom Scrollbar */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.7);
                }
            `}</style>
        </div>
    );
}