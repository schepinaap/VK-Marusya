import { userLogout } from "../../../api/user";
import "./profile.css"
import mail from "../../../assets/mail.svg";
import { Link } from "react-router-dom";

type TUserSet = {
    name: string,
    surname: string,
    email: string,
    userPic: string
}

function Settings({name, surname, email, userPic}: TUserSet) {

  return (
    <div className="settings">
      <div className="profile__section">
        <div className="profile__left">
            {userPic}
        </div>
        <div className="profile__right">
            <span className="profile__label">Имя Фамилия</span>
        <span className="profile__data">{name} {surname}</span> 
        </div>
       
      </div>

      <div className="profile__section">
      <div className="profile__left profile__left--svg">
           <img className="profile__img" src={mail} width={24} height={24}/>
        </div>
        <div className="profile__right">
        <span className="profile__label">Электронная почта</span>
        <span className="profile__data">{email}</span>
        </div>
      </div>

      <Link to={"/"} onClick={userLogout} className="profile__button">Выйти из аккаунта</Link>
    </div>
  );
}

export default Settings;
