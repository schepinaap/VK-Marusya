import RandomFilm from "../components/Main/RandomFilm/RandomFilm";
import TopFilmList from "../components/Main/TopFilmList/TopFilmList";
import "../App.css";

interface HomePageProps {
  handleLoginOpen: () => void;
}

function HomePage({ handleLoginOpen }: HomePageProps) {
  return (
    <div className="home-page">
      <RandomFilm handleLoginOpen={handleLoginOpen} />
      <TopFilmList />
    </div>
  );
}

export default HomePage;
