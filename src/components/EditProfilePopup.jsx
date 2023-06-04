import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = React.memo(function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [user, setUser] = React.useState({ name: '', about: '' });
    const [isActiveErrors, setActiveErrors] = React.useState({ name: false, about: false });
    const [isValidationInputs, setInputsValidation] = React.useState({ name: true, about: true });
    const [errorMessages, setErrorMessages] = React.useState({ name: '', about: '' });
    const [isValidForm, setValidForm] = React.useState(true);
    const [isLoading, setLoading] = React.useState(false);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setValidForm(Object.values(isValidationInputs).every((input) => input));
    }, [isValidationInputs]);

    React.useEffect(() => {
        if (isOpen) {
            setInputsValidation({ name: true, about: true });
            setActiveErrors({ name: false, about: false });
            setUser(currentUser);
        }
    }, [currentUser, isOpen]);

    function handleChangeInput(e) {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.validity.valid) {
            setInputsValidation((prev) => ({
                ...prev,
                [e.target.name]: true,
            }));
            setActiveErrors((prev) => ({ ...prev, [e.target.name]: false }));
        } else {
            setInputsValidation((prev) => ({
                ...prev,
                name: false,
            }));
            setActiveErrors((prev) => ({ ...prev, [e.target.name]: true }));
            setErrorMessages((prev) => ({ ...prev, [e.target.name]: e.target.validationMessage }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await onUpdateUser({ name: user.name, about: user.about });
            onClose();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            submitText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValidForm}
            isLoading={isLoading}
            loadingText={'Сохранение...'}
        >
            <fieldset className='popup__input-group'>
                <input
                    minLength='2'
                    maxLength='30'
                    required
                    className='popup__input popup__input_type_name no-highlight'
                    type='text'
                    name='name'
                    id='name'
                    value={user.name ?? ''}
                    onChange={handleChangeInput}
                />
                <span className={`popup__input-error ${isActiveErrors.name && 'popup__input-error_visible'}`}>
                    {errorMessages.name}
                </span>
                <input
                    minLength='2'
                    maxLength='200'
                    required
                    className='popup__input popup__input_type_description no-highlight'
                    type='text'
                    name='about'
                    id='about'
                    value={user.about ?? ''}
                    onChange={handleChangeInput}
                />
                <span className={`popup__input-error ${isActiveErrors.about && 'popup__input-error_visible'}`}>
                    {errorMessages.about}
                </span>
            </fieldset>
        </PopupWithForm>
    );
});
export default EditProfilePopup;
