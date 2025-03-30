import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

const slides = [
    {
        id: 1,
        description:
            "Bằng khen số 23-QĐKT/TWHSV ngày 12/09/2024 của Ban Chấp hành Trung ương Hội Sinh viên Việt Nam về việc đã có thành tích xuất sắc trong công tác Hội và phong trào sinh viên năm học 2023 - 2024",
        title: "Bằng khen của Ban Chấp hành Trung ương Hội Sinh viên Việt Nam",
        image: "./source-khen-thuong/GK_TW_HSV_2024.jpg",
        alt: "HSV_Thanh_Tich_2023_2024",
    },
    {
        id: 2,
        description:
            "Bằng khen số 01 quyết định số 2505/QĐ-UBND ngày 12/11/2019 của Chủ tịch Ủy ban Nhân dân tỉnh Bến Tre về việc đã tích cực vận động, ủng hộ vật chất xây dựng nông thôn mới tại xã Vĩnh Hòa, huyện Chợ Lách, tỉnh Bến Tre",
        title: "Bằng khen của Chủ tịch UBND tỉnh Bến Tre về hỗ trợ xây dựng nông thôn mới",
        image: "./source-khen-thuong/BK_MHX_BT_2019.jpg",
        alt: "BK_MHX_BT_2019",
    },
    {
        id: 3,
        description:
            "Giấy khen số 1684/QĐ.UB ngày 26/7/2019 của Ủy ban Nhân dân huyện Chợ Lách về việc hoàn thành tốt nhiệm vụ Chiến dịch tình nguyện Mùa hè xanh tại huyện Chợ Lách, tỉnh Bến Tre năm 2019",
        title: "Giấy khen của UBND huyện Chợ Lách về Chiến dịch Mùa hè xanh 2019",
        image: "./source-khen-thuong/GK_MHX_CL_2019.jpg",
        alt: "GK_MHX_CL_2019",
    },
    {
        id: 4,
        description:
            "Giấy khen số 1291/KT quyết định số 38 ngày 29/09/2020 của Ủy ban Nhân dân huyện Tháp Mười về việc có thành tích tiêu biểu trong Chiến dịch Mùa hè xanh năm 2020",
        title: "Giấy khen của UBND huyện Tháp Mười về Chiến dịch Mùa hè xanh 2020",
        image: "./source-khen-thuong/GK_MHX_TM_2020.jpg",
        alt: "GK_MHX_TM_2020",
    },
    {
        id: 5,
        description:
            "Giấy khen số 1020/QĐ-UBND.KT ngày 22/07/2022 của Chủ tịch Ủy ban Nhân dân huyện Tam Nông về việc đã có thành tích xuất sắc trong thực hiện chiến dịch Mùa hè xanh huyện Tam Nông năm 2022",
        title: "Giấy khen của Chủ tịch UBND huyện Tam Nông về Chiến dịch Mùa hè xanh 2022",
        image: "./source-khen-thuong/BK_MHX_TN_2022.jpg",
        alt: "BK_MHX_TN_2022",
    },
    {
        id: 6,
        description:
            "Bằng khen số 12/QĐ-TĐKT ngày 20/08/2024 của Ban Chấp hành Hội Sinh viên Thành phố Hồ Chí Minh về việc đã có thành tích xuất sắc trong Chiến dịch tình nguyện Mùa hè xanh lần thứ 31, năm 2024",
        title: "Bằng khen của Hội Sinh viên TP. Hồ Chí Minh về Chiến dịch Mùa hè xanh 2024",
        image: "./source-khen-thuong/BK_MHX_HSVTP_2024.jpg",
        alt: "BK_MHX_HSVTP_2024",
    },
    {
        id: 7,
        description:
            "Giấy khen số 51/QĐ-UBND.TĐKT ngày 23/07/2024 của Chủ tịch Ủy ban Nhân dân huyện Tân Hồng về việc đã có thành tích xuất sắc trong Chiến dịch tình nguyện Mùa hè xanh năm 2024 trên dịa bàn huyện Tân Hồng",
        title: "Giấy khen của Chủ tịch UBND huyện Tân Hồng về Chiến dịch Mùa hè xanh 2024",
        image: "./source-khen-thuong/GK_MHX_TH_2024.jpg",
        alt: "GK_MHX_TH_2024",
    },
    {
        id: 8,
        description:
            "Bằng khen số 06/QĐ-TĐKT ngày 31/05/2024 của Ban Chấp hành Hội Sinh viên Thành phố Hồ Chí Minh về việc đã có thành tích xuất sắc trong Chiến dịch Xuân tình nguyện lần thứ 16 - năm 2024",
        title: "Bằng khen của Hội Sinh viên TP. Hồ Chí Minh về Chiến dịch Xuân tình nguyện 2024",
        image: "./source-khen-thuong/GK_XTN_HSVTP_2024.jpg",
        alt: "GK_XTN_HSVTP_2024",
    },
    {
        id: 9,
        description:
            "Giải thưởng Tuổi trẻ Bách khoa – Bach khoa Youth Awards năm 2020 – hạng mục Chương trình/hoạt động xuất sắc",
        title: "Giải thưởng Tuổi trẻ Bách khoa năm 2020",
        image: "./source-khen-thuong/BKYA_CTXS_2020.jpg",
        alt: "BKYA_CTXS_2020",
    },
    {
        id: 10,
        description:
            "Giải thưởng Tuổi trẻ Bách khoa – Bach khoa Youth Awards năm 2022 – hạng mục Top 5 Chương trình/hoạt động xuất sắc",
        title: "Giải thưởng Tuổi trẻ Bách khoa năm 2022",
        image: "./source-khen-thuong/BKYA_T5CTXS_2022.jpg",
        alt: "BKYA_T5CTXS_2022",
    },
    {
        id: 11,
        description:
            "Giải thưởng Tuổi trẻ Bách khoa – Bach khoa Youth Awards năm 2024 – hạng mục Chương trình/hoạt động xuất sắc nhất",
        title: "Giải thưởng Tuổi trẻ Bách khoa năm 2024",
        image: "./source-khen-thuong/BKYA_CTXS_2024.jpg",
        alt: "BKYA_CTXS_2024",
    },
]

const KhenThuong = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState({})
    const [userInteracted, setUserInteracted] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const slidesRef = useRef([])
    const autoPlayTimeoutRef = useRef(null)
    const userInteractionTimeoutRef = useRef(null)
    const thumbnailsRef = useRef(null)

    // Preload images
    useEffect(() => {
        const preloadImages = () => {
            slides.forEach((slide, index) => {
                const img = new Image()
                img.src = slide.image
                img.onload = () => {
                    setImagesLoaded((prev) => ({
                        ...prev,
                        [index]: true,
                    }))
                }
                img.onerror = () => {
                    console.error(`Failed to load image: ${slide.image}`)
                    setImagesLoaded((prev) => ({
                        ...prev,
                        [index]: true, // Mark as loaded even if error to prevent blocking
                    }))
                }
                slidesRef.current[index] = img
            })
        }

        preloadImages()
    }, [])

    const goToSlide = useCallback((index) => {
        setIsLoading(true)
        setCurrentIndex(index)
        // Short timeout to allow transition to complete
        setTimeout(() => {
            setIsLoading(false)
        }, 500)

        // Mark that user has interacted with the slider
        setUserInteracted(true)

        // Reset the user interaction after 5 seconds
        clearTimeout(userInteractionTimeoutRef.current)
        userInteractionTimeoutRef.current = setTimeout(() => {
            setUserInteracted(false)
        }, 5000)
    }, [])

    const goToNextSlide = useCallback(() => {
        goToSlide((currentIndex + 1) % slides.length)
    }, [currentIndex, goToSlide])

    const goToPrevSlide = useCallback(() => {
        goToSlide((currentIndex - 1 + slides.length) % slides.length)
    }, [currentIndex, goToSlide])

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX)
    }

    // Scroll thumbnails to center the current slide
    useEffect(() => {
        if (thumbnailsRef.current) {
            const container = thumbnailsRef.current
            const thumbnails = container.querySelectorAll("button")

            if (thumbnails[currentIndex]) {
                const thumbnail = thumbnails[currentIndex]
                const containerWidth = container.offsetWidth
                const thumbnailWidth = thumbnail.offsetWidth
                const scrollPosition = thumbnail.offsetLeft - containerWidth / 2 + thumbnailWidth / 2

                container.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                })
            }
        }
    }, [currentIndex])

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX
        const threshold = 50
        const delta = touchStart - endX

        if (delta > threshold) {
            goToNextSlide()
        } else if (delta < -threshold) {
            goToPrevSlide()
        }

        setTouchStart(0)
    }

    // Setup auto-slide every 5 seconds if no user interaction
    useEffect(() => {
        if (!userInteracted && !isLoading) {
            clearTimeout(autoPlayTimeoutRef.current)
            autoPlayTimeoutRef.current = setTimeout(() => {
                goToNextSlide()
            }, 5000)
        }

        return () => {
            clearTimeout(autoPlayTimeoutRef.current)
        }
    }, [userInteracted, isLoading, goToNextSlide, currentIndex])

    // Cleanup timeouts on component unmount
    useEffect(() => {
        return () => {
            clearTimeout(autoPlayTimeoutRef.current)
            clearTimeout(userInteractionTimeoutRef.current)
        }
    }, [])

    // Function to get visible dot indicators (max 3 on mobile)
    const getVisibleDotIndicators = () => {
        const totalSlides = slides.length

        // On larger screens, show all dots
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            return slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 md:h-3 w-2 md:w-3 rounded-full focus:outline-none transition-all duration-300 ${currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))
        }

        // On mobile, show max 3 dots centered around current
        let startIndex = Math.max(0, currentIndex - 1)
        const endIndex = Math.min(totalSlides - 1, startIndex + 2)

        // Adjust if we're at the end
        if (endIndex - startIndex < 2 && startIndex > 0) {
            startIndex = Math.max(0, endIndex - 2)
        }

        const visibleDots = []

        // Add ellipsis at start if needed
        if (startIndex > 0) {
            visibleDots.push(
                <div key="start-ellipsis" className="h-3 w-3 flex items-center justify-center text-gray-400">
                    •••
                </div>,
            )
        }

        // Add visible dots
        for (let i = startIndex; i <= endIndex; i++) {
            visibleDots.push(
                <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-3 w-3 rounded-full focus:outline-none transition-all duration-300 ${currentIndex === i ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    aria-label={`Go to slide ${i + 1}`}
                />,
            )
        }

        // Add ellipsis at end if needed
        if (endIndex < totalSlides - 1) {
            visibleDots.push(
                <div key="end-ellipsis" className="h-3 w-3 flex items-center justify-center text-gray-400">
                    •••
                </div>,
            )
        }

        return visibleDots
    }

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <div
            id="khen-thuong"
            className="w-full flex flex-col items-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden h-screen pt-[10vh]"
            style={{
                backgroundImage: "url('/background.png')",
                fontFamily: "Montserrat, sans-serif",
            }}
        >


            <h2
                className="text-3xl font-bold text-center my-4 text-blue-800"
                style={{ fontFamily: "Montserrat Black, sans-serif" }}
            >
                THÀNH TÍCH
            </h2>

            <div className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden h-[70%] md:h-2/3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Main Slider */}
                <div
                    className="h-full transition-all duration-500 ease-in-out"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`flex inset-0 transition-opacity duration-500 justify-center ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                                } absolute w-full h-full`}
                        >
                            <img
                                src={slide.image || "/placeholder.svg"}
                                alt={slide.alt}
                                className="absolute inset-y-0 h-full w-full md:w-auto object-contain md:object-cover object-center"
                                onError={(e) => {
                                    e.target.src = "/placeholder.png" // Fallback image
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80" />

                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 text-white z-20">
                                <h2 className="text-lg md:text-3xl font-bold mb-1 md:mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                    {slide.title}
                                </h2>
                                <p className="text-xs md:text-base line-clamp-2 md:line-clamp-none" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Controls */}
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 pointer-events-none">
                    <div className="relative w-full h-full flex items-center justify-between">
                        {/* Navigation Arrows */}
                        <button
                            className="absolute left-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 focus:outline-none transition-all duration-300 pointer-events-auto"
                            onClick={goToPrevSlide}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={28} strokeWidth={2} />
                        </button>

                        <button
                            className="absolute right-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 focus:outline-none transition-all duration-300 pointer-events-auto"
                            onClick={goToNextSlide}
                            aria-label="Next slide"
                        >
                            <ChevronRight size={28} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dot indicators - limited to 3 on mobile */}
            <div className="flex justify-center mt-3 space-x-2">{getVisibleDotIndicators()}</div>

            {/* Thumbnails */}
            <div
                ref={thumbnailsRef}
                className="no-scrollbar overflow-x-auto py-2 md:py-4 px-2 md:px-4 gap-1 md:gap-2 max-w-6xl mx-auto mt-1 md:mt-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg flex items-center"
                style={{
                    msOverflowStyle: 'none',   // IE and Edge
                    scrollbarWidth: 'none',    // Firefox
                }}
            >
                {slides.map((slide, index) => {
                    // Calculate distance from current index
                    const distance = Math.abs(currentIndex - index)
                    // Only show 3 thumbnails on mobile (current + 1 on each side)
                    const isVisible = window.innerWidth >= 768 || distance <= 1

                    return (
                        <button
                            key={index}
                            className={`flex-shrink-0 w-16 md:w-24 h-12 md:h-16 overflow-hidden rounded focus:outline-none transition-all duration-300 mx-1 ${isVisible ? "" : "hidden md:block"
                                } ${currentIndex === index
                                    ? "ring-2 ring-blue-500 scale-110 shadow-lg opacity-100"
                                    : distance <= 1
                                        ? "opacity-50 hover:opacity-80"
                                        : "opacity-70 hover:opacity-100 hover:scale-105"
                                }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to ${slide.title}`}
                            style={{
                                transform: currentIndex === index ? "scale(1.1)" : "scale(1)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <img
                                src={slide.image || "/placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "/placeholder.png"
                                }}
                            />
                        </button>
                    )
                })}
            </div>

            {/* Custom CSS for no scrollbar */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                @media (max-width: 768px) {
                    .no-scrollbar {
                        -webkit-overflow-scrolling: touch;
                        scroll-snap-type: x mandatory;
                        scroll-behavior: smooth;
                    }
                    
                    .no-scrollbar > button {
                        scroll-snap-align: center;
                    }
                }
            `}</style>
        </div>
    )
}

export default KhenThuong