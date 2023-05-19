
import React from 'react';
import '../index.css'
import Header from './Header';
import Footer from './Footer';
import Main from './Main';






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
        onCardClick={handleCardClick}
        selectedCard={selectedCard}

        stateOfPopups={{
          isOpenEditAvatarPopup: isOpenEditAvatarPopup,
          isOpenEditProfilePopup: isOpenEditProfilePopup,
          isOpenAddCardPopup: isOpenAddCardPopup,
        }}

      />
      <Footer />
    </div>
  );
}

export default App;

