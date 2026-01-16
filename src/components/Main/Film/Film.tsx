import cinema from "../../../assets/cinema.avif"
import "./topFilm.css";

export type TPoster = {
  posterUrl: string;
  id?: number;
};

function Film({ posterUrl }: TPoster) {
  return (
    <div className="top-film-card">
      <img src={posterUrl ? posterUrl : cinema} className="top-film-card__poster" alt="Постер" />
    </div>
  );
}

export default Film;
