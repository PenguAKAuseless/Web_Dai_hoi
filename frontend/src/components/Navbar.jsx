import React from "react";

const Navbar = () => {
    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center h-[10vh] min-h-[60px] max-h-[100px] p-4 bg-[#0065b3] text-white z-[1000] font-['Montserrat'] font-bold">
            <div className="flex justify-center items-center absolute left-4 top-2 bottom-2 w-[5%] min-w-[50px] max-w-[100px]">
                <img
                    src="/logo-white-stroke.png"
                    alt="Logo Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028"
                    className="h-full w-auto object-cover"
                />
            </div>
            <ul className="flex gap-5 justify-center flex-grow flex-shrink max-w-none list-none">
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("dai-hoi")}
                >
                    Đại hội
                </li>
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("su-kien")}
                >
                    Hoạt động tiêu biểu
                </li>
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("khen-thuong")}
                >
                    Thành tích
                </li>
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("sv5t")}
                >
                    Sinh viên 5 tốt
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;