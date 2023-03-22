import React from 'react';
import union from '../images/Union.svg';
import unionred from '../images/Union-red.svg';

function InfoTooltip() {
  return (
    <div className='popup popup_opened' >
      <div className="popup__conteiner-open">
        <div className='popup_info'>
          <img className="header__logo" src={union} alt="Результат" />
          <span className="popup__title popup__title_info ">Вы успешно зарегистрировались! </span>
          <button className="popup__close" />
        </div>
        <button
          // onClick={onClose}
          className="popup__close"
          aria-label="Закрыть"
          type="button"
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
