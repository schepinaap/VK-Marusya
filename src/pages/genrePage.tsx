import type { TPoster } from "components/Main/Film/Film";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Film from "../components/Main/Film/Film";
import navigate from "../assets/navigate.svg";

function GenrePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [films, setFilms] = useState<TPoster[]>([]);
  const PAGE_LIMIT = 10;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://cinemaguide.skillbox.cc/movie?genre=${query}&page=${page}&count=${PAGE_LIMIT}`
      );

      if (!response.ok) throw new Error("Ошибка загрузки");

      const data = await response.json();

      // Условие остановки: если массив data пустой или меньше лимита
      if (data.length === 0 || data.length < PAGE_LIMIT) {
        setHasMore(false);
        return;
      }

      setFilms((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetch(`https://cinemaguide.skillbox.cc/movie?genre=${query}`)
        .then((response) => response.json())
        .then((data) => setFilms(data));
    }
  }, [query]);

  if (!query) {
    return <Link to={"/genres"}>Вернитесь к выбору жанра</Link>;
  }

  return (
    <div className="genre-page">
      <div className="genres-navigate">
        <img src={navigate}/>
        <Link className="navigate-link" to={"/genres"}>{query}</Link> 
</div>
     
      <ul className="genre-films">
        {films?.map((film) => (
          <li className="top-list__item" key={film.id}>
            <Link to={`/movie/${film.id}`}>
              {" "}
              <Film posterUrl={film.posterUrl} />
            </Link>
          </li>
        ))}
      </ul>

      {error && <div className="error">{error}</div>}

      <button
        className="genres-button"
        onClick={loadMore}
        disabled={loading || !hasMore}
      >
        {loading ? "Загрузка..." : "Показать ещё"}
      </button>
    </div>
  );
}

export default GenrePage;
