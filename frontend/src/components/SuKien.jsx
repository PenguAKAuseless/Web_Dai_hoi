import React, { useState, useEffect, useCallback, useRef } from "react";

const slides = [
    {
        id: 1,
        title: "Sinh viên 5 tốt",
        description: "Khoa KH&KT Máy tính tự hào là đơn vị dẫn đầu ở nhiều cấp độ trong phong trào Sinh viên 5 tốt. Năm 2023, khoa KH&KT Máy tính có 88 gương SV5T cấp Trường, 74 gương SV5T cấp ĐHQG, 75 gương SV5T cấp Thành phố và đặc biệt 20 gương SV5T cấp Trung ương.",
        image: "./source-su-kien/SV5T.jpg",
        alt: "SV5T"
    },
    {
        id: 2,
        title: "CSE Minathon 2024",
        description: "Cuộc thi CSE Minathon 2025 khơi dậy tinh thần sáng tạo và hợp tác trong lĩnh vực lập trình, là nơi các tài năng trẻ Bách khoa tỏa sáng",
        image: "./source-su-kien/CSE_Minathon_2024.jpg",
        alt: "CSE_Minathon_2024"
    },
    {
        id: 3,
        title: "Mùa hè xanh 2024",
        description: "Chiến dịch với hoạt động truyền thống bê tông hóa các tuyến đường huyện Tân Hồng, tỉnh Đồng Tháp",
        image: "./source-su-kien/MHX_2024.JPG",
        alt: "MHX_2024"
    },
    {
        id: 4,
        title: "CSE Summer School 2024",
        description: "Trại hè CSE Summer School tạo sân chơi thú vị, giúp các em học sinh khám phá môi trường đại học đầy màu sắc",
        image: "./source-su-kien/CSE_summer_school.jpg",
        alt: "CSE_summer_school"
    },
    {
        id: 5,
        title: "Lễ chào đón TSV khóa 2024",
        description: "Buổi lễ chào đón Tân sinh viên khóa 2024 đón nhận các Tân sinh viên khoa KH&KT Máy tính",
        image: "./source-su-kien/Chao_mung_tsv_k24.jpg",
        alt: "Chao_mung_tsv_k24"
    },
    {
        id: 6,
        title: "Đêm hội trăng rằm 2024",
        description: "Đêm hội trăng rằm ấm áp với nhiều quà tặng ý nghĩa cho các em thiếu nhi huyện Tân Hồng, tỉnh Đồng Tháp",
        image: "./source-su-kien/Dem_hoi_trang_ram_2024.jpg",
        alt: "Dem_hoi_trang_ram_2024"
    },
    {
        id: 7,
        title: "CSE Connection 2024",
        description: "Hội trại chào mừng người bạn mới thu hút hơn 200 trại sinh là tân sinh viên khoa KH&KT Máy tính khóa 2024",
        image: "./source-su-kien/CSE_Connection_2024.jpg",
        alt: "CSE_Connection_2024"
    },
    {
        id: 8,
        title: "BK Uprace 2024",
        description: "Giải chạy bộ truyền thống rèn luyện thể lực và tinh thần thể thao cho sinh viên trường Đại học Bách khoa - ĐHQG-HCM",
        image: "./source-su-kien/Uprace_2024.jpg",
        alt: "Uprace_2024"
    },
    {
        id: 9,
        title: "Lễ Tốt nghiệp Tháng 11/2024",
        description: "Lễ tốt nghiệp long trọng với nhiều sinh viên khoa KH&KT Máy tính đạt loại giỏi và xuất sắc",
        image: "./source-su-kien/Le_tot_nghiep_11-2024.jpg",
        alt: "Le_tot_nghiep_11-2024"
    },
    {
        id: 10,
        title: "Xuân tình nguyện 2025",
        description: "Chiến dịch Xuân tình nguyện mang niềm vui và yêu thương đến mái ấm tình thương và trường học vùng sâu trong dịp Tết Nguyên đán",
        image: "./source-su-kien/XTN_2025.jpg",
        alt: "XTN_2025"
    },
    {
        id: 11,
        title: "eCSE CUP 2025",
        description: "Sân chơi Thể thao điện tử sôi động eCSE CUP là nơi các sinh viên Bách khoa được thỏa sức thể hiện tài năng và đam mê của mình",
        image: "./source-su-kien/eCSE_CUP_2025.jpg",
        alt: "eCSE_CUP_2025"
    }
];

const SuKien = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState({});
    const [userInteracted, setUserInteracted] = useState(false);
    const slidesRef = useRef([]);
    const autoPlayTimeoutRef = useRef(null);
    const userInteractionTimeoutRef = useRef(null);

    // Preload images
    useEffect(() => {
        const preloadImages = () => {
            slides.forEach((slide, index) => {
                const img = new Image();
                img.src = slide.image;
                img.onload = () => {
                    setImagesLoaded(prev => ({
                        ...prev,
                        [index]: true
                    }));
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${slide.image}`);
                    setImagesLoaded(prev => ({
                        ...prev,
                        [index]: true // Mark as loaded even if error to prevent blocking
                    }));
                };
                slidesRef.current[index] = img;
            });
        };

        preloadImages();
    }, []);

    const goToSlide = useCallback((index) => {
        setIsLoading(true);
        setCurrentIndex(index);
        // Short timeout to allow transition to complete
        setTimeout(() => {
            setIsLoading(false);
        }, 500);

        // Mark that user has interacted with the slider
        setUserInteracted(true);

        // Reset the user interaction after 5 seconds
        clearTimeout(userInteractionTimeoutRef.current);
        userInteractionTimeoutRef.current = setTimeout(() => {
            setUserInteracted(false);
        }, 5000);
    }, []);

    const goToNextSlide = useCallback(() => {
        goToSlide((currentIndex + 1) % slides.length);
    }, [currentIndex, goToSlide]);

    const goToPrevSlide = useCallback(() => {
        goToSlide((currentIndex - 1 + slides.length) % slides.length);
    }, [currentIndex, goToSlide]);

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        const threshold = 50; // More responsive threshold
        if (touchStart - touchEnd > threshold) {
            goToNextSlide();
        }
        if (touchStart - touchEnd < -threshold) {
            goToPrevSlide();
        }
        // Reset touch values
        setTouchStart(0);
        setTouchEnd(0);
    };

    // Setup auto-slide every 5 seconds if no user interaction
    useEffect(() => {
        if (!userInteracted && !isLoading) {
            clearTimeout(autoPlayTimeoutRef.current);
            autoPlayTimeoutRef.current = setTimeout(() => {
                goToNextSlide();
            }, 5000);
        }

        return () => {
            clearTimeout(autoPlayTimeoutRef.current);
        };
    }, [userInteracted, isLoading, goToNextSlide, currentIndex]);

    // Cleanup timeouts on component unmount
    useEffect(() => {
        return () => {
            clearTimeout(autoPlayTimeoutRef.current);
            clearTimeout(userInteractionTimeoutRef.current);
        };
    }, []);

    return (
        <div
            id="su-kien"
            className="w-full flex flex-col items-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden h-screen pt-[10vh]"
            style={{
                backgroundImage: "url('/background.png')",
                fontFamily: "Montserrat, sans-serif"
            }}
        >
            <h2 className="text-3xl font-bold text-center my-4 text-blue-800" style={{ fontFamily: "Montserrat Black, sans-serif" }}>SỰ KIỆN</h2>

            <div className="relative w-full max-w-6xl h-2/3 mx-auto shadow-xl rounded-lg overflow-hidden">
                {/* Main Slider */}
                <div
                    className="h-full transition-all duration-500 ease-in-out"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-500 ${currentIndex === index
                                    ? "opacity-100 z-10"
                                    : "opacity-0 z-0"
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                className="absolute inset-0 w-full h-full object-cover object-center"
                                onError={(e) => {
                                    e.target.src = '/placeholder.png'; // Fallback image
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80" />

                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white z-20">
                                <h2 className="text-xl md:text-3xl font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                    {slide.title}
                                </h2>
                                <p className="text-sm md:text-base md:max-w-2xl" style={{ fontFamily: "Montserrat, sans-serif" }}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            className="absolute right-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 focus:outline-none transition-all duration-300 pointer-events-auto"
                            onClick={goToNextSlide}
                            aria-label="Next slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center mt-3 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full focus:outline-none transition-all duration-300 ${currentIndex === index
                                ? "bg-blue-600 scale-125"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Thumbnails - Now with the original style but better visibility */}
            <div className="hidden md:flex overflow-x-auto py-4 px-4 gap-2 max-w-6xl mx-auto mt-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg no-scrollbar">
                {slides.map((slide, index) => (
                    <button
                        key={index}
                        className={`flex-shrink-0 w-24 h-16 overflow-hidden rounded focus:outline-none transition-all duration-300 ${currentIndex === index
                                ? "ring-2 ring-blue-500 scale-110 shadow-lg"
                                : "opacity-70 hover:opacity-100 hover:scale-105"
                            }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to ${slide.title}`}
                    >
                        <img
                            src={slide.image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = '/placeholder.png';
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* Add CSS to hide scrollbars */}
            <style jsx>{`
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;  /* Chrome, Safari and Opera */
                }
            `}</style>
        </div>
    );
};

export default SuKien;