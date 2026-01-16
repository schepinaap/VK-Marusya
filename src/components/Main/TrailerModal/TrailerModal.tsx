import { YOUTUBE_URL } from "../../../api/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import close from "../../../assets/close.svg"
import "./trailerModal.css"

type TTrailer = {
  trailerYouTubeId: string;
  title: string;
};

interface TrailerModalProps {
  handleCloseTrailer: () => void;
}

function TrailerModal({handleCloseTrailer}:TrailerModalProps) {
  const { id } = useParams();
  const [film, setFilm] = useState<TTrailer | null>(null);

  useEffect(() => {
    fetch(`https://cinemaguide.skillbox.cc/movie/${id}`)
      .then((response) => response.json())
      .then((data) => setFilm(data));
  }, []);

  return (
    <div className="trailer">
      <iframe className="trailer__video"
        width="960"
        height="540"
        src={YOUTUBE_URL + `${film?.trailerYouTubeId}`}
        title={film?.title}
      />
       <button className="trailer__button-close" onClick={handleCloseTrailer}>
        <img src={close} alt="Закрыть"></img>
      </button>
    </div>
  );
}

export default TrailerModal;
