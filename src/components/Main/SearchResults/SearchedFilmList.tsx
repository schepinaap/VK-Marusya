import { useEffect, useState } from "react";
import type { TResult } from "./SearchedFilm";
import SearchedFilm from "./SearchedFilm";
import { useNavigate } from "react-router-dom";
import "./searched-film.css"

interface SearchedFilmListProps {
  searchValue: string,
  handleClearSearch: ()=> void,
  handleMobileSearch: ()=> void
}

function SearchedFilmList({searchValue, handleClearSearch, handleMobileSearch}:SearchedFilmListProps) {
  const [results, setResults] = useState<TResult[]>([]);
  const navigate = useNavigate()

  const handleOpenMovie = (id: number | undefined) => {
    navigate(`/movie/${id}`)
    handleClearSearch();
    handleMobileSearch && handleMobileSearch();
  }

  useEffect(() => {
    if (searchValue) {
    fetch(`https://cinemaguide.skillbox.cc/movie?title=${searchValue}&count=5`)
      .then((response) => response.json())
      .then((data) => setResults(data)); 
    }
  }, [searchValue]);

  return (
    <div className="search-results">
      <ul className="search-list">
        {results.map((result) => (
          <li className="search-list__item" key={result.id} onClick={()=>handleOpenMovie(result.id)}>
              <SearchedFilm
                posterUrl={result.posterUrl}
                tmdbRating={Math.trunc(result.tmdbRating)}
                releaseYear={result.releaseYear}
                genres={result.genres}
                runtime={result.runtime}
                title={result.title}
              />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchedFilmList;
