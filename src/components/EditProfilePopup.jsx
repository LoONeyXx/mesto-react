import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';
const EditProfilePopup = React.memo(function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = React.useContext(CurrentUserContext);
    const {
        values,
        isValid,
        errorMessages,
        handleChangeForm,
        setErrorMessages,
        handleChangeInput,
        setValues,
        setValid,
    } = useForm({
        name: '',
        about: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ name: values.name, about: values.about });
    }

    React.useEffect(() => {
        if (isOpen) {
            setValid(true);
            setValues(currentUser);
            setErrorMessages({});
        }
    }, [currentUser, isOpen, setErrorMessages, setValid, setValues]);

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            submitText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
            onChange={handleChangeForm}
            isLoading={isLoading}
            loadingMessage={'Сохранение...'}
        >
            <fieldset className='popup__input-group'>
                <input
                    value={values.name}
                    onChange={handleChangeInput}
                    minLength='2'
                    maxLength='30'
                    required
                    className='popup__input popup__input_type_name no-highlight'
                    type='text'
                    name='name'
                    id='name'
                />
                <span className={`popup__input-error ${errorMessages.name && 'popup__input-error_visible'}`}>
                    {errorMessages.name}
                </span>
                <input
                    value={values.about}
                    onChange={handleChangeInput}
                    minLength='2'
                    maxLength='200'
                    required
                    className='popup__input popup__input_type_description no-highlight'
                    type='text'
                    name='about'
                    id='about'
                />
                <span className={`popup__input-error ${errorMessages.about && 'popup__input-error_visible'}`}>
                    {errorMessages.about}
                </span>
            </fieldset>
        </PopupWithForm>
    );
});
export default EditProfilePopup;
