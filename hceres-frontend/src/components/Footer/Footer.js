import React from 'react';
import {FooterBody, FooterText, AboutImg} from './FooterElements'
import AboutLogo from '../../assets/about.svg';

const Footer = () => {
    return (
        <FooterBody>
            <div className="text5"></div>
            <div className="text2">
                <FooterText> ©2021 - CRTI - Ecole Centrale Nantes - France </FooterText>
            </div>
            <div className="footer1">
                <AboutImg to="/About">
                    <img src={AboutLogo} alt="about" width='auto'/>
                </AboutImg>
            </div>
        </FooterBody>
    );
};

export default Footer;