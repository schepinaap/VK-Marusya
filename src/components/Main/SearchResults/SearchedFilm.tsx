import { useEffect, useState } from "react";
import star from "../../../assets/star.svg";
import "./searched-film.css";

export type TResult = {
  id?: number;
  tmdbRating: number;
  releaseYear: number;
  genres: string[];
  runtime: number;
  title: string;
  posterUrl: string;
};

function SearchedFilm({
  tmdbRating,
  releaseYear,
  genres,
  runtime,
  title,
  posterUrl,
}: TResult) {
  const [currentRatingType, setCurrentRatingType] = useState(
    "searched-film__rating--default"
  );

  useEffect(() => {
    if (tmdbRating < 5) {
      setCurrentRatingType("searched-film__rating--red");
    } else if (tmdbRating >= 6 && tmdbRating < 7) {
      setCurrentRatingType("searched-film__rating--grey");
    } else if (tmdbRating >= 7 && tmdbRating < 8) {
      setCurrentRatingType("searched-film__rating--green");
    }
  }, []);

  return (
    <>
   
    <div className="searched-film searched-film--desktop">
      <div className="searched-film__left">
        <img src={posterUrl} className="searched-film__poster" alt="Постер" />
      </div>
      <div className="searched-film__right">
        <div className="searched-film__details">
          <span className={`searched-film__rating ${currentRatingType}`}>
            <img src={star} width={10} height={10} />
            {Math.trunc(tmdbRating)}
          </span>
          <span className="searched-film__item">{releaseYear}</span>
          <span className="searched-film__item">{genres.join(", ")}</span>
          <span className="searched-film__item">{runtime} мин</span>
        </div>
        <h3 className="searched-film__title">{title}</h3>
      </div>
    </div> 
    <div className="searched-film searched-film--mobile">
      <div className="searched-film__top">
        <img src={posterUrl} className="searched-film__poster" alt="Постер" />
      </div>
      <div className="searched-film__down">
        <div className="searched-film__details">
          <span className={`searched-film__rating ${currentRatingType}`}>
            <img src={star} width={10} height={10} />
            {Math.trunc(tmdbRating)}
          </span>
          <span className="searched-film__item">{releaseYear}</span>
          <span className="searched-film__item">{genres.join(", ")}</span>
        </div>
        <span className="searched-film__item">{runtime} мин</span>
        <h3 className="searched-film__title">{title}</h3>
      </div>
    </div> 
    </>
  );
}

export default SearchedFilm;
