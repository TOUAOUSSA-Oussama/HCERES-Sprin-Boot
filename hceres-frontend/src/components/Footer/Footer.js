import React from 'react';
import {FooterBody, FooterText, AboutImg} from './FooterElements'
import AboutLogo from '../../assets/about.svg';

const Footer = () => {
    return (
        <FooterBody>
            <div class="text5"></div>
            <div class="text2">
                <FooterText> ©2021 - CRTI - Ecole Centrale Nantes - France </FooterText>
            </div>
            <div class="footer1">
                <AboutImg to="/About">
                    <img src={AboutLogo} alt="about" width='auto'/>
                </AboutImg>
            </div>
        </FooterBody>
    );
};

export default Footer;