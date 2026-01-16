import { useEffect, useState } from "react";
import Film, { type TPoster } from "../Film/Film";
import "./topFilmList.css";
import { Link } from "react-router-dom";

function TopFilmList() {
  const [films, setFilms] = useState<TPoster[]>([]);

  useEffect(() => {
    fetch("https://cinemaguide.skillbox.cc/movie/top10")
      .then((response) => response.json())
      .then((films) => setFilms(films));
  }, []);

  return (
    <div className="top-films">
      <h2 className="top-films__title">Топ 10 фильмов</h2>
      <ul className="top-list">
        {films?.map((film, index) => (
          <li className="top-list__item" key={film.id}>
          <span className="top-list__number">{index + 1}</span>
           <Link to={`/movie/${film.id}`}> <Film posterUrl={film.posterUrl} /></Link> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopFilmList;
