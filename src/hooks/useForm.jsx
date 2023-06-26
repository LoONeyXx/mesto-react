import React from 'react';
import { useInput } from './useInput';
export function useForm(initializeValues) {
    const [errorMessages, setErrorMessages] = React.useState({});
    const { values, setValues, handleChangeInput } = useInput(initializeValues);
    const [isValid, setValid] = React.useState(false);
    function handleChangeForm(e) {
        handleChangeInput(e);
        if (e.currentTarget.checkValidity()) {
            setValid(true);
            setErrorMessages({});
        } else {
            setValid(false);
            setErrorMessages((prev) => ({ ...prev, [e.target.name]: e.target.validationMessage }));
        }
    }

    return {
        values,
        isValid,
        errorMessages,
        handleChangeInput,
        setErrorMessages,
        handleChangeForm,
        setValues,
        setValid,
    };
}
