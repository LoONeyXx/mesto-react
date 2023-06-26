import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';
const EditAvatarPopup = React.memo(function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
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
        avatar: '',
    });

    function handleSumbit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: values.avatar });
    }

    React.useEffect(() => {
        if (isOpen) {
            setValues({ avatar: '' });
            setValid(false);
            setErrorMessages({});
        }
    }, [isOpen, setValid, setValues, setErrorMessages]);
    return (
        <PopupWithForm
            name='avatar-profile'
            title='Обновить аватар'
            submitText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSumbit}
            isValid={isValid}
            isLoading={isLoading}
            loadingMessage={'Сохранение...'}
            onChange={handleChangeForm}
        >
            <fieldset className='popup__input-group'>
                <input
                    value={values.avatar}
                    onChange={handleChangeInput}
                    required
                    placeholder='Добавьте ссылку на картинку'
                    className='popup__input popup__input_type_avatar-profile no-highlight'
                    type='url'
                    name='avatar'
                    id='avatar'
                />
                <span
                    className={`popup__input-error
                        ${errorMessages.avatar && 'popup__input-error_visible'}`}
                >
                    {errorMessages.avatar}
                </span>
            </fieldset>
        </PopupWithForm>
    );
});
export default EditAvatarPopup;
