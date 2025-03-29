import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
    {
        id: 1,
        title: "Sinh viên 5 tốt",
        description:
            "Khoa KH&KT Máy tính tự hào là đơn vị dẫn đầu ở nhiều cấp độ trong phong trào Sinh viên 5 tốt. Năm 2023, khoa KH&KT Máy tính có 88 gương SV5T cấp Trường, 74 gương SV5T cấp ĐHQG, 75 gương SV5T cấp Thành phố và đặc biệt 20 gương SV5T cấp Trung ương.",
        image: "./source-su-kien/SV5T.jpg",
        alt: "SV5T",
    },
    {
        id: 2,
        title: "CSE Minathon 2024",
        description:
            "Cuộc thi CSE Minathon 2025 khơi dậy tinh thần sáng tạo và hợp tác trong lĩnh vực lập trình, là nơi các tài năng trẻ Bách khoa tỏa sáng",
        image: "./source-su-kien/CSE_Minathon_2024.jpg",
        alt: "CSE_Minathon_2024",
    },
    {
        id: 3,
        title: "Mùa hè xanh 2024",
        description: "Chiến dịch với hoạt động truyền thống bê tông hóa các tuyến đường huyện Tân Hồng, tỉnh Đồng Tháp",
        image: "./source-su-kien/MHX_2024.JPG",
        alt: "MHX_2024",
    },
    {
        id: 4,
        title: "CSE Summer School 2024",
        description:
            "Trại hè CSE Summer School tạo sân chơi thú vị, giúp các em học sinh khám phá môi trường đại học đầy màu sắc",
        image: "./source-su-kien/CSE_summer_school.jpg",
        alt: "CSE_summer_school",
    },
    {
        id: 5,
        title: "Lễ chào đón TSV khóa 2024",
        description: "Buổi lễ chào đón Tân sinh viên khóa 2024 đón nhận các Tân sinh viên khoa KH&KT Máy tính",
        image: "./source-su-kien/Chao_mung_tsv_k24.jpg",
        alt: "Chao_mung_tsv_k24",
    },
    {
        id: 6,
        title: "Đêm hội trăng rằm 2024",
        description:
            "Đêm hội trăng rằm ấm áp với nhiều quà tặng ý nghĩa cho các em thiếu nhi huyện Tân Hồng, tỉnh Đồng Tháp",
        image: "./source-su-kien/Dem_hoi_trang_ram_2024.jpg",
        alt: "Dem_hoi_trang_ram_2024",
    },
    {
        id: 7,
        title: "CSE Connection 2024",
        description:
            "Hội trại chào mừng người bạn mới thu hút hơn 200 trại sinh là tân sinh viên khoa KH&KT Máy tính khóa 2024",
        image: "./source-su-kien/CSE_Connection_2024.jpg",
        alt: "CSE_Connection_2024",
    },
    {
        id: 8,
        title: "BK Uprace 2024",
        description:
            "Giải chạy bộ truyền thống rèn luyện thể lực và tinh thần thể thao cho sinh viên trường Đại học Bách khoa - ĐHQG-HCM",
        image: "./source-su-kien/Uprace_2024.jpg",
        alt: "Uprace_2024",
    },
    {
        id: 9,
        title: "Lễ Tốt nghiệp Tháng 11/2024",
        description: "Lễ tốt nghiệp long trọng với nhiều sinh viên khoa KH&KT Máy tính đạt loại giỏi và xuất sắc",
        image: "./source-su-kien/Le_tot_nghiep_11-2024.jpg",
        alt: "Le_tot_nghiep_11-2024",
    },
    {
        id: 10,
        title: "Xuân tình nguyện 2025",
        description:
            "Chiến dịch Xuân tình nguyện mang niềm vui và yêu thương đến mái ấm tình thương và trường học vùng sâu trong dịp Tết Nguyên đán",
        image: "./source-su-kien/XTN_2025.jpg",
        alt: "XTN_2025",
    },
    {
        id: 11,
        title: "eCSE CUP 2025",
        description:
            "Sân chơi Thể thao điện tử sôi động eCSE CUP là nơi các sinh viên Bách khoa được thỏa sức thể hiện tài năng và đam mê của mình",
        image: "./source-su-kien/eCSE_CUP_2025.jpg",
        alt: "eCSE_CUP_2025",
    },
]

const SuKien = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState({})
    const [userInteracted, setUserInteracted] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
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

    const handleTouchTap = () => {
        setShowOverlay((prev) => !prev)
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

    // Function to determine thumbnail opacity based on index
    const getThumbnailOpacity = (index) => {
        // On mobile, show only 3 thumbnails with middle one at 100% opacity
        if (window.innerWidth < 768) {
            if (index === currentIndex) return "opacity-100"
            if (index === currentIndex - 1 || index === currentIndex + 1) return "opacity-50"
            return "opacity-0 hidden md:block" // Hide other thumbnails on mobile
        }

        // On desktop, use the original opacity logic
        return currentIndex === index ? "opacity-100" : "opacity-70 hover:opacity-100"
    }

    return (
        <div
            id="su-kien"
            className="w-full flex flex-col items-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden h-screen pt-[10vh]"
            style={{
                backgroundImage: "url('/background.png')",
                fontFamily: "Montserrat, sans-serif",
            }}
        >
            <h2
                className="text-2xl md:text-3xl font-bold text-center my-2 md:my-4 text-blue-800"
                style={{ fontFamily: "Montserrat Black, sans-serif" }}
            >
                SỰ KIỆN
            </h2>

            <div className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden h-[70%] md:h-2/3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Main Slider */}
                <div
                    className="h-full transition-all duration-500 ease-in-out"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={handleTouchTap}
                    onMouseEnter={() => setShowOverlay(true)}
                    onMouseLeave={() => setShowOverlay(false)}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-500 ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <img
                                src={slide.image || "/placeholder.svg"}
                                alt={slide.alt}
                                className="absolute inset-0 w-full h-full object-contain object-center"
                                onError={(e) => {
                                    e.target.src = "/placeholder.png" // Fallback image
                                }}
                            />

                            {/* Gradient overlay with fade-in animation */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-300 ease-in-out ${showOverlay ? "opacity-80" : "opacity-0"
                                    }`}
                            />

                            {/* Text content with fade-in animation */}
                            <div
                                className={`absolute bottom-0 left-0 right-0 p-3 md:p-8 text-white z-20 transition-all duration-300 ease-in-out transform ${showOverlay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                    }`}
                            >
                                <h2
                                    className="text-lg md:text-3xl font-bold mb-1 md:mb-2"
                                    style={{ fontFamily: "Montserrat, sans-serif" }}
                                >
                                    {slide.title}
                                </h2>
                                <p
                                    className="text-xs md:text-base md:max-w-2xl line-clamp-2 md:line-clamp-none"
                                    style={{ fontFamily: "Montserrat, sans-serif" }}
                                >
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Controls - with fade-in animation */}
                <div
                    className={`absolute top-0 left-0 right-0 bottom-0 z-20 pointer-events-none transition-opacity duration-300 ease-in-out ${showOverlay ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="relative w-full h-full flex items-center justify-between">
                        {/* Navigation Arrows */}
                        <button
                            className="absolute left-1 md:left-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-1 md:p-2 focus:outline-none transition-all duration-300 pointer-events-auto"
                            onClick={(e) => {
                                e.stopPropagation()
                                goToPrevSlide()
                            }}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} strokeWidth={2} />
                        </button>

                        <button
                            className="absolute right-1 md:right-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-1 md:p-2 focus:outline-none transition-all duration-300 pointer-events-auto"
                            onClick={(e) => {
                                e.stopPropagation()
                                goToNextSlide()
                            }}
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dot indicators - Show only 5 on mobile */}
            <div className="flex justify-center mt-2 md:mt-3 space-x-1 md:space-x-2">
                {slides.map((_, index) => {
                    // On mobile, only show dots for current and 2 on each side
                    const shouldShow = window.innerWidth >= 768 || (index >= currentIndex - 2 && index <= currentIndex + 2)

                    return shouldShow ? (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 md:h-3 w-2 md:w-3 rounded-full focus:outline-none transition-all duration-300 ${currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ) : null
                })}
            </div>

            {/* Thumbnails - Mobile optimized */}
            <div
                ref={thumbnailsRef}
                className="no-scrollbar overflow-x-auto py-2 md:py-4 px-2 md:px-4 gap-1 md:gap-2 max-w-6xl mx-auto mt-1 md:mt-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg flex items-center"
                style={{
                    msOverflowStyle: "none", // IE and Edge
                    scrollbarWidth: "none", // Firefox
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
        </div>
    )
}

export default SuKien

