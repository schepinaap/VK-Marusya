import { useEffect, useState } from "react";
import type { TPoster } from "../Film/Film";
import Film from "../Film/Film";
import { Link } from "react-router-dom";
import { getFav, removeFromFav } from "../../../api/user";
import close from "../../../assets/close.svg";


function Favorites() {
  const [fav, setFav] = useState<TPoster[]>([]);


  useEffect(() => {
    getFav().then((data) => setFav(data));
  }, []);

  const deleteFromFav = async (filmId:number | undefined) => {
     await removeFromFav(String(filmId));
     setFav(fav.filter(el => el.id !== filmId))
  };

  return (
    <div className="favorites">
      <ul className="favorites-list">
        {fav.map((fav) => (
          <li className="favorites-list__item" key={fav.id}>
            <button className="favorites-list__item-delete" onClick={()=> deleteFromFav(fav.id)}>
              <img src={close} alt="Удалить" />
            </button>
            <Link to={`/movie/${fav.id}`}>
              {" "}
              <Film posterUrl={fav.posterUrl} />
            </Link>
          </li>
        ))}
      </ul>
      {fav.length === 0 && <div>В избранном пока ничего нет</div>}
    </div>
  );
}

export default Favorites;
