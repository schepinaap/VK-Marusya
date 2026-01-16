import { useEffect, useState } from "react";
import star from "../../../assets/star.svg";
import refresh from "../../../assets/refresh.svg";
import "./RandomFilmCard.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton"
import TrailerButton from "../TrailerButton/TrailerButton";
import TrailerModal from "../TrailerModal/TrailerModal";
import cinema from "../../../assets/cinema.avif"

export interface IFilm {
  id: number;
  tmdbRating: number;
  releaseYear: number;
  genres: string[];
  runtime: number;
  title: string;
  plot: string;
  backdropUrl: string;
}

interface RandomFilmProps {
  handleLoginOpen: () => void;
}

function RandomFilm({handleLoginOpen}:RandomFilmProps) {
  const [film, setFilm] = useState<IFilm | null>(null);
  const [currentRatingType, setCurrentRatingType] = useState(
    "film-details__rating--default"
  );
  const [isClicked, setIsClicked] = useState(false);

  const [openTrailer, setOpenTrailer] = useState(false);


  const handleClick = () => {
    setIsClicked(true);
  }

  const handleOpenTrailer = () => {
    setOpenTrailer(true)
  }

  const handleCloseTrailer = () => {
    setOpenTrailer(false)
  }

  useEffect(() => {
    fetch("https://cinemaguide.skillbox.cc/movie/random")
      .then((response) => response.json())
      .then((data) => {
        if (!film) {
          setFilm(data);
        }
      });
  }, []);

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

  const handleRefresh = () => {
    fetch("https://cinemaguide.skillbox.cc/movie/random")
      .then((response) => response.json())
      .then((data) => setFilm(data));
  };


  if (!film) {
    return <div>Загрузка...</div>;
  }

  console.log(film);

  return (
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
          <li className="film-details__item">{film.genres.join(", ")}</li>
          <li className="film-details__item">{film.runtime} мин</li>
        </ul>
        <h2 className="film-card__title">{film.title}</h2>
        <p className="film-card__description">{film.plot}</p>
        <div className="film-card__buttons film-card__buttons--random ">
          <div className="film-card__buttons-top">
                <TrailerButton handleOpenTrailer={handleOpenTrailer}/>
         {openTrailer && <TrailerModal handleCloseTrailer={handleCloseTrailer}/>}
          </div>
          <div className="film-card__buttons-down">
          <Link to={`/movie/${film.id}`} className={`film-card__btn ${isClicked ? 'film-card__btn--clicked' : ''}`}  onClick={handleClick}>
            {" "}
            О фильме{" "}
          </Link>
          <LikeButton id={String(film.id)} handleLoginOpen={handleLoginOpen}/>
          <button
            className="film-card__btn film-card__btn--small"
            onClick={handleRefresh}
          >
            <img src={refresh} className="film-card__btn-img" alt="Обновить" />
          </button>
          </div>
        </div>
      </div>
      <div className="film-card__right">
        <img src={film.backdropUrl ? film.backdropUrl : cinema} className="film-card__poster" alt="Постер" />
      </div>
    </div>
  );
}

export default RandomFilm;
