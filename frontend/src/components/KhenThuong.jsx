import React, { useState, useEffect, useCallback, useRef } from "react";

const slides = [
    {
        id: 1,
        title: "Bach khoa Youth Awards 2024",
        description: "Giải thưởng Tuổi trẻ Bách khoa - Hạng mục Chương trình/hoạt động xuất sắc nhất",
        image: "./source-khen-thuong/GK_hoat_dong_xuat_sac_nhat.jpg",
        alt: "Bach_khoa_Youth_Awards_2024"
    },
    {
        id: 2,
        title: "Chiến dịch Mùa hè xanh 2024",
        description: "Giấy khen của Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh về thành tích xuất sắc trong Chiến dịch tình nguyện Mùa hè xanh lần thứ 31",
        image: "./source-khen-thuong/GK_MHX_2024.jpg",
        alt: "MHX_2024_Giay_Khen"
    },
    {
        id: 3,
        title: "Thành tích Hội Sinh viên 2023-2024",
        description: "Giấy khen của Ban chấp hành Trung ương Hội Sinh viên Việt Nam về thành tích xuất sắc trong công tác Hội và phong trào sinh viên năm học 2023 - 2024",
        image: "./source-khen-thuong/GK_TW_HSV.jpg",
        alt: "HSV_Thanh_Tich_2023_2024"
    }
];

const KhenThuong = () => {
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
            id="khen-thuong"
            className="w-full flex flex-col items-center bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden h-screen"
            style={{
                backgroundImage: "url('/background.png')",
                fontFamily: "Montserrat, sans-serif",
                backgroundAttachment: 'fixed'
            }}
        >
            <h2 className="text-3xl font-bold text-center my-4 text-blue-800" style={{ fontFamily: "Montserrat Black, sans-serif" }}>THÀNH TÍCH</h2>

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

            {/* Thumbnails */}
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

export default KhenThuong;