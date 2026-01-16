import { useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import "./search.css";
import SearchedFilmList from "../../components/Main/SearchResults/SearchedFilmList";


interface SearchProps {
  handleMobileSearch: () => void;
}

function Search({handleMobileSearch}:SearchProps) {

  const [resultsOpen, setResultsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleResultsOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      setResultsOpen(true);
    } else {
      setResultsOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('')
    setResultsOpen(false)
  }

  return (
    <>
      <div className="search-string">
        <img src={searchIcon} className="search-string__img" alt="search" />
        <input
          className="search-string__field"
          type="text"
          name="search"
          value={searchValue}
          placeholder="Поиск"
          onChange={handleResultsOpen}
        />
      </div>

      {resultsOpen && <SearchedFilmList searchValue={searchValue} handleClearSearch={handleClearSearch} handleMobileSearch={handleMobileSearch}/>}
    </>
  );
}

export default Search;
