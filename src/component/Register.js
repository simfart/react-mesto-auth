import React from 'react';
import Header from "./Header";

function Register(isOpen) {
  return (
    <>
      <Header />
      <form className="form-auth">
        <h2 className="popup__title ">Регистрация</h2>
        <fieldset className="form-auth__info">
          <input
            // value={values.name || ''}
            // onChange={handleChange}
            className='form-auth__item'
            type="email"
            name="name"
            minLength="2"
            maxLength="40"
            placeholder='Email'
            required
          />
          <span id="heading-input-error" className="popup__error"></span>
          <input
            // value={values.about || ''}
            // onChange={handleChange}
            type="password"
            className='form-auth__item'
            name="about"
            minLength="2"
            maxLength="200"
            placeholder='Пароль'
            required
          />
          <span id="subheading-input-error" className="popup__error"></span>
        </fieldset>
        <button className="form-auth__button" type="submit" aria-label="Сохранить">
          Зарегистрироваться
        </button>
        <span className="form-auth__link">Уже зарегистрированы? Войти</span>
      </form>
    </>
  );
}

export default Register;
