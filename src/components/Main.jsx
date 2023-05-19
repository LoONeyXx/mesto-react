import React from "react";


import Api from "../utils/API";
import Card from "./Card";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setName] = React.useState('')
    const [userDescription, setDescription] = React.useState('')
    const [userAvatar, setAvatar] = React.useState('')

    const [cards, setCards] = React.useState([])

    React.useEffect(() => {

        Promise.all([Api.getProfileInfo(), Api.getCardsInfo()])
            .then(([profileInfo, cards]) => {
                setName(profileInfo.name)
                setDescription(profileInfo.about)
                setAvatar(profileInfo.avatar)
                setCards(cards)
            })
            .catch(console.error)
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
                        className="button profile__btn-edit opacity no-highlight" />
                    <p className="profile__subtitle">{userDescription}
                    </p>
                </div>
                <button
                    onClick={onAddPlace}
                    type="button"
                    className="button profile__btn-add opacity no-highlight" />
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
        </main>
    )
}


export default Main