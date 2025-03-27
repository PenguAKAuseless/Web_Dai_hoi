import { useState, useEffect } from "react";
import CustomPieChart from "./PieChart";

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export default function StatisticsPage() {
    const [attendanceStats, setAttendanceStats] = useState({
        attendedCount: 0,
        notAttendedCount: 104
    });
    const [attendeeList, setAttendeeList] = useState([]);
    const [socket, setSocket] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

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
                        setAttendanceStats({
                            attendedCount: payload.length,
                            notAttendedCount: 104 - payload.length
                        });
                        setAttendeeList(payload);
                        break;
                    case 'CHECKIN_SUCCESS':
                    case 'NEW_CHECKIN':
                        setAttendeeList((prev) => [payload.delegate, ...prev]);
                        setAttendanceStats((prev) => ({
                            attendedCount: prev.attendedCount + 1,
                            notAttendedCount: prev.notAttendedCount - 1
                        }));
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

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: "url('/background.png')" }}>
            {/* Statistics Header */}
            <div className="w-full flex justify-center mt-4 md:mt-6">
                <img src="./status-dai-hoi.png" alt="STATUS-DAI-HOI" className="h-16" />
            </div>

            {/* Main Content Section - Responsive layout */}
            <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:items-start mt-8 px-12 flex-1">

                {/* Left Section - Chart and Legend */}
                <div className="w-full lg:w-1/2 flex flex-col items-center mb-8 lg:mb-0">

                    {/* Chart Container - Responsive dimensions */}
                    <div className="flex justify-center items-center w-full">
                        <div className="h-auto w-full sm:w-4/5 md:w-3/4 lg:w-2/3 aspect-square">
                            <CustomPieChart
                                attendedCount={attendanceStats.attendedCount}
                                notAttendedCount={attendanceStats.notAttendedCount}
                            />
                        </div>
                    </div>

                    {/* Color Legend - Centered and responsive */}
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-4 sm:space-y-0 mt-6 md:mt-8">
                        <div className="flex items-center">
                            <div className="w-8 h-8 md:w-10 md:h-10">
                                <div style={{ backgroundColor: "#ed7d31" }} className="w-full h-full rounded-md"></div>
                            </div>
                            <span className="text-lg md:text-2xl font-bold ml-2" style={{ fontFamily: 'Montserrat Black, sans-serif' }}>
                                CHƯA THAM DỰ
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 md:w-10 md:h-10">
                                <div style={{ backgroundColor: "#4472c4" }} className="w-full h-full rounded-md"></div>
                            </div>
                            <span className="text-lg md:text-2xl font-bold ml-2" style={{ fontFamily: 'Montserrat Black, sans-serif' }}>
                                ĐÃ THAM DỰ
                            </span>
                        </div>
                    </div>

                </div>

                {/* Right Section - Attendee List */}
                <div className="w-full lg:w-1/2 flex justify-center items-start">
                    <div className="bg-white bg-opacity-35 p-4 md:p-6 w-full max-w-xl h-auto"
                        style={{
                            border: "8px solid #ee6709",
                            borderRadius: "67px",
                        }}
                    >

                        {/* Headers for the list */}
                        <div className="flex w-full border-b-2 md:border-b-4 border-blue-500 pb-2 mb-2">
                            <div className="text-blue-500 font-bold text-base md:text-xl w-2/3 text-center pl-2"
                                style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Họ và tên
                            </div>
                            <div className="text-blue-500 font-bold text-base md:text-xl w-1/3 text-center pl-2"
                                style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                MSSV
                            </div>
                        </div>

                        {/* Attendee List with responsive height */}
                        <div className="overflow-y-auto custom-scrollbar" style={{ height: "60vh" }}>
                            {attendeeList.map((delegate) => (
                                <div key={delegate.delegate_id} className="flex w-full py-1 md:py-2 border-b border-gray-200">
                                    <div className="w-3/4 pl-2 text-base md:text-lg font-bold uppercase"
                                        style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                        {delegate.name}
                                    </div>
                                    <div className="w-1/4 pl-2 text-base md:text-lg font-bold">
                                        {delegate.delegate_id}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}