import React from 'react';
import Header from "./Header";
import { useForm } from "../hooks/useForm";

function Login({ handleLogin, navigateTo }) {

  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    handleLogin(values)
    setValues({ email: '', password: '' });
  }

  return (
    <>
      <Header
        adress={'/singup'}
        buttonText={'Регистрация'}
      />
      <form className="form-auth" onSubmit={handleSubmit}>
        <h2 className="popup__title ">Вход</h2>
        <fieldset className="form-auth__info">
          <input
            value={values.email || ''}
            onChange={handleChange}
            className='form-auth__item'
            type="email"
            name="email"
            minLength="6"
            maxLength="40"
            placeholder='Email'
            required
          />
          <span id="heading-input-error" className="popup__error"></span>
          <input
            value={values.password || ''}
            onChange={handleChange}
            type="password"
            className='form-auth__item'
            name="password"
            minLength="3"
            maxLength="200"
            placeholder='Пароль'
            required
          />
          <span id="subheading-input-error" className="popup__error"></span>
        </fieldset>
        <button className="form-auth__button" type="submit" aria-label="Сохранить">
          Войти
        </button>
      </form>
    </>
  );
}

export default Login;
