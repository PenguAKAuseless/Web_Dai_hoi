import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
    {
        id: 1,
        title: "Sinh viên 5 tốt",
        description:
            "Khoa KH&KT Máy tính tự hào là đơn vị dẫn đầu ở nhiều cấp độ trong phong trào Sinh viên 5 tốt. Năm 2024, khoa KH&KT Máy tính có 88 gương SV5T cấp Trường, 74 gương SV5T cấp ĐHQG, 75 gương SV5T cấp Thành phố và đặc biệt 20 gương SV5T cấp Trung ương.",
        image: "./source-su-kien/SV5T.jpg",
        alt: "SV5T",
    },
    {
        id: 2,
        title: "CSE Minathon",
        description:
            "Cuộc thi CSE Minathon 2025 khơi dậy tinh thần sáng tạo và hợp tác trong lĩnh vực lập trình, là nơi các tài năng trẻ Bách khoa tỏa sáng",
        image: "./source-su-kien/CSE_Minathon_2024.jpg",
        alt: "CSE_Minathon_2024",
    },
    {
        id: 3,
        title: "Chiến dịch Mùa hè xanh",
        description: "Chiến dịch với hoạt động truyền thống bê tông hóa các tuyến đường huyện Tân Hồng, tỉnh Đồng Tháp",
        image: "./source-su-kien/MHX_2024.JPG",
        alt: "MHX_2024",
    },
    {
        id: 4,
        title: "CSE Summer School",
        description:
            "Trại hè CSE Summer School tạo sân chơi thú vị, giúp các em học sinh khám phá môi trường đại học đầy màu sắc",
        image: "./source-su-kien/CSE_summer_school.jpg",
        alt: "CSE_summer_school",
    },
    {
        id: 5,
        title: "Lễ chào đón Tân sinh viên",
        description: "Buổi lễ chào đón Tân sinh viên khóa 2024 đón nhận các Tân sinh viên khoa KH&KT Máy tính",
        image: "./source-su-kien/Chao_mung_tsv_k24.jpg",
        alt: "Chao_mung_tsv_k24",
    },
    {
        id: 6,
        title: "Đêm hội trăng rằm",
        description:
            "Đêm hội trăng rằm ấm áp với nhiều quà tặng ý nghĩa cho các em thiếu nhi huyện Tân Hồng, tỉnh Đồng Tháp",
        image: "./source-su-kien/Dem_hoi_trang_ram_2024.jpg",
        alt: "Dem_hoi_trang_ram_2024",
    },
    {
        id: 7,
        title: "CSE Connection",
        description:
            "Hội trại chào mừng người bạn mới thu hút hơn 200 trại sinh là tân sinh viên khoa KH&KT Máy tính",
        image: "./source-su-kien/CSE_Connection.jpg",
        alt: "CSE_Connection",
    },
    {
        id: 8,
        title: "CSE Uprace",
        description:
            "Giải chạy bộ truyền thống rèn luyện thể lực và tinh thần thể thao cho sinh viên trường Đại học Bách khoa - ĐHQG-HCM",
        image: "./source-su-kien/CSE_Uprace.jpg",
        alt: "CSE_Uprace",
    },
    {
        id: 9,
        title: "Lễ Tốt nghiệp",
        description: "Lễ tốt nghiệp long trọng với nhiều sinh viên khoa KH&KT Máy tính đạt loại giỏi và xuất sắc",
        image: "./source-su-kien/Le_tot_nghiep_11-2024.jpg",
        alt: "Le_tot_nghiep_11-2024",
    },
    {
        id: 10,
        title: "Chiến dịch Xuân tình nguyện",
        description:
            "Chiến dịch Xuân tình nguyện mang niềm vui và yêu thương đến mái ấm tình thương và trường học vùng sâu trong dịp Tết Nguyên đán",
        image: "./source-su-kien/XTN_2025.jpg",
        alt: "XTN_2025",
    },
    {
        id: 11,
        title: "eCSE Cup",
        description:
            "Sân chơi Thể thao điện tử sôi động eCSE Cup là nơi các sinh viên Bách khoa được thỏa sức thể hiện tài năng và đam mê của mình",
        image: "./source-su-kien/eCSE_CUP_2025.jpg",
        alt: "eCSE_CUP_2025",
    },
    {
        id: 12,
        title: "CSE Olympic",
        description:
            "Giải thể thao Sinh viên với nhiều bộ môn bóng đá, cầu lông, bóng chuyền, cờ vua... thu hút nhiều tuyển thủ tham gia",
        image: "./source-su-kien/CSEO.jpg",
        alt: "CSEO",
    },
    {
        id: 13,
        title: "CSE Job Fair",
        description:
            "Ngày hội việc làm tạo cầu nối giữa sinh viên và các doanh nghiệp trên lĩnh vực Công nghệ thông tin",
        image: "./source-su-kien/JF.jpg",
        alt: "JP",
    },
    {
        id: 14,
        title: "Ngày hội Kỹ thuật",
        description:
            "Ngày hội Kỹ thuật là sân chơi sáng tạo dành cho sinh viên đam mê công nghệ, nơi các dự án và sản phẩm đổi mới được trưng bày và giới thiệu",
        image: "./source-su-kien/Ngay_hoi_kt.jpg",
        alt: "Ngay_hoi_kt",
    },
    {
        id: 15,
        title: "Ngày hội Poster",
        description:
            "Ngày hội Poster mang đến cơ hội cho sinh viên trình bày các đề tài nghiên cứu khoa học qua những poster trực quan sinh động",
        image: "./source-su-kien/Ngay_hoi_poster.jpg",
        alt: "Ngay_hoi_poster",
    },
    {
        id: 16,
        title: "Seminar Money Forward Vietnam",
        description:
            "Buổi seminar từ Money Forward Vietnam mang đến góc nhìn chuyên sâu về môi trường làm việc và cơ hội thực tập cho sinh viên khoa KH&KT Máy tính",
        image: "./source-su-kien/MFV.jpg",
        alt: "MFV",
    },
    {
        id: 17,
        title: "Golden Owl Seminar",
        description:
            "Golden Owl Seminar quy tụ những chuyên gia hàng đầu, chia sẻ kiến thức và kinh nghiệm thực tiễn trong lĩnh vực Công nghệ thông tin, giúp sinh viên định hướng và phát triển sự nghiệp",
        image: "./source-su-kien/Golden_Owl.jpg",
        alt: "Golden_Owl",
    },
    {
        id: 18,
        title: "VNG Company Tour",
        description:
            "Chuyến tham quan doanh nghiệp VNG mở ra cơ hội trải nghiệm thực tế môi trường làm việc sáng tạo, đồng thời kết nối sinh viên với các chuyên gia công nghệ",
        image: "./source-su-kien/VNG_Tour.jpg",
        alt: "VNG_Tour",
    },
    {
        id: 19,
        title: "FPT Japanese Seminar",
        description:
            "FPT Japanese Seminar mang đến những chia sẻ thiết thực về cơ hội học tập và làm việc, giúp sinh viên trang bị kiến thức và kỹ năng cần thiết cho hành trình phát triển sự nghiệp",
        image: "./source-su-kien/FPT_JP.jpg",
        alt: "FPT_JP",
    },
    {
        id: 20,
        title: "FSoft Tour",
        description:
            "FSoft Tour là dịp để sinh viên khám phá môi trường làm việc chuyên nghiệp tại FPT Software, tìm hiểu về các dự án công nghệ thực tế và giao lưu với các chuyên gia trong ngành",
        image: "./source-su-kien/FSoft_Tour.jpg",
        alt: "FSoft_Tour",
    },
    {
        id: 21,
        title: "Cuộc thi lập trình quốc tế TOFAS",
        description:
            "Cuộc thi lập trình quốc tế TOFAS là sân chơi đẳng cấp dành cho các tài năng lập trình trẻ, nơi sinh viên có cơ hội tranh tài, thử thách tư duy thuật toán và giao lưu với các lập trình viên xuất sắc trên thế giới",
        image: "./source-su-kien/TOFAS.jpg",
        alt: "TOFAS",
    },
    {
        id: 22,
        title: "Sky Mavis Uni Tour",
        description:
            "Sky Mavis Uni Tour mang đến cơ hội giao lưu và học hỏi từ các chuyên gia trong ngành công nghệ, giúp sinh viên tiếp cận những xu hướng đổi mới và khám phá cơ hội phát triển sự nghiệp",
        image: "./source-su-kien/Sky_Mavis.jpg",
        alt: "Sky_Mavis",
    },
    {
        id: 23,
        title: "MGM Technology Partners Vietnam",
        description:
            "Buổi giao lưu với MGM Technology Partners Vietnam giúp sinh viên tìm hiểu về môi trường làm việc quốc tế, khám phá các xu hướng công nghệ mới và cơ hội nghề nghiệp tại doanh nghiệp",
        image: "./source-su-kien/mgm.jpg",
        alt: "mgm",
    },
];

const SuKien = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState({})
    const [userInteracted, setUserInteracted] = useState(false)
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80" />

                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 text-white z-20">
                                <h2
                                    className="text-lg md:text-3xl font-bold mb-1 md:mb-2"
                                    style={{ fontFamily: "Montserrat, sans-serif" }}
                                >
                                    {slide.title}
                                </h2>
                                <p
                                    className="text-xs md:text-base line-clamp-2 md:line-clamp-none"
                                    style={{ fontFamily: "Montserrat, sans-serif" }}
                                >
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
                            className="absolute left-1 md:left-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-1 md:p-2 focus:outline-none transition-all duration-300 pointer-events-auto"
                            onClick={goToPrevSlide}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} strokeWidth={2} />
                        </button>

                        <button
                            className="absolute right-1 md:right-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-1 md:p-2 focus:outline-none transition-all duration-300 pointer-events-auto"
                            onClick={goToNextSlide}
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