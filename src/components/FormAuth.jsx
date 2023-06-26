import React from 'react';
import { useInput } from '../hooks/useInput';
function FormAuth({ name, submitText, onSubmit }) {
    const { values, handleChangeInput } = useInput({ email: '', password: '' });

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values);
    }
    return (
        <form
            noValidate
            action='#'
            className={`form form_type_${name}`}
            onSubmit={handleSubmit}
        >
            <fieldset className={`form__input-group form__input-group_type_${name}`}>
                <input
                    defaultValue={values.email}
                    onChange={handleChangeInput}
                    noValidate
                    minLength={2}
                    placeholder='Email'
                    name='email'
                    className={`form__input form__input_type_${name}`}
                    type='email'
                />
                <input
                    defaultValue={values.password}
                    onChange={handleChangeInput}
                    noValidate
                    placeholder='Пароль'
                    name='password'
                    className={`form__input form__input_type_${name}`}
                    type='password'
                />
            </fieldset>
            <button
                type='submit'
                className={`button form__submit`}
            >
                {submitText}
            </button>
        </form>
    );
}
export default FormAuth;
