import { useForm } from "react-hook-form";
import { userRegister } from "../../api/user";
import close from "../../assets/close.svg";
import logoMini from "../../assets/logoMini.svg";
import "./form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemaRegister";

interface IFormData {
  email: string;
  name: string;
  lastname: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  handleRegisterClose: ()=> void,
  handleLoginOpen: ()=> void,
  handleModalOpen: ()=> void
}

function RegisterForm({
  handleRegisterClose,
  handleLoginOpen,
  handleModalOpen,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormData) => {
    userRegister({
      email: data.email,
      name: data.name,
      surname: data.lastname,
      password: data.password,
    })
      .then((object) => {
        if (object) {
          handleModalOpen && handleModalOpen();
        }
      })
      .catch((error) => {
        console.error("Ошибка регистрации:", error);
      });
    reset();
  };

  return (
    <>
      {" "}
      <div className="form-area">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__wrapper">
            <img src={logoMini} className="aurh-form__logo" alt="logo" />
            <p className="auth-form__title">Регистрация</p>
            <div className="auth-form__fields">
              <input
                type="text"
                autoComplete="off"
                className={`login-form__input login-form__input--email ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Электронная почта"
                {...register("email")}
              />
              {errors.email && <p className="form-error">{errors.email?.message}</p>}
              <input
                type="text"
                autoComplete="off"
                className={`login-form__input login-form__input--name ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Имя"
                {...register("name")}
              />
              {errors.name && <p className="form-error">{errors.name?.message}</p>}
              <input
                type="text"
                autoComplete="off"
                className={`login-form__input login-form__input--name ${
                  errors.lastname ? "input-error" : ""
                }`}
                placeholder="Фамилия"
                {...register("lastname")}
              />
              {errors.lastname && <p className="form-error">{errors.lastname?.message}</p>}
              <input
                type="password"
                autoComplete="off"
                className={`login-form__input login-form__input--password ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Пароль"
                {...register("password")}
              />
              {errors.password && <p className="form-error">{errors.password?.message}</p>}
              <input
                type="password"
                autoComplete="off"
                className={`login-form__input login-form__input--password ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
                placeholder="Подтвердите пароль"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword?.message}</p>}
            </div>
            <div className="auth-form__buttons">
              <button
                type="submit"
                className="auth-form__button auth-form__button--extra"
              >
                Создать аккаунт
              </button>
              <button
                type="button"
                className="auth-form__button"
                onClick={handleLoginOpen}
              >
                У меня есть пароль
              </button>
            </div>
          </div>
        </form>
        <button
          className="auth-form__button-close"
          onClick={handleRegisterClose}
        >
          <img src={close} alt="Закрыть"></img>
        </button>
      </div>
    </>
  );
}

export default RegisterForm;
