import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, cardToBeDeleted, onDeleteCard, refPopup }) {
    const [isLoading, setLoading] = React.useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await onDeleteCard(cardToBeDeleted);
            onClose();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
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
            loadingText={'Удаление...'}
            refPopup={refPopup}
        />
    );
}
export default DeleteCardPopup;
