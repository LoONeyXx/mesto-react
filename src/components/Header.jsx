import logo from '../images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Header = React.memo(function Header({ location, onExit }) {
    const user = React.useContext(CurrentUserContext);
    const [isActiveMenu, setActiveMenu] = React.useState(false);

    function LinkComponent() {
        if (location.pathname === '/sign-up') {
            return (
                <Link
                    to='/sign-in'
                    className='opacity log-in-out'
                >
                    Войти
                </Link>
            );
        }
        if (location.pathname === '/sign-in') {
            return (
                <Link
                    to='/sign-up'
                    className='opacity log-in-out'
                >
                    Регистрация
                </Link>
            );
        }

        if (location.pathname === '/') {
            return (
                <Link
                    to='/sign-in'
                    className='opacity log-in-out'
                    onClick={onExit}
                >
                    Выйти
                </Link>
            );
        }
    }
    return (
        <header className='header'>
            <div className={`header__burger-menu ${isActiveMenu && 'header__burger-menu_active'}`}>
                <p className='header__email'>{user.email ? user.email : ''}</p>
                <LinkComponent />
            </div>
            <div className='header__container'>
                <img
                    alt='Логотип MESTO RUSSIA'
                    src={logo}
                    className='logo'
                />
                <div className='header__login-info'>
                    <p className='header__email'>{user.email ? user.email : ''}</p>
                    <LinkComponent />
                </div>
                <div
                    onClick={() => setActiveMenu((prev) => !prev)}
                    className={`opacity header__burger ${isActiveMenu && 'header__burger_active'}`}
                >
                    {!isActiveMenu && <span></span>}
                </div>
            </div>
        </header>
    );
});

export default Header;
