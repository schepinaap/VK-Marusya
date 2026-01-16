import "./header.css";
import logo from "../../assets/logo.svg";
import genres from "../../assets/genres.svg";
import searchIcon from "../../assets/searchIcon.svg";
import user2 from "../../assets/user2.svg";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "../Form/form.css";
import { getUser } from "../../api/user";
import ModalSearch from "./ModalSearch";


interface HeaderProps {
  handleLoginOpen: () => void
}

function Header({ handleLoginOpen }: HeaderProps) {
  const [username, setUsername] = useState("");
  const [searchModal, setSearchModal] = useState(false);

  const handleMobileSearch = () => {
    setSearchModal(!searchModal);
  }

  useEffect(() => {
    getUser().then((data) => setUsername(data.name));
  }, []);

  return (
    <>
      <div className="header">
        <div className="header__wrapper header__wrapper--desktop">
          <Link className="header__logo" to={"/"}>
            <img src={logo} className="header__logo-img" alt="logo" />
          </Link>
          <div className="header__options">
            <Link className="header__options-item" to={"/"}>
              Главная
            </Link>
            <Link className="header__options-item" to={"/genres"}>
              <span>Жанры </span>
            </Link>
            <Search handleMobileSearch={handleMobileSearch}/>
          </div>
          {username ? (
            <Link className="header__login" to="/profile">
              {username}
            </Link>
          ) : (
            <button
              className="header__login"
              type="button"
              onClick={handleLoginOpen}
            >
              <span>Войти</span>
            </button>
          )}
        </div>
        {searchModal ? <ModalSearch handleMobileSearch={handleMobileSearch} /> :
        <div className="header__wrapper header__wrapper--mobile">
          <Link className="header__logo" to={"/"}>
            <img src={logo} className="header__logo-img" alt="logo" />
          </Link>
          <div className="header__options">
            <Link className="header__options-item" to={"/genres"}>
              <img className="header__options-icon" src={genres} />
            </Link>
            <button className="header__options__btn" onClick={handleMobileSearch}>
              <img
                className="header__options-icon"
                src={searchIcon}
                alt="Поиск"
              />
            </button>
            {username ? (
              <Link to="/profile">
                <img
                  src={user2}
                  className="header__options-icon"
                  alt={username}
                />
              </Link>
            ) : (
              <button
                className="header__login"
                type="button"
                onClick={handleLoginOpen}
              >
                <img src={user2} className="header__options-icon" alt="Войти" />
              </button>
            )}
          </div>
        </div>}

        
        
      </div>
    </>
  );
}

export default Header;
