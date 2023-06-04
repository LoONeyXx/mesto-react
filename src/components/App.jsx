import React from 'react';
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

function App() {
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

    React.useEffect(() => {
        Promise.all([Api.getCardsInfo(), Api.getProfileInfo()])
            .then(([newCards, newInfo]) => {
                setCurrentUser(newInfo);
                setCards(newCards);
            })
            .catch(console.error);
    }, []);

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

    async function closeAllPopups(e) {
        setEditProfilePopup(false);
        setEditAvatarPopup(false);
        setAddCardPopup(false);
        setSelectCard({ name: '', link: '' });
        setToBeDeletedCard('');
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
            <Header />
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
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <SuccessPopup textSuccess={successMessage} isActive={isActiveSuccessPopup} />
            <Footer />
        </CurrentUserContext.Provider>
    );
}

export default App;

/**        Наброски на будущее */

// const isSomePopupOpened =
//     !!selectedCard.name ||
//     !!cardToBeDeleted ||
//     [isOpenAddCardPopup, isOpenEditAvatarPopup, isOpenEditProfilePopup].some((isOpen) => isOpen);

// const refPopupProfileEdit = React.useRef();
// const refPopupAddCard = React.useRef();
// const refPopupAvatarEdit = React.useRef();
// const refPopupImage = React.useRef();
// const refPopupDeleteCard = React.useRef();

// const setOverlaysClick = React.useCallback(() => {
//     [refPopupProfileEdit, refPopupAddCard, refPopupAvatarEdit, refPopupImage, refPopupDeleteCard].forEach(
//         ({ current }) =>
//             current.addEventListener('click', (e) => {
//                 if (e.target.classList.contains('popup_opened')) {
//                     closeAllPopups();
//                 }
//             })
//     );
// },[]);
// React.useEffect(() => {
//     isSomePopupOpened && window.addEventListener('keydown', handleEscapeClosePopup);
// }, [
//     isOpenAddCardPopup,
//     isOpenEditAvatarPopup,
//     isOpenEditProfilePopup,
//     selectedCard.name,
//     cardToBeDeleted,
//     isSomePopupOpened,
// ]);

// function handleEscapeClosePopup(e) {
//     e.key === 'Escape' && closeAllPopups();
// }

// function handleOverlayClick(e) {
//     if (e.target.classList.contains('popup_opened')) {
//         closeAllPopups();
//     }
// }
//  function validationForm(e) {
//     if (e.currentTarget.checkValidity()) {
//         setSubmitButtonText(true);
//         setErrorMessages((prev) => ({ ...prev, [e.target.name]: '' }));
//     } else {
//         setSubmitButtonText(false);
//         setErrorMessages((prev) => ({ ...prev, [e.target.name]: e.target.validationMessage }));
//     }
// }
