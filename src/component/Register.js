import Header from "./Header";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";

function Register({ onAddAccount, login }) {
  const { values, handleChange, setValues } = useForm({});
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddAccount({
      email: values.email,
      password: values.password
    });
  }

  return (
    <>
      <Header
        adress={'/singin'}
        buttonText={'Войти'}
      />
      <form className="form-auth" onSubmit={handleSubmit}>
        <h2 className="popup__title ">Регистрация</h2>
        <fieldset className="form-auth__info">
          <input
            value={values.email || ''}
            onChange={handleChange}
            className="form-auth__item"
            type="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            required
          />
          <span id="heading-input-error" className="popup__error"></span>
          <input
            value={values.password || ""}
            onChange={handleChange}
            type="password"
            className="form-auth__item"
            name="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            required
          />
          <span id="subheading-input-error" className="popup__error"></span>
        </fieldset>
        <button
          className="form-auth__button"
          type="submit"
          aria-label="Сохранить"
        >
          Зарегистрироваться
        </button>
        <span className="form-auth__link">Уже зарегистрированы? <Link to="/singin" className="form-auth__sing-in">Войти</Link> </span>
      </form>
    </>
  );
}

export default Register;
