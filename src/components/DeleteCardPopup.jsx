import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, cardToBeDeleted, onDeleteCard, isLoading }) {
    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(cardToBeDeleted);
    }
    return (
        <PopupWithForm
            onClose={onClose}
            title={'Вы уверены?'}
            name={'delete-card'}
            submitText={'Да'}
            isLoading={isLoading}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            isValid={true}
            loadingMessage={'Удаление...'}
        />
    );
}
export default DeleteCardPopup;
