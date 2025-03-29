const Footer = () => {
    return (
        <div
            id="footer"
            className="relative bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center w-full h-auto bg-[#d4eaf7] shadow-md py-6"
        >
            <div className="footer-container flex flex-col md:flex-row w-11/12 md:w-5/6 mx-auto gap-8">
                {/* Contact Information Section */}
                <div className="w-full md:w-1/2 content-center">
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
                            <img
                                src="/signature/logo_HSV.png"
                                alt="Logo Hội Sinh viên Việt Nam"
                                className="w-24 h-24 md:w-36 md:h-36 object-contain"
                            />
                        </div>
                        <div className="text-center sm:text-left sm:ml-4">
                            <div className="font-bold ">Liên Chi hội khoa KH&KT Máy tính</div>
                            <div className="font-bold">Trường Đại học Bách khoa - ĐHQG-HCM</div>
                            <div className="leading-[1.3] text-sm font-thin mt-2">
                                <b>E: </b>
                                <a href="mailto:dtn-ktmt@hcmut.edu.vn" className="text-[#0065b3]">
                                    dtn-ktmt@hcmut.edu.vn
                                </a>
                            </div>
                            <div className="leading-[1.3] text-sm font-thin max-w-[400px] mt-1">
                                <b>A: </b>
                                602-BK.B6, trường Đại học Bách khoa - ĐHQG-HCM, phường Đông Hòa, thành phố Dĩ An, tỉnh Bình Dương
                            </div>
                            <div className="mt-3 flex justify-center sm:justify-start">
                                <a href="https://fb.com/BKCSE.Multimedia">
                                    <img src="/signature/facebook_icon.png" alt="Facebook icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <div className="flex items-center justify-center h-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1554.898702234986!2d106.80546955575784!3d10.880056318887936!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d914866b51c9%3A0x913146948e01ee20!2zTmjDoCBINiBUcsaw4budbmcgxJHhuqFpIGhhu41jIELDoWNoIEtob2EgVHBIQ00!5e0!3m2!1svi!2sus!4v1743244636028!5m2!1svi!2sus"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-32 md:h-64 border-0 rounded-lg shadow-lg"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer

