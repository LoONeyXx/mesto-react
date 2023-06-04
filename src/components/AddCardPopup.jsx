import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddCardPopup = React.memo(function AddCardPopup({ isOpen, onClose, onAddCard, refPopup }) {
    const [card, setCard] = React.useState({ name: '', link: '' });
    const [isActiveErrors, setActiveErrors] = React.useState({ name: false, link: false });
    const [errorMessages, setErrorMessages] = React.useState({ name: '', link: '' });
    const [isValidationInputs, setInputsValidation] = React.useState({ name: false, link: false });
    const [isLoading, setLoading] = React.useState(false);
    const [isValidForm, setValidForm] = React.useState(false);

    React.useEffect(() => {
        setValidForm(Object.values(isValidationInputs).every((input) => input));
    }, [isValidationInputs]);

    React.useEffect(() => {
        if (isOpen) {
            setCard({ name: '', link: '' });
            setInputsValidation({ name: false, link: false });
            setActiveErrors({ name: false, link: false });
        }
    }, [isOpen]);

    function handleChangeInput(e) {
        setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.validity.valid) {
            setInputsValidation((prev) => ({
                ...prev,
                [e.target.name]: true,
            }));
            setActiveErrors((prev) => ({ ...prev, [e.target.name]: false }));
        } else {
            setInputsValidation((prev) => ({
                ...prev,
                [e.target.name]: false,
            }));
            setActiveErrors((prev) => ({ ...prev, [e.target.name]: true }));
            setErrorMessages((prev) => ({ ...prev, [e.target.name]: e.target.validationMessage }));
        }
    }

    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            await onAddCard(card);
            onClose();
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }
    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            submitText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValidForm}
            isLoading={isLoading}
            loadingText={'Сохранение...'}
            refPopup={refPopup}
        >
            <fieldset className='popup__input-group'>
                <input
                    minLength='2'
                    maxLength='30'
                    required
                    placeholder='Название'
                    className='popup__input popup__input_type_card-title no-highlight'
                    type='text'
                    name='name'
                    id='title'
                    value={card.name ?? ''}
                    onChange={handleChangeInput}
                />
                <span
                    className={`popup__input-error avatar-error ${
                        isActiveErrors.name && 'popup__input-error_visible'
                    }`}
                >
                    {errorMessages.name}
                </span>
                <input
                    required
                    placeholder='Ссылка на картинку'
                    className='popup__input popup__input_type_card-link no-highlight'
                    type='url'
                    name='link'
                    id='link'
                    value={card.link ?? ''}
                    onChange={handleChangeInput}
                />
                <span
                    className={`popup__input-error avatar-error ${
                        isActiveErrors.link && 'popup__input-error_visible'
                    }`}
                >
                    {errorMessages.link}
                </span>
            </fieldset>
        </PopupWithForm>
    );
});
export default AddCardPopup;
