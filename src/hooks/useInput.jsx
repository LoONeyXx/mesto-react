import React from 'react';

export function useInput(initialValues) {
    const [values, setValues] = React.useState(initialValues);

    function handleChangeInput(e) {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return { values, setValues, handleChangeInput };
}
