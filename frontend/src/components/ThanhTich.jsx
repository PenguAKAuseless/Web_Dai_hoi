import React, { useState, useEffect } from "react";
import "../styles/ThanhTich.css";

const slides = [
    { image: "/award1.jpg", caption: "Bằng khen xuất sắc 2023" },
    { image: "/award2.jpg", caption: "Giải thưởng cống hiến 2022" },
];

const ThanhTich = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 15000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div id="thanh-tich" className="thanh-tich">
            <button className="arrow left" onClick={prevSlide}>&lt;</button>
            <img src={slides[index].image} alt="Award" className="large-image" />
            <p>{slides[index].caption}</p>
            <button className="arrow right" onClick={nextSlide}>&gt;</button>
        </div>
    );
};

export default ThanhTich;
