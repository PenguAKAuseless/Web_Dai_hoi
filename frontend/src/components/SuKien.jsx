import React, { useState, useEffect } from "react";
import "../styles/SuKien.css";

const slides = [
    { image: "/img1.jpg", title: "Tiêu đề 1", text: "Lorem ipsum dolor sit amet..." },
    { image: "/img2.jpg", title: "Tiêu đề 2", text: "Consectetur adipiscing elit..." },
];

const SuKien = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 15000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div id="su-kien" className="su-kien">
            <div className="slider">
                <button className="arrow left" onClick={prevSlide}>&lt;</button>
                <img src={slides[index].image} alt="Slide" />
                <div className="text-box">
                    <h2>{slides[index].title}</h2>
                    <p>{slides[index].text}</p>
                </div>
                <button className="arrow right" onClick={nextSlide}>&gt;</button>
            </div>
        </div>
    );
};

export default SuKien;