import React, { useState, useEffect } from "react";
import "../styles/ScrollToTopButton.css";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        isVisible && (
            <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                ⬆
            </button>
        )
    );
};

export default ScrollToTopButton;