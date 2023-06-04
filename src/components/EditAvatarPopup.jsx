import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = React.memo(function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isValidForm, setValidityForm] = React.useState(false);

    const refAvatar = React.useRef();
    React.useEffect(() => {
        if (isOpen) {
            refAvatar.current.value = '';
            setValidityForm(false);
        }
    }, [isOpen]);

    function handleChangeInput(e) {
        if (refAvatar.current.validity.valid) {
            setValidityForm(true);
        } else {
            setValidityForm(false);
            setErrorMessage(refAvatar.current.validationMessage);
        }
    }

    function handleSumbit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: refAvatar.current.value });
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
            loadingMessage={'Сохранение...'}
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
                        ${errorMessage && 'popup__input-error_visible'}`}
                >
                    {errorMessage}
                </span>
            </fieldset>
        </PopupWithForm>
    );
});
export default EditAvatarPopup;
