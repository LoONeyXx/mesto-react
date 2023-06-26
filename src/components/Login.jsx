import React from 'react';
import Form from './FormAuth';

function Login({ onSubmit }) {
    return (
        <section className='login'>
            <h2 className='login__title'>Войти</h2>
            <Form
                name='login'
                submitText='Войти'
                onSubmit={onSubmit}
            />
        </section>
    );
}
export default Login;
