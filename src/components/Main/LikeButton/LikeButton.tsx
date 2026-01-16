import { useEffect, useState } from "react";
import fav from "../../../assets/fav.svg";
import favoriteFill from "../../../assets/favoriteFill.svg";
import "./likeButton.css";
import { getFav, getUser, removeFromFav, addToFav } from "../../../api/user";
import type { IUser } from "types/user";
import type { TPoster } from "../Film/Film";

interface LikeButtonProps {
  id: string;
  handleLoginOpen: () => void
}

function LikeButton({ id, handleLoginOpen }: LikeButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getLikeStatus = async () => {
      const userData = await getUser();
      if ("email" in userData) {
        setUser(userData);
        const userLikedMovies: TPoster[] = await getFav();
        const checkLike = userLikedMovies.some(
          (likedMovie) => likedMovie.id === +id
        );
        console.log(userLikedMovies);
        setIsFavorite(checkLike);
      }
    };
    getLikeStatus();
  }, [id]);

  const toggleLike = async () => {
    if (isFavorite) {
      await removeFromFav(id);
      setIsFavorite(false);
    } else {
      await addToFav(id);
      setIsFavorite(true);
    }
  };

  const handleClick = () => {
    if (user) {
      toggleLike();
    } else {
      handleLoginOpen();
    }
  };

  return (
    <button className="like-btn" onClick={handleClick}>
      {isFavorite ? (
        <img src={favoriteFill} className="like-btn__img" alt="В избранном" />
      ) : (
        <img src={fav} className="like-btn__img" alt="В избранное" />
      )}
    </button>
  );
}

export default LikeButton;
