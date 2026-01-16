import { useForm } from "react-hook-form";
import { userLogin } from "../../api/user";
import close from "../../assets/close.svg";
import logoMini from "../../assets/logoMini.svg";
import "./form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemaLogin";

export type AuthFormProps = {
  handleLoginClose: () => void;
  handleRegisterOpen: () => void;
};

interface ILoginData {
  email: string;
  password: string;
}

function LoginForm({ handleLoginClose, handleRegisterOpen }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ILoginData) => { 
    console.log("Данные формы:", data);
    userLogin({
      email: data.email,
      password: data.password,
    })
      .then(() => {
        handleLoginClose && handleLoginClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Ошибка регистрации:", error);
      });
  };

  return (
    <div className="form-area">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form__wrapper">
          <img src={logoMini} className="aurh-form__logo" alt="logo" />
          <div className="auth-form__fields">
            <input
              type="email"
              autoComplete="off"
              className={`login-form__input login-form__input--email ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="Электронная почта"
              {...register("email")}
            />
            <input
              type="password"
              autoComplete="off"
              className={`login-form__input login-form__input--password ${
                errors.password ? "input-error" : ""
              }`}
              placeholder="Пароль"
              {...register("password")}
            />
          </div>
          <div className="auth-form__buttons">
            <button
              type="submit"
              className="auth-form__button auth-form__button--extra"
            >
              Войти
            </button>
            <button
              type="button"
              className="auth-form__button"
              onClick={handleRegisterOpen}
            >
              Регистрация
            </button>
          </div>
        </div>
      </form>
      <button className="auth-form__button-close" onClick={handleLoginClose}>
        <img
          className="auth-form__button-close-img"
          src={close}
          alt="Закрыть"
        ></img>
      </button>
    </div>
  );
}

export default LoginForm;
