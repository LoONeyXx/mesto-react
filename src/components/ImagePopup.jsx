function ImagePopup({ card, onClose }) {
    return (
        <section
            id="image"
            className={`popup popup_type_image ${card.link ? 'popup_opened' : ''}`}>
            <figure className="popup__figure">
                <button
                    onClick={onClose}
                    type="button"
                    className="button popup__btn-close popup__btn-close_type_image opacity no-highlight">
                </button>
                <img
                    src={card.link}
                    alt={card.name}
                    className="popup__image" />
                <figcaption className="popup__image-text">{card.name}</figcaption>
            </figure>
        </section>
    )
}


export default ImagePopup