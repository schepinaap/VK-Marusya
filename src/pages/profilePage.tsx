import { useEffect, useState } from "react";
import "../components/Main/Profile/profile.css";
import Favorites from "../components/Main/Profile/Favorites";
import Settings from "../components/Main/Profile/Settings";
import { getUser, type TUser } from "../api/user";


const initialUser: TUser = {
  name: "",
  surname: "",
  email: "",
  favorites: [],
};

function ProfilePage() {
  const [user, setUser] = useState<TUser>(initialUser);
  const [currentTab, setCurrentTab] = useState('favorites');
  
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  const userPic = user.name[0] + user.surname[0];

  return (
    <div className="profile">
      <h2 className="profile__title">Мой аккаунт</h2>
      <div className="profile__options">
        <h3 className="profile__favoriets profile__favoriets--desktop" onClick={()=>setCurrentTab('favorites')}>Избранные фильмы</h3>
        <h3 className="profile__settings profile__settings--desktop" onClick={()=>setCurrentTab('settings')}>Настройка аккаунта</h3>    
        <h3 className="profile__favoriets profile__favoriets--mobile" onClick={()=>setCurrentTab('favorites')}>Избранное</h3>
        <h3 className="profile__settings profile__settings--mobile" onClick={()=>setCurrentTab('settings')}>Настройки</h3>
      </div>
      {currentTab === 'favorites' && <Favorites /> }
      {currentTab === 'settings' && <Settings name={user.name} surname={user.surname} email={user.email} userPic={userPic}/>}
    </div>
  );
}

export default ProfilePage;
