import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SV5TChart from './SV5TChart';

// Generate members list from filenames
const sv5tMembers = [
    {
        filename: '1910232_Vũ Khánh Hưng.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1910351_Đặng Nguyễn Xuân Nam.JPG',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1912237_Trần Hoàng Công Toại.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1912750_Trần Ngọc Cát.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1913102_Lê Bình Đẳng.JPG',
        thanhTich: 'Danh hiệu "Sao tháng giêng" 2023, Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023'
    },
    {
        filename: '1913621_Bùi Đắc Hưng.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1913832_Lê Đức Khoan.png',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1914213_Diệp Trần Nam.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1914691_Nguyễn Đức Phúc.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '1914914_Lê Thanh Sang.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023"
    },
    {
        filename: '2010091_Bùi Khánh Vĩnh.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2010339_Nguyễn Đặng Anh Khoa.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2010416_Nguyễn Đoàn Nhật Minh.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2010445_Lê Minh Nghĩa.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2010576_Kha Sang.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2011436_Vũ Đăng Khoa.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2011572_Lê Tấn Lộc.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2014482_Trần Trung Thái.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2014775_Nguyễn Phú Vĩnh Toàn.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2110416_Đặng Dương Minh Nhật.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2110610_Nguyễn Xuân Triều.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2110621_Trang Sĩ Trọng.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2022 - 2023, 2023 - 2024"
    },
    {
        filename: '2111025_Phan Trần Minh Đạt.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2111128_Phạm Đức Hào.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2113080_Trương Đức Dũng.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2211081_Lê Phúc Hoàng.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2211894_Phạm Ngọc Long.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2212779_Đỗ Hoàng Quân.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2213338_Lê Trường Thống.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    },
    {
        filename: '2213915_Bùi Trọng Văn.jpg',
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
    }
].map(member => {
    // Split filename into MSSV and Name
    const [mssv, nameWithExt] = member.filename.split('_');
    const name = nameWithExt.split('.')[0];

    return {
        mssv,
        name,
        thanhTich: member.thanhTich,
        imagePath: `./SV5T/${member.filename}`
    };
});

export default function SV5TShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const autoPlayTimeoutRef = useRef(null);
    const userInteractionTimeoutRef = useRef(null);

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
        goToSlide((currentIndex + 1) % sv5tMembers.length);
    }, [currentIndex, goToSlide]);

    const goToPrevSlide = useCallback(() => {
        goToSlide((currentIndex - 1 + sv5tMembers.length) % sv5tMembers.length);
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
            id="sv5t"
            className="flex h-screen pt-[10vh]"
            style={{
                backgroundImage: 'url(./background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Left Side - Slideshow */}
            <div className="w-1/2 flex flex-col items-center justify-center relative p-8">
                <div
                    className="w-full max-w-[500px] bg-white/70 rounded-2xl shadow-lg p-6 flex flex-col items-center relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <h1 className="text-2xl font-bold text-center w-full text-[#5c7fd1] mb-4">
                        DANH SÁCH SV5T CẤP TRUNG ƯƠNG
                        <br />
                        NHIỆM KỲ 2023 - 2025
                    </h1>

                    <div className="relative w-full max-w-[250px] max-h-[250px] aspect-square mb-4">
                        <div className="relative w-full h-full">
                            {/* Image Container with Improved Transition */}
                            {sv5tMembers.map((member, index) => (
                                <div
                                    key={member.mssv}
                                    className={`absolute inset-0 rounded-full overflow-hidden transition-all duration-500 ease-in-out ${currentIndex === index
                                        ? "opacity-100 z-20 scale-100"
                                        : "opacity-0 z-10 scale-95"
                                        }`}
                                >
                                    <img
                                        src={member.imagePath}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        style={{
                                            objectPosition: 'center top'
                                        }}
                                    />
                                </div>
                            ))}

                            {/* Navigation Buttons */}
                            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between">
                                <button
                                    onClick={goToPrevSlide}
                                    className="ml-[-50px] bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300"
                                >
                                    <ChevronLeft size={24} color="white" />
                                </button>
                                <button
                                    onClick={goToNextSlide}
                                    className="mr-[-50px] bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300"
                                >
                                    <ChevronRight size={24} color="white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Member Info with Explicit Height Management */}
                    <div className="text-center h-[150px] flex flex-col justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold" style={{ color: '#4472c4' }}>MSSV: {sv5tMembers[currentIndex].mssv}</h2>
                            <p className="text-4xl font-bold mb-2" style={{ color: '#ed7d31' }}>{sv5tMembers[currentIndex].name}</p>
                        </div>
                        <p
                            className="text-xl"
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#5b9bd5',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {sv5tMembers[currentIndex].thanhTich}
                        </p>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex flex-wrap justify-center items-center w-full max-w-[300px] mx-auto gap-2">
                        {sv5tMembers.map((_, index) => (
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
                </div>
            </div>

            {/* Right Side - Chart */}
            <div className="w-1/2 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-[600px] flex flex-col">
                    <div className="w-full h-[400px] pt-8 pb-8">
                        <SV5TChart />
                    </div>

                    <h1 className="text-2xl font-bold text-[#5c7fd1] mb-4 text-center w-full">
                        THỐNG KÊ SV5T CÁC CẤP KHOA KH&KTMT
                        <br />
                        NHIỆM KỲ 2023 - 2025
                    </h1>
                </div>
            </div>
        </div>
    );
}