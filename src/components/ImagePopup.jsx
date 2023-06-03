import React from 'react';

const ImagePopup = React.memo(function ImagePopup({ card, onClose, onOverlayClick, refPopup }) {
    return (
        <section
            ref={refPopup}
            onClick={onOverlayClick}
            id='image'
            className={`popup popup_type_image ${card.link ? 'popup_opened' : ''}`}
        >
            <figure className='popup__figure'>
                <button
                    onClick={onClose}
                    type='button'
                    className='button popup__btn-close popup__btn-close_type_image opacity no-highlight'
                />
                <img src={card.link} alt={card.name} className='popup__image' />
                <figcaption className='popup__image-text'>{card.name}</figcaption>
            </figure>
        </section>
    );
});

export default ImagePopup;
