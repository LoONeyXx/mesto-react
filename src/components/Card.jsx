function Card({ card, onCardClick }) {


    function handleClick() {
        onCardClick(card)
    }

    return (
        <li className="cards__item scale-animation">
            <button
                className="button cards__delete-btn opacity no-highlight">
            </button>
            <div
                onClick={handleClick}
                style={{
                    backgroundImage: `url(${card.link})`
                }}
                className="cards__image" />
            <div className="cards__title-zone">
                <h2 className="cards__title">{card.name}</h2>
                <div className="cards__like-zone">
                    <button
                        type="button"
                        className="button cards__like-btn no-highlight">
                    </button>
                    <p className="cards__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card