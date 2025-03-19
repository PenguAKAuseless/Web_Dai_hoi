import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="navbar">
            <div className="logo-navbar">
                <img src="/logo.png" alt="Logo Đại hội đại biểu Hội sinh viên Việt Nam khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028" className="logo" />
            </div>
            <ul>
                <li onClick={() => scrollToSection("dai-hoi")}>Đại hội</li>
                <li onClick={() => scrollToSection("su-kien")}>Hoạt động tiêu biểu</li>
                <li onClick={() => scrollToSection("thanh-tich")}>Bằng khen</li>
                <li onClick={() => scrollToSection("sv5t")}>Sinh viên 5 tốt</li>
            </ul>
        </nav>
    );
};

export default Navbar;
