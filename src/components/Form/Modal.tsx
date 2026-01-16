import logoMini from "../../assets/logoMini.svg";
import close from "../../assets/close.svg";

interface ModalProps {
  handleModalClose: ()=> void,
  handleLoginOpen: ()=> void
}

function Modal({handleModalClose, handleLoginOpen }: ModalProps) {


  return (
    <div className="form-area">
    <div className="auth-form">
      <div className="auth-form__wrapper">
           <img src={logoMini} className="aurh-form__logo" alt="logo" />
           <p className="auth-form__title">
            Регистрация завершена
          </p>
          <p className="auth-form__text">
          Используйте вашу электронную почту для входа
          </p>
      <div className="auth-form__buttons">
        <button className="auth-form__button auth-form__button--extra" onClick={handleLoginOpen}>
          Войти
        </button>
      </div>
      </div>
     
    </div>
    <button className="auth-form__button-close" onClick={handleModalClose}>
      <img src={close} alt="Закрыть"></img>
    </button>
  </div>
  );
}

export default Modal;
