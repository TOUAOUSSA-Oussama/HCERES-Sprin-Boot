// Cette component est pour definir la barre de navigation
import React, {useState, useEffect} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
    NavBtnLink
}
    from './NavbarElements';
import {Button} from '../../AppElements';
import Logo from '../../assets/logo.png';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isWindowBig, setWindowBig] = useState(true);
    const closeMobileMenu = () => setClick(false);

    const handleClick = () => setClick(!click);

    // pour n'afficher le grand boutton que pour les garndes ecrans
    const calculateIsWindowBig = () => {
        if (window.innerWidth <= 960) {
            setWindowBig(false);
        } else {
            setWindowBig(true);
        }
    };

    useEffect(() => {
        calculateIsWindowBig();
    }, []);

    return (
        // Nav, NavbarContainer, ... sont des styles qu'on a definti dans Navbar.elements.js
        <Nav>
            <NavbarContainer>
                {/* Logo + icone */}
                <NavLogo to="/Home" onClick={closeMobileMenu}>
                    <img src={Logo} width="60"/>
                </NavLogo>
                {/* Les trois lignes qui apparaitre lorsqu'on reduit la page (pour les telephones par exemple) */}
                <MobileIcon onClick={handleClick}>
                    {/* si le menu est cliquer => la component FaTimes */}
                    {/* sinon => la component FaBars */}
                    {click ? <FaTimes/> : <FaBars/>}
                </MobileIcon>
                {/* Le menu que va contenir le Navbar */}
                <NavMenu onClick={handleClick} click={click}>
                    <NavItem>
                        <NavLinks to="/Home" className={(nav) => nav.isActive() ? "active" : ""}>
                            Accueil
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Researcher">
                            Chercheurs
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Activity">
                            Ajout d'activités
                        </NavLinks>
                    </NavItem>
                    {/* ajouter bouton de deconnexion */}
                    <NavItemBtn>
                        {isWindowBig ? (
                            <NavBtnLink to='/'>
                                <Button fontBig primary>Deconnexion</Button>
                            </NavBtnLink>
                        ) : (
                            <NavBtnLink to='/'>
                                <Button primary>
                                    Deconnexion
                                </Button>
                            </NavBtnLink>
                        )}
                    </NavItemBtn>
                </NavMenu>
            </NavbarContainer>
        </Nav>
    );
};

export default Navbar;