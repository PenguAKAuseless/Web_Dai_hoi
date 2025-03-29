const Footer = () => {
    return (
        <div 
            id="footer"
            className="relative bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center w-full h-auto bg-[#f1f3f4]"
        >
            <div className="footer-container flex w-5/6 m-5">
            <table className="font-arial h-1/4 w-1/2">
                <tbody>
                    <tr>
                        <td className="align-top">
                            <img 
                            src="../../public/signature/logo_HSV.png" 
                            alt="Logo Hội Sinh viên Việt Nam" 
                            className="w-36 h-36 object-contain p-4"
                            />
                        </td>
                        <td>
                            <img
                            src="../../public/signature/shadow.png" 
                            alt="Shadow effect" 
                            className="h-24 object-contain mr-1.5"
                            />
                        </td>
                        <td className="text-left">
                            <div className="font-bold mt-5">Liên Chi hội Sinh viên khoa KH&KT Máy tính</div>
                            <div className="font-bold mb-1">Trường Đại học Bách khoa - ĐHQG-HCM</div>
                            <div className="leading-[1.3] text-sm font-thin">
                                <b>E: </b> 
                                <a href="mailto:dtn-ktmt@hcmut.edu.vn" className="text-[#15c]">
                                    dtn-ktmt@hcmut.edu.vn
                                </a>
                            </div>
                            <div className="leading-[1.3] text-sm font-thin  max-w-[400px]">
                                <b>A: </b> 
                                602-BK.B6, trường Đại học Bách khoa - ĐHQG-HCM, phường Đông Hòa, thành phố Dĩ An, tỉnh Bình Dương
                            </div>
                            <div className="mt-2">
                                <a href="https://fb.com/BKCSE.Multimedia">
                                    <img 
                                    src="../../public/signature/facebook_icon.png" 
                                    alt="Facebook icon" 
                                    />
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
                </table>
                <div className="w-full md:w-1/2">
                    <div className="relative flex items-center justify-center h-full">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1554.898702234986!2d106.80546955575784!3d10.880056318887936!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d914866b51c9%3A0x913146948e01ee20!2zTmjDoCBINiBUcsaw4budbmcgxJHhuqFpIGjhu41jIELDoWNoIEtob2EgVHBIQ00!5e0!3m2!1svi!2sus!4v1743244636028!5m2!1svi!2sus" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-3/5 h-full border-0 rounded-lg shadow-lg ml-44"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;