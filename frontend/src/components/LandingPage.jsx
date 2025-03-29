import React from "react";
import Navbar from "./Navbar";
import DaiHoi from "./DaiHoi";
import SuKien from "./SuKien";
import KhenThuong from "./KhenThuong";
import SV5T from "./SV5T";
import ScrollToTopButton from "./ScrollToTopButton";

const LandingPage = () => {
    return (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/background.png')" }}>
            <Navbar />
            <DaiHoi />
            <SuKien />
            <KhenThuong />
            <SV5T />
            <ScrollToTopButton />
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

export default LandingPage;