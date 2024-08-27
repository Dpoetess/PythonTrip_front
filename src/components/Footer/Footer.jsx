import React from "react";
import "./Footer.css";
import Facebook from "../../../public/assets/icons/Facebook.svg";
import TwitterX from "../../../public/assets/icons/TwitterX.svg";
import Instagram from "../../../public/assets/icons/Instagram.svg";
import YouTube from "../../../public/assets/icons/YouTube.svg";


function Footer() {
    return (
        <>
            <section className="footerWrapp">
                <div className="imgFooterContainer">
                    <img src={Facebook} alt="Facebook logo" />
                    <img src={TwitterX} alt="TwitterX logo" />
                    <img src={Instagram} alt="Instagram logo" />
                    <img src={YouTube} alt="Youtube logo" />
                </div>
                <div>
                    <p className="footerP">© Copyright 2024</p>
                </div>
            </section>
        </>
    )
};

export default Footer;
