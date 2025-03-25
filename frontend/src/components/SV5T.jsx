import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SV5TChart from './SV5TChart';

// Generate members list from filenames
const sv5tMembers = [
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
        thanhTich: "Sinh viên 5 tốt cấp Trung ương năm học 2023 - 2024"
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
    const name = nameWithExt.replace('.jpg', '');

    return {
        mssv,
        name,
        thanhTich: member.thanhTich,
        imagePath: `./SV5T/${member.filename}`
    };
});

export default function SV5TShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sv5tMembers.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % sv5tMembers.length
        );
    };

    return (
        <div
            id="sv5t"
            className="flex h-screen"
            style={{
                backgroundImage: 'url(./background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Left Side - Slideshow */}
            <div className="w-1/2 flex flex-col items-center justify-center relative p-8">
                <div className="relative w-full max-w-[400px] aspect-square">
                    {/* Circular Image Container */}
                    <div className="relative w-full h-full">
                        {/* Circular Frame */}
                        <div
                            className="absolute inset-0 z-10 rounded-full border-[12px] border-[#5c7fd1] pointer-events-none"
                            style={{
                                boxShadow: '0 0 0 4px rgba(0,0,0,0.1) inset'
                            }}
                        />

                        {/* Circular Image Mask */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <img
                                src={sv5tMembers[currentIndex].imagePath}
                                alt={sv5tMembers[currentIndex].name}
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: 'center top' // Crop from the top
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Member Info */}
                <div className="mt-4 text-center">
                    <h2 className="text-2xl font-bold">{sv5tMembers[currentIndex].name}</h2>
                    <p className="text-xl text-gray-600">MSSV: {sv5tMembers[currentIndex].mssv}</p>
                    <p className="text-3xl text-gray-500 mt-1"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {sv5tMembers[currentIndex].thanhTich}</p>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={handlePrevious}
                        className="bg-white/50 p-2 rounded-full hover:bg-white/75"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={handleNext}
                        className="bg-white/50 p-2 rounded-full hover:bg-white/75"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Right Side - Chart */}
            <SV5TChart />
        </div>
    );
}