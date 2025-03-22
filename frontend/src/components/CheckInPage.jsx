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
                            setQueue([payload]);
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
                    {/* Left Section - Logo and Event Information */}
                    <div className="w-1/2 flex flex-col items-center justify-center pr-12">
                        <div className="flex flex-col items-center">
                            {/* Logo */}
                            <div className="mb-6 w-64">
                                <img src="/logo.png" alt="Logo" className="w-full h-auto" />
                            </div>

                            {/* Đại hội đại biểu text */}
                            <div className="w-full">
                                <img src="/ten-dai-hoi.png" alt="Đại hội đại biểu" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Check-in Form and Attendee List */}
                    <div className="w-1/2 flex justify-center items-center">
                        <div className="bg-white bg-opacity-25 rounded-3xl border-4 border-orange-500 p-6 w-full max-w-xl h-auto">
                            {/* Input Section */}
                            <div className="flex items-center rounded-full border-2 border-blue-400 bg-white overflow-hidden mb-6">
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
                                    <span className="transform rotate-90">➤</span>
                                </button>
                            </div>

                            {/* Headers for the list */}
                            <div className="flex w-full border-b-2 border-blue-500 pb-2 mb-2">
                                <div className="text-blue-500 font-bold text-xl w-2/3 pl-2"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    Họ và tên
                                </div>
                                <div className="text-blue-500 font-bold text-xl w-1/3 pl-2"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    MSSV
                                </div>
                            </div>

                            {/* Attendee List with fixed height - better matches the design */}
                            <div className="overflow-y-auto custom-scrollbar" style={{ height: "calc(100vh - 350px)", maxHeight: "420px" }}>
                                {checkinList.map((delegate) => (
                                    <div key={delegate.delegate_id} className="flex w-full py-2 border-b border-gray-200">
                                        <div className="w-2/3 pl-2 text-lg font-medium">
                                            {delegate.name}
                                        </div>
                                        <div className="w-1/3 pl-2 text-lg">
                                            {delegate.delegate_id}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Welcome message when someone checks in */}
            {displayQueue.length > 0 && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-blue-900 bg-opacity-50 z-20">
                    <div className="bg-white bg-opacity-90 p-8 rounded-3xl max-w-md flex flex-col items-center">
                        <p className="text-4xl font-bold text-blue-500 mb-4"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            CHÀO MỪNG
                        </p>

                        <div className="relative mb-6">
                            <div className="w-40 h-40 relative">
                                <img
                                    src={displayQueue[0].image || "/placeholder-avatar.png"}
                                    alt="Checked-in Person"
                                    className="w-40 h-40 rounded-full object-cover animate-fadeIn"
                                />
                                <img
                                    src="./frame.png"
                                    alt="Frame"
                                    className="absolute top-0 left-0 w-full h-full"
                                />
                            </div>
                        </div>

                        <p className="text-lg font-bold text-blue-600 mb-1"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            MSSV: {displayQueue[0].delegate_id}
                        </p>
                        <p className="text-3xl font-extrabold text-orange-500"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {displayQueue[0].name}
                        </p>

                        <button
                            onClick={() => setQueue([])}
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full font-bold"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

            {/* Error message display */}
            {errorMessage && (
                <div className="absolute bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-30">
                    <p>{errorMessage}</p>
                    <button
                        onClick={() => setErrorMessage("")}
                        className="absolute top-1 right-2 text-white"
                    >
                        ✕
                    </button>
                </div>
            )}

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