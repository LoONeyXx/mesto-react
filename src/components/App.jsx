
import React from 'react';
import '../index.css'
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";





function App() {


  const [isOpenEditProfilePopup, setEditProfilePopup] = React.useState(false)
  const [isOpenEditAvatarPopup, setEditAvatarPopup] = React.useState(false)
  const [isOpenAddCardPopup, setAddCardPopup] = React.useState(false)
  const [selectedCard, setSelectCard] = React.useState({ name: '', link: '' })



  function closeAllPopups() {
    setEditProfilePopup(false)
    setEditAvatarPopup(false)
    setAddCardPopup(false)
    setSelectCard({ name: '', link: '' })
  }

  function handleEditAvataReactlick() {
    setEditAvatarPopup(true)

  }

  function handleEditProfileClick() {
    setEditProfilePopup(true)
  }


  function handleAddPlaceClick() {
    setAddCardPopup(true)
  }

  function handleCardClick(card) {
    setSelectCard(card)
  }

  return (
    <div>
      <Header />
      <Main
        closeAllPopups={closeAllPopups}
        onEditAvatar={handleEditAvataReactlick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick} />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        submitText="Сохранить"
        isOpen={isOpenEditProfilePopup}
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
          <span className="popup__input-error name-error" />
          <input
            minLength="2"
            maxLength="200"
            required
            className="popup__input popup__input_type_description no-highlight"
            type="text"
            name="about"
            id="about" />
          <span className="popup__input-error about-error" />
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="avatar-profile"
        title="Обновить аватар"
        submitText='Сохранить'
        isOpen={isOpenEditAvatarPopup}
        onClose={closeAllPopups}>
        <fieldset className="popup__input-group">
          <input
            required
            placeholder="Добавьте ссылку на картинку"
            className="popup__input popup__input_type_avatar-profile no-highlight"
            type="url"
            name="avatar"
            id="avatar" />
          <span className="popup__input-error avatar-error" />
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        submitText='Создать'
        isOpen={isOpenAddCardPopup}
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
          <span className="popup__input-error title-error" />
          <input
            required
            placeholder='Ссылка на картинку'
            className="popup__input popup__input_type_card-link no-highlight"
            type="url"
            name="link"
            id="link" />
          <span className="popup__input-error link-error" />
        </fieldset>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;

