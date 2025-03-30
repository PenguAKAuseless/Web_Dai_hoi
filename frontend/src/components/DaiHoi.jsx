import { useState, useEffect } from "react"

const DaiHoi = () => {
    const [countdown, setCountdown] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    })
    const [removeButton, setRemoveButton] = useState(false)
    const [isDaiHoi, setIsDaiHoi] = useState(false)

    useEffect(() => {
        const daiHoiDate = new Date("April 6, 2025 08:00:00").getTime()
        const buttonRemovalDate = new Date("April 2, 2025 23:59:59").getTime()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = daiHoiDate - now

            // Check if current time has passed the button removal date
            if (now >= buttonRemovalDate && now <= daiHoiDate) {
                setRemoveButton(true);
            }
            else {
                setRemoveButton(false);
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
                setIsDaiHoi(true)
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
                <img src="./logo.png" alt="Logo" className="mt-4 w-40 h-40 object-contain" loading="lazy" />

                <img src="./ten-dai-hoi.png" alt="Đại hội Đại biểu" className="mb-4 max-w-full h-auto" loading="lazy" />

                <div className="bg-white bg-opacity-80 rounded-lg p-4 sm:p-6 shadow-2xl shadow-cyan-500/50 w-full">
                    {!isDaiHoi ? (
                        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                            {/* Compact boxes for all screen sizes */}
                            <div className="flex flex-col justify-center items-center p-2 sm:p-3 bg-white rounded-lg shadow-md aspect-square sm:aspect-auto sm:h-20 md:h-24">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.days}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Ngày</div>
                            </div>
                            <div className="flex flex-col justify-center items-center p-2 sm:p-3 bg-white rounded-lg shadow-md aspect-square sm:aspect-auto sm:h-20 md:h-24">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.hours}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Giờ</div>
                            </div>
                            <div className="flex flex-col justify-center items-center p-2 sm:p-3 bg-white rounded-lg shadow-md aspect-square sm:aspect-auto sm:h-20 md:h-24">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.minutes}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Phút</div>
                            </div>
                            <div className="flex flex-col justify-center items-center p-2 sm:p-3 bg-white rounded-lg shadow-md aspect-square sm:aspect-auto sm:h-20 md:h-24">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">{countdown.seconds}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Giây</div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto">
                            <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 text-center">PHIÊN ĐẠI HỘI</h2>
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="font-semibold text-blue-700 sm:w-32">Thời gian:</span>
                                    <span className="text-gray-800">Từ 08g00, ngày 06/04/2025</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="font-semibold text-blue-700 sm:w-32">Địa điểm:</span>
                                    <span className="text-gray-800">Hội trường BK.B6, cơ sở Dĩ An</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Responsive buttons with equal height */}
                    <div className="mt-4 grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                        {removeButton ? (
                            <a
                                href="https://drive.google.com/drive/u/0/folders/1yhrX1rwDqldjZfWF_UPYXszHP4e8lHig"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-center sm:col-span-2"
                            >
                                DỰ THẢO VĂN KIỆN
                            </a>
                        ) : (
                            <>
                                <a
                                    href="https://drive.google.com/drive/u/0/folders/1yhrX1rwDqldjZfWF_UPYXszHP4e8lHig"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-center h-12 flex items-center justify-center"
                                >
                                    DỰ THẢO VĂN KIỆN
                                </a>
                                {!removeButton && (
                                    <a
                                        href="https://forms.gle/ZSMBkLQd12Mk982B6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-center h-12 flex items-center justify-center"
                                    >
                                        GÓP Ý VĂN KIỆN
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaiHoi