import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = React.memo(function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [isActiveError, setActiveError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isValidForm, setValidityForm] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    
    const refAvatar = React.useRef();
    React.useEffect(() => {
        if (isOpen) {
            refAvatar.current.value = '';
            setActiveError(false);
            setValidityForm(false);
        }
    }, [isOpen]);
    function handleChangeInput(e) {
        if (refAvatar.current.validity.valid) {
            setValidityForm(true);
            setActiveError(false);
        } else {
            setValidityForm(false);
            setActiveError(true);
            setErrorMessage(refAvatar.current.validationMessage);
        }
    }

    async function handleSumbit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            await onUpdateAvatar({ avatar: refAvatar.current.value });
            onClose();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <PopupWithForm
            name='avatar-profile'
            title='Обновить аватар'
            submitText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSumbit}
            isValid={isValidForm}
            isLoading={isLoading}
            loadingText={'Сохранение...'}
        >
            <fieldset className='popup__input-group'>
                <input
                    required
                    placeholder='Добавьте ссылку на картинку'
                    className='popup__input popup__input_type_avatar-profile no-highlight'
                    type='url'
                    name='avatar'
                    id='avatar'
                    ref={refAvatar}
                    onChange={handleChangeInput}
                />
                <span
                    className={`popup__input-error
                        ${isActiveError && 'popup__input-error_visible'}`}
                >
                    {errorMessage}
                </span>
            </fieldset>
        </PopupWithForm>
    );
});
export default EditAvatarPopup;
