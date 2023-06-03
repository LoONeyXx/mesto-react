import logo from '../images/logo.svg';
import React from 'react';

const Header = React.memo(function Header() {
    return (
        <header className='header'>
            <img alt='Логотип MESTO RUSSIA' src={logo} className='logo' />
        </header>
    );
});

export default Header;
