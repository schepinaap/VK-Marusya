import { useEffect, useState } from "react";
import type { IFilm } from "../RandomFilm/RandomFilm";
import star from "../../../assets/star.svg";
import "../RandomFilm/RandomFilmCard.css";
import { useParams } from "react-router-dom";
import "./movie.css";
import LikeButton from "../LikeButton/LikeButton";
import TrailerButton from "../TrailerButton/TrailerButton";
import TrailerModal from "../TrailerModal/TrailerModal";
import cinema from "../../../assets/cinema.avif"

export interface IFilmWithExtras extends IFilm {
  languages: string[];
  language: string;
  budget: string;
  revenue: string;
  director: string;
  production: string;
  awardsSummary: string;
}

interface MovieProps {
  handleLoginOpen: () => void;
}

function Movie({handleLoginOpen}:MovieProps) {
  const { id } = useParams();
  const [film, setFilm] = useState<IFilmWithExtras | null>(null);
  const [currentRatingType, setCurrentRatingType] = useState(
    "film-details__rating--default"
  );
  const [openTrailer, setOpenTrailer] = useState(false);

  const handleOpenTrailer = () => {
    setOpenTrailer(true)
  }

  const handleCloseTrailer = () => {
    setOpenTrailer(false)
  }

  useEffect(() => {
    fetch(`https://cinemaguide.skillbox.cc/movie/${id}`)
      .then((response) => response.json())
      .then((data) => setFilm(data));
  }, [id]);

  useEffect(() => {
    if (film) {
      console.log(film.tmdbRating)

      if (film.tmdbRating < 5) {
        setCurrentRatingType("film-details__rating--red");
      } else if (film.tmdbRating >= 6 && film.tmdbRating < 7) {
        setCurrentRatingType("film-details__rating--grey");
      } else if (film.tmdbRating >= 7 && film.tmdbRating < 8) {
        setCurrentRatingType("film-details__rating--green");
      }
    }
  }, [film]);

  if (!film) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="movie-page">
      <div className="film-card">
      <div className="film-card__right film-card__right--mobile">
        <img src={film.backdropUrl ? film.backdropUrl : cinema}  className="film-card__poster" alt="Постер" />
      </div>
        <div className="film-card__left">
          <ul className="film-details">
            <li className={`film-details__rating ${currentRatingType}`}>
              <img src={star} />
              {Math.trunc(film.tmdbRating)}
            </li>
            <li className="film-details__item">{film.releaseYear}</li>
            <li className="film-details__item">{film.genres?.join(", ")}</li>
            <li className="film-details__item">{film.runtime} мин</li>
          </ul>
          <h2 className="film-card__title">{film.title}</h2>
          <p className="film-card__description">{film.plot}</p>
          <div className="film-card__buttons movie-buttons">
          <TrailerButton handleOpenTrailer={handleOpenTrailer}/>
          {openTrailer && <TrailerModal handleCloseTrailer={handleCloseTrailer}/>}
       <LikeButton id={String(film.id)} handleLoginOpen={handleLoginOpen}/>
          </div>
        </div>
        <div className="film-card__right">
          <img
            src={film.backdropUrl ? film.backdropUrl : cinema} 
            className="film-card__poster"
            alt="Постер"
          />
        </div>
      </div>
      <div className="film-about">
        <h3 className="film-about__title">О фильме</h3>
        <ul className="film-about__list">
          {film?.language && (
            <li className="film-about__item">
              <span className="film-about__label">Язык оригинала </span>
              <span className="film-about__dots"></span>
              <span className="film-about__data">{film?.language}</span>
            </li>
          )}
          {film?.budget && (
            <li className="film-about__item">
              <span className="film-about__label">Бюджет</span>
              <span className="film-about__dots"></span>
              <span className="film-about__data">{film?.budget}</span>
            </li>
          )}
          {film?.revenue && (
            <li className="film-about__item">
              <span className="film-about__label">Выручка</span>
              <span className="film-about__dots"></span>
              <span className="film-about__data">{film?.revenue} </span>
            </li>
          )}
          {film?.director && (
            <li className="film-about__item">
              <span className="film-about__label">Режиссер</span>
              <span className="film-about__dots"></span>
              <span className="film-about__data">{film?.director}</span>{" "}
            </li>
          )}
          {film?.production && (
            <li className="film-about__item">
              <span className="film-about__label">Продакшн</span>
              <span className="film-about__dots"></span>
              <span className="film-about__data">{film?.production}</span>
            </li>
          )}
          {film?.awardsSummary && (
            <li className="film-about__item">
              <span className="film-about__label"> Награды</span>
              <span className="film-about__dots"></span>
              <span className="film-about__data">{film?.awardsSummary}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
