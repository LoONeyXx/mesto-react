import React from "react";

import PopupWithForm from "./PopupWithForm";
import Api from "../utils/API";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

function Main({ onEditProfile, onAddPlace, onEditAvatar, closeAllPopups, onCardClick, stateOfPopups, selectedCard }) {
    const [userName, setName] = React.useState('')
    const [userDescription, setDescription] = React.useState('')
    const [userAvatar, setAvatar] = React.useState('')

    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        Api.getProfileInfo()
            .then(info => {
                setName(info.name)
                setDescription(info.about)
                setAvatar(info.avatar)

            })
            .then(() => {
                Api.getCardsInfo()
                    .then(cards => {

                        setCards(cards)
                    })
            })
            .catch(error => console.log(error))
    }, [])




    return (
        <main className="content">
            <section className="profile">
                <div
                    onClick={onEditAvatar}
                    className="profile__overlay no-highlight">
                    <div style={{
                        backgroundImage: `url(${userAvatar})`
                    }}
                        className="profile__image" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}
                    </h1>
                    <button
                        onClick={onEditProfile}
                        type="button"
                        className="button profile__btn-edit opacity no-highlight">
                    </button>
                    <p className="profile__subtitle">{userDescription}
                    </p>
                </div>
                <button
                    onClick={onAddPlace}
                    type="button"
                    className="button profile__btn-add opacity no-highlight">
                </button>
            </section>
            <section id="image" className="popup popup_type_image">
                <figure className="popup__figure">
                    <button
                        type="button"
                        className="button popup__btn-close popup__btn-close_type_image opacity no-highlight">
                    </button>
                    <div className="popup__image" />
                    <figcaption className="popup__image-text"></figcaption>
                </figure>
            </section>
            <section className="cards">
                <ul className="list cards__container">
                    {(cards.map(card =>
                        <Card
                            onCardClick={onCardClick}
                            key={card._id}
                            card={card}
                        />))}
                </ul>
            </section>
            <PopupWithForm
                name="edit-profile"
                title="Редактировать профиль"
                submitText="Сохранить"
                isOpen={stateOfPopups.isOpenEditProfilePopup}
                onClose={closeAllPopups} >

                <fieldset className="popup__input-group">
                    <input
                        minLength="2"
                        maxLength="30"
                        required
                        className="popup__input popup__input_type_name no-highlight"
                        type="text"
                        name="name"
                        id="name" />
                    <span className="popup__input-error name-error"></span>
                    <input
                        minLength="2"
                        maxLength="200"
                        required
                        className="popup__input popup__input_type_description no-highlight"
                        type="text"
                        name="about"
                        id="about" />
                    <span className="popup__input-error about-error"></span>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm
                name="avatar-profile"
                title="Обновить аватар"
                submitText='Сохранить'
                isOpen={stateOfPopups.isOpenEditAvatarPopup}
                onClose={closeAllPopups}>

                <fieldset className="popup__input-group">
                    <input
                        required
                        placeholder="Добавьте ссылку на картинку"
                        className="popup__input popup__input_type_avatar-profile no-highlight"
                        type="url"
                        name="avatar"
                        id="avatar" />
                    <span className="popup__input-error avatar-error"></span>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm
                name="add-card"
                title="Новое место"
                submitText='Создать'
                isOpen={stateOfPopups.isOpenAddCardPopup}
                onClose={closeAllPopups}>
                <fieldset className="popup__input-group">
                    <input
                        minLength="2"
                        maxLength="30"
                        required
                        placeholder='Название'
                        className="popup__input popup__input_type_card-title no-highlight"
                        type="text"
                        name="name"
                        id="title" />
                    <span className="popup__input-error title-error">1245</span>
                    <input
                        required
                        placeholder='Ссылка на картинку'
                        className="popup__input popup__input_type_card-link no-highlight"
                        type="url"
                        name="link"
                        id="link" />
                    <span className="popup__input-error link-error"></span>
                </fieldset>
            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups} />




            {/* <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                submitText='Да'
                isOpen={onDeleteCard.isOpen}
                onClose={closeAllPopups} /> */}

        </main>
    )
}


export default Main