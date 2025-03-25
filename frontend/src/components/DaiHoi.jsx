import React, { useState, useEffect } from "react";

const DaiHoi = () => {
    const [countdown, setCountdown] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const targetDate = new Date('April 6, 2025 07:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0')
            });

            if (distance < 0) {
                clearInterval(timer);
                setCountdown({ hours: '00', minutes: '00', seconds: '00' });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div id="dai-hoi" className="relative min-h-screen bg-gradient-to-br from-blue-200 to-yellow-100 flex items-center justify-center">
            <div className="absolute inset-0 opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-4">
                <img
                    src="./logo.png"
                    alt="Logo"
                    className="mb-6 w-40 h-40 object-contain"
                />

                <img
                    src="./ten-dai-hoi.png"
                    alt="Đại hội Đại biểu"
                    className="mb-8 max-w-full h-auto"
                />

                <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-lg w-full">
                    <div className="flex justify-center space-x-4">
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                            <div className="text-4xl font-bold text-blue-700">{countdown.hours}</div>
                            <div className="text-sm text-gray-600">Giờ</div>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                            <div className="text-4xl font-bold text-blue-700">{countdown.minutes}</div>
                            <div className="text-sm text-gray-600">Phút</div>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                            <div className="text-4xl font-bold text-blue-700">{countdown.seconds}</div>
                            <div className="text-sm text-gray-600">Giây</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaiHoi;