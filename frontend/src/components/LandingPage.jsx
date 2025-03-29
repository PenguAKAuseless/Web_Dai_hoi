import React from "react";
import Navbar from "./Navbar";
import DaiHoi from "./DaiHoi";
import SuKien from "./SuKien";
import KhenThuong from "./KhenThuong";
import SV5T from "./SV5T";
import ScrollToTopButton from "./ScrollToTopButton";
import Footer from "./Footer";

const LandingPage = () => {
    return (
        <div className="w-[100dvw] h-[100dvh] bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/background.png')" }}>
            <Navbar />
            <DaiHoi />
            <SuKien />
            <KhenThuong />
            <SV5T />
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default LandingPage;