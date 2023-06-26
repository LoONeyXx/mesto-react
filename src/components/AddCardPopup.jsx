import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';
const AddCardPopup = React.memo(function AddCardPopup({ isOpen, onClose, onAddCard, refPopup, isLoading }) {
    const {
        values,
        isValid,
        errorMessages,
        handleChangeForm,
        handleChangeInput,
        setErrorMessages,
        setValues,
        setValid,
    } = useForm({
        name: '',
        link: '',
    });
    React.useEffect(() => {
        if (isOpen) {
            setValues({ name: '', link: '' });
            setValid(false);
            setErrorMessages({});
        }
    }, [isOpen, setErrorMessages, setValid, setValues]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddCard(values);
    }

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            submitText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
            isLoading={isLoading}
            loadingMessage={'Сохранение...'}
            refPopup={refPopup}
            onChange={handleChangeForm}
        >
            <fieldset className='popup__input-group'>
                <input
                    value={values.name}
                    onChange={handleChangeInput}
                    minLength='2'
                    maxLength='30'
                    required
                    placeholder='Название'
                    className='popup__input popup__input_type_card-title no-highlight'
                    type='text'
                    name='name'
                    id='title'
                />
                <span
                    className={`popup__input-error avatar-error ${
                        errorMessages.name && 'popup__input-error_visible'
                    }`}
                >
                    {errorMessages.name}
                </span>
                <input
                    value={values.link}
                    onChange={handleChangeInput}
                    required
                    placeholder='Ссылка на картинку'
                    className='popup__input popup__input_type_card-link no-highlight'
                    type='url'
                    name='link'
                    id='link'
                />
                <span
                    className={`popup__input-error avatar-error ${
                        errorMessages.link && 'popup__input-error_visible'
                    }`}
                >
                    {errorMessages.link}
                </span>
            </fieldset>
        </PopupWithForm>
    );
});
export default AddCardPopup;
