
import "./trailerButton.css"

interface TrailerButtonProps {
  handleOpenTrailer: ()=> void;
}

function TrailerButton({handleOpenTrailer}:TrailerButtonProps) {

  return (
    <button onClick={handleOpenTrailer} className="trailer-btn">
    Трейлер
  </button>
  )
}

export default TrailerButton