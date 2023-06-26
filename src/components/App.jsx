import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Api from '../utils/API';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import SuccessPopup from './SuccessPopup';
import Profile from './Profile';
import DeleteCardPopup from './DeleteCardPopup';
import successLogo from '../images/success.svg';
import errorLogo from '../images/error.svg';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import { auth } from '../utils/Auth';

function App() {
    const [loggedIn, setLogin] = React.useState(false);

    const [isOpenEditProfilePopup, setEditProfilePopup] = React.useState(false);
    const [isOpenEditAvatarPopup, setEditAvatarPopup] = React.useState(false);
    const [isOpenAddCardPopup, setAddCardPopup] = React.useState(false);
    const [selectedCard, setSelectCard] = React.useState({
        name: '',
        link: '',
    });
    const [cardToBeDeleted, setToBeDeletedCard] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isActiveSuccessPopup, setSuccessPopup] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const isSomePopupOpened = React.useMemo(
        () =>
            !!selectedCard.name ||
            !!cardToBeDeleted ||
            [isOpenAddCardPopup, isOpenEditAvatarPopup, isOpenEditProfilePopup].some((isOpen) => isOpen),
        [isOpenAddCardPopup, selectedCard, isOpenEditAvatarPopup, isOpenEditProfilePopup, cardToBeDeleted]
    );
    const [toolTip, setToolTip] = React.useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const handleKeyEscape = React.useCallback((e) => {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    }, []);

    React.useEffect(() => {
        if (isSomePopupOpened) {
            window.addEventListener('keydown', handleKeyEscape);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyEscape);
        };
    }, [isSomePopupOpened, handleKeyEscape]);

    function startSuccessPopup(text) {
        setSuccessMessage(text);
        setSuccessPopup(true);
        setTimeout(() => {
            setSuccessMessage('');
            setSuccessPopup(false);
        }, 2000);
    }

    function startErrorPopup() {
        startSuccessPopup('Что то пошло не так :(');
    }
    async function handleCardLike(card) {
        const isLiked = card.likes.some((user) => user._id === currentUser._id);
        try {
            const response = await Api.changeLikeCardStatus(card._id, isLiked);
            const newCard = await response;
            setCards((prev) => prev.map((prevCard) => (prevCard._id === card._id ? newCard : prevCard)));
        } catch (error) {
            startErrorPopup();
            console.error(error);
        }
    }
    async function handleUpdateUser(user) {
        setLoading(true);
        try {
            const response = await Api.setProfileInfo(user);
            const newUserInfo = await response;
            setCurrentUser(newUserInfo);
            startSuccessPopup('Данные пользователя успешно обновлены');
            closeAllPopups();
        } catch (error) {
            startErrorPopup();
            console.error(error);
        }
        setLoading(false);
    }

    async function handleUpdateAvatar(info) {
        setLoading(true);
        try {
            const response = await Api.setProfileAvatar(info);
            const newUserInfo = await response;
            setCurrentUser(newUserInfo);
            startSuccessPopup('Данные пользователя успешно обновлены');
            closeAllPopups();
        } catch (error) {
            startErrorPopup();
            console.error(error);
        }
        setLoading(false);
    }

    async function handleAddCard(card) {
        setLoading(true);
        try {
            const response = await Api.addNewCard(card);
            const newCard = await response;
            setCards((prev) => [newCard, ...prev]);
            startSuccessPopup('Карточка успешно добавлена');
            closeAllPopups();
        } catch (error) {
            startErrorPopup();
            console.error(error);
        }
        setLoading(false);
    }

    async function handleDeleteCard(id) {
        setLoading(true);
        try {
            await Api.deleteCard(id);
            setCards((prevCards) => prevCards.filter((card) => card._id !== id));
            startSuccessPopup('Карточка успешно удалена');
            closeAllPopups();
        } catch (error) {
            startErrorPopup();
            console.error(error);
        }
        setLoading(false);
    }

    async function handleRegistartion(info) {
        try {
            const response = await auth.registration(info);
            const data = await response;
            navigate('/sign-in', { replace: true });
            setToolTip({ name: 'Вы успешно зарегистрировались!', link: successLogo });
            return data;
        } catch (error) {
            console.error(error);
            setToolTip({ name: 'Что-то пошло не так! Попробуйте ещё раз.', link: errorLogo });
        }
    }

    function handleExit() {
        setLogin(false);
        localStorage.removeItem('token');
        setCurrentUser({});
    }
    async function startRender() {
        const newCards = await Api.getCardsInfo();
        const newInfo = await Api.getProfileInfo();
        setCurrentUser((prev) => ({ ...prev, ...newInfo }));
        setCards(newCards);
    }

    useEffect(() => {
        if (loggedIn) {
            startRender();
        }
    }, [loggedIn]);

    const validationUser = React.useCallback(
        async (token) => {
            try {
                const responce = await auth.validation(token);
                const email = responce.data.email;
                setCurrentUser((prev) => ({ ...prev, email: email }));
                navigate('/', { replace: true });
                setLogin(true);
            } catch (error) {
                console.error(error);
            }
        },
        [navigate]
    );

    useEffect(() => {
        localStorage.token && validationUser(localStorage.token);
    }, [validationUser]);
    async function handleAuthorization(info) {
        try {
            const responce = await auth.authorization(info);
            const data = await responce;
            validationUser(data.token);
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error(error);
        }
    }

    function closeAllPopups(e) {
        setEditProfilePopup(false);
        setEditAvatarPopup(false);
        setAddCardPopup(false);
        setSelectCard({ name: '', link: '' });
        setToBeDeletedCard('');
        setToolTip({ name: '', link: '' });
    }

    function handleEditAvatarClick() {
        setEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        setAddCardPopup(true);
    }

    function handleCardClick(card) {
        setSelectCard(card);
    }
    function handleDeleteClick(card) {
        setToBeDeletedCard(card._id);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header
                onExit={handleExit}
                location={location}
            />

            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={
                                <Main
                                    closeAllPopups={closeAllPopups}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleDeleteClick}
                                    cards={cards}
                                >
                                    <Profile
                                        onEditAvatar={handleEditAvatarClick}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                    />
                                </Main>
                            }
                        />
                    }
                ></Route>

                {!loggedIn && (
                    <Route
                        path='/sign-up'
                        element={<Register onSubmit={handleRegistartion} />}
                    />
                )}
                {!loggedIn && (
                    <Route
                        path='/sign-in'
                        element={<Login onSubmit={handleAuthorization} />}
                    />
                )}
            </Routes>

            <InfoTooltip
                name={toolTip.name}
                onClose={closeAllPopups}
                logo={toolTip.link}
            />

            <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
                isOpen={isOpenEditProfilePopup}
                isLoading={isLoading}
            />
            <EditAvatarPopup
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isOpenEditAvatarPopup}
                onClose={closeAllPopups}
                isLoading={isLoading}
            />
            <AddCardPopup
                isLoading={isLoading}
                onClose={closeAllPopups}
                isOpen={isOpenAddCardPopup}
                onAddCard={handleAddCard}
            />
            <DeleteCardPopup
                onDeleteCard={handleDeleteCard}
                isOpen={!!cardToBeDeleted}
                onClose={closeAllPopups}
                cardToBeDeleted={cardToBeDeleted}
                isLoading={isLoading}
            />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
            <SuccessPopup
                textSuccess={successMessage}
                isActive={isActiveSuccessPopup}
            />
            {loggedIn && <Footer />}
        </CurrentUserContext.Provider>
    );
}

export default App;
