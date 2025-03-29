import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkIfMobile()

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile)

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" })
        // Close mobile menu after clicking
        if (isMobile) {
            setIsMenuOpen(false)
        }
    }

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center h-[10vh] min-h-[60px] max-h-[100px] p-4 bg-[#0065b3] text-white z-[1000] font-['Montserrat'] font-bold">
            <div className="flex justify-center items-center left-4 w-[5%] min-w-[50px] max-w-[100px] h-full">
                <img
                    src="./logo-white-stroke.png"
                    alt="Logo Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028"
                    className="h-[140%] w-auto object-contain"
                />
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-5 justify-center flex-grow flex-shrink max-w-none list-none">
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("dai-hoi")}
                >
                    ĐẠI HỘI
                </li>
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("su-kien")}
                >
                    SỰ KIỆN
                </li>
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("khen-thuong")}
                >
                    THÀNH TÍCH
                </li>
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("sv5t")}
                >
                    SINH VIÊN 5 TỐT
                </li>
                <li
                    className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5b9bd5] text-sm md:text-base font-semibold text-white hover:text-white"
                    onClick={() => scrollToSection("footer")}
                >
                    LIÊN HỆ
                </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex items-center justify-center p-2 rounded-md text-white hover:bg-[#5b9bd5] transition-colors duration-300 ml-auto mr-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-[999] transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-[10vh] right-0 w-64 h-[calc(100vh-10vh)] bg-[#0065b3] z-[1000] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <ul className="flex flex-col w-full pt-4 list-none">
                    <li
                        className="cursor-pointer px-6 py-4 transition-all duration-300 hover:bg-[#5b9bd5] text-base font-semibold text-white hover:text-white border-b border-[#5b9bd5]"
                        onClick={() => scrollToSection("dai-hoi")}
                    >
                        ĐẠI HỘI
                    </li>
                    <li
                        className="cursor-pointer px-6 py-4 transition-all duration-300 hover:bg-[#5b9bd5] text-base font-semibold text-white hover:text-white border-b border-[#5b9bd5]"
                        onClick={() => scrollToSection("su-kien")}
                    >
                        SỰ KIỆN
                    </li>
                    <li
                        className="cursor-pointer px-6 py-4 transition-all duration-300 hover:bg-[#5b9bd5] text-base font-semibold text-white hover:text-white border-b border-[#5b9bd5]"
                        onClick={() => scrollToSection("khen-thuong")}
                    >
                        THÀNH TÍCH
                    </li>
                    <li
                        className="cursor-pointer px-6 py-4 transition-all duration-300 hover:bg-[#5b9bd5] text-base font-semibold text-white hover:text-white border-b border-[#5b9bd5]"
                        onClick={() => scrollToSection("sv5t")}
                    >
                        SINH VIÊN 5 TỐT
                    </li>
                    <li
                        className="cursor-pointer px-6 py-4 transition-all duration-300 hover:bg-[#5b9bd5] text-base font-semibold text-white hover:text-white"
                        onClick={() => scrollToSection("footer")}
                    >
                        LIÊN HỆ
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar