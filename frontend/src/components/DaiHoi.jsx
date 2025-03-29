import { useState, useEffect } from "react"

const DaiHoi = () => {
    const [countdown, setCountdown] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    })
    const [changeButton, setChangeButton] = useState(false)
    const [isTimerComplete, setIsTimerComplete] = useState(false)

    useEffect(() => {
        const targetDate = new Date("April 6, 2025 07:00:00").getTime()
        const buttonRemovalDate = new Date("April 1, 2025 07:00:00").getTime()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate - now

            // Check if current time has passed the button removal date
            if (now >= buttonRemovalDate) {
                setChangeButton(true)
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            setCountdown({
                days: days.toString().padStart(2, "0"),
                hours: hours.toString().padStart(2, "0"),
                minutes: minutes.toString().padStart(2, "0"),
                seconds: seconds.toString().padStart(2, "0"),
            })

            if (distance < 0) {
                clearInterval(timer)
                setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" })
                setIsTimerComplete(true)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div
            id="dai-hoi"
            className="relative min-h-screen bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{
                backgroundImage: "url('/background.png')",
                fontFamily: "Montserrat Black, sans-serif",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="absolute inset-0 opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-4">
                <img src="./logo.png" alt="Logo" className="mb w-40 h-40 object-contain" />

                <img src="./ten-dai-hoi.png" alt="Đại hội Đại biểu" className="mb-4 max-w-full h-auto" />

                <div className="bg-white bg-opacity-80 rounded-lg p-4 sm:p-6 shadow-2xl shadow-cyan-500/50 w-full">
                    {!isTimerComplete ? (
                        <div className="flex justify-center space-x-2 sm:space-x-4">
                            <div className="flex flex-col items-center p-2 sm:p-4 bg-white rounded-lg shadow-md">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.days}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Ngày</div>
                            </div>
                            <div className="flex flex-col items-center p-2 sm:p-4 bg-white rounded-lg shadow-md">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.hours}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Giờ</div>
                            </div>
                            <div className="flex flex-col items-center p-2 sm:p-4 bg-white rounded-lg shadow-md">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.minutes}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Phút</div>
                            </div>
                            <div className="flex flex-col items-center p-2 sm:p-4 bg-white rounded-lg shadow-md">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.seconds}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Giây</div>
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 text-center">PHIÊN ĐẠI HỘI</h2>
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="font-semibold text-blue-700 sm:w-32">Thời gian:</span>
                                    <span className="text-gray-800">8g00 - 10g00, ngày 06/04/2025</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="font-semibold text-blue-700 sm:w-32">Địa điểm:</span>
                                    <span className="text-gray-800">Hội trường BK.B6, cơ sở Dĩ An</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons with conditional rendering for the GÓP Ý VĂN KIỆN button */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {changeButton ? (
                            <a
                                href="https://drive.google.com/drive/u/0/folders/1yhrX1rwDqldjZfWF_UPYXszHP4e8lHig"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-center sm:min-w-32"
                            > 
                                VĂN KIỆN ĐẠI HỘI
                            </a>
                        ) : (
                            <a
                                href="https://drive.google.com/drive/u/0/folders/1yhrX1rwDqldjZfWF_UPYXszHP4e8lHig"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-center sm:min-w-32"
                            >
                                DỰ THẢO VĂN KIỆN
                            </a>
                        )}
                        {!changeButton && (
                            <a
                                href="https://forms.gle/ZSMBkLQd12Mk982B6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-center sm:min-w-32"
                            >
                                GÓP Ý VĂN KIỆN
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaiHoi