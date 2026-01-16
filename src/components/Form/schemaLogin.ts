import * as yup from "yup";

const regExpEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export const schema = yup.object().shape({
  email: yup.string().trim().required("Обязательное поле").matches(regExpEmail, 'Некорректный формат email'),
  password: yup
    .string()
    .trim()
    .required("Обязательное поле")
    .min(6, "Минимум 2 символа"),
});
