import React from "react";
import Navbar from "./Navbar";
import DaiHoi from "./DaiHoi";
import SuKien from "./SuKien";
import KhenThuong from "./KhenThuong";
import SV5T from "./SV5T";
import ScrollToTopButton from "./ScrollToTopButton";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <DaiHoi />
            <SuKien />
            <KhenThuong />
            <SV5T />
            <ScrollToTopButton />
        </div>
    );
};

export default LandingPage;
