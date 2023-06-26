import React from 'react';

const ImagePopup = React.memo(function ImagePopup({ card, onClose, name, isOpen }) {
    const handleOverlayClick = React.useCallback(
        (e) => {
            if (e.target.classList.contains('popup_opened')) {
                onClose();
            }
        },
        [onClose]
    );
    return (
        <section
            onClick={handleOverlayClick}
            id='image'
            className={`popup popup_type_image ${card.link ? 'popup_opened' : ''}`}
        >
            <figure className={`popup__figure popup__figure_type_${name}`}>
                <button
                    onClick={onClose}
                    type='button'
                    className='button popup__btn-close popup__btn-close_type_image opacity no-highlight'
                />
                <img
                    src={card.link}
                    alt={card.name}
                    className={`popup__image popup__image_type_${name}`}
                />
                <figcaption className={`popup__image-text popup__image-text_type_${name}`}>{card.name}</figcaption>
            </figure>
        </section>
    );
});

export default ImagePopup;
