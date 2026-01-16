import { useEffect, useState } from "react";
import "./genresList.css";
import { Link } from "react-router-dom";

const pictures = {
  history: "https://www.kinonews.ru/insimgs/imgstyle4.webp",
  horror: "https://i.guim.co.uk/img/media/fd806ba9bf45eb5c0e87e3d4f9fa1582d62133c6/0_182_6000_3600/master/6000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=1cf9d2352fbb99989ee5d8af0f1e914e",
  scifi: 'https://opis-cdn.tinkoffjournal.ru/mercury/main-sci-fi-best-movies.ptqwbr77o9rp..jpg',
  standUp: 'https://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/444581/nnfRHPPzaHEu10Zs4lHQ.jpg',
  fantasy: 'https://lifehacker.ru/wp-content/uploads/2020/10/grimm_1604575963.jpg',
  drama: "https://s15.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2021/02/zov-predkov.jpg",
  mystery: "https://lifehacker.ru/wp-content/uploads/2019/11/films-mystical_1664991716.jpg",
  family: "https://248006.selcdn.ru/main/iblock/d4e/d4e784f3324387cc3b351bba288e0661/f715ea5fc63fea84977b1283ac835d0e.jpg",
  comedy: "https://blog.okko.tv/thumb/710x0/filters:quality(75)/imgs/2023/07/07/00/5990963/55b44601107a24d9128938083fd78482461703c8.jpeg",
  romance: "https://static.sobaka.ru/images/image/01/37/91/81/_normal.png?v=1612960380",
  music: "https://samesound.ru/wp-content/uploads/2017/10/31-movies-about-music-ray.jpg",
  crime: "https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZxiEQu1MkhUTra6lN542_-Bbd5yGNAikmrPHnPGr8nc0VKcTf77ps9b3Izy5OQagAoEGnFTGmVojk-m_BJS9G-CHVX1j2fqU8NS.jpg?r=8bc",
  tvMovie: "https://pic.rutubelist.ru/promoitem/2025-09-22/55/4a/554aff73cf047237dbce3adc37a069db.jpg?width=400",
  documentary: "https://img.freepik.com/free-photo/front-view-man-working-darkroom_23-2149893951.jpg?semt=ais_incoming&w=740&q=80",
  action: "https://assets-prd.ignimgs.com/2023/06/24/bestactionmovies-blogroll-1687567470634.jpg",
  thriller: "https://parade.com/.image/w_3840,q_auto:good,c_limit/MTkwNTgwOTI0NDgyMjAxNDY4/GetOut.jpg?arena_f_auto",
  western: "https://static0.srcdn.com/wordpress/wp-content/uploads/2023/12/classic-western-movies-everyone-watch-once.jpeg",
  animation: "https://deadline.com/wp-content/uploads/2025/03/The-Highest-Grossing-Animated-Films-at-The-Box-Office-Photo-Gallery.jpg",
  war: "https://www.hollywoodreporter.com/wp-content/uploads/2016/06/glory_1989_102-h_2016.jpg?w=1440&h=810&crop=1",
  adventure: "https://images.filmgrail.com/1726831559506?optimizer=image&width=1200"
} 

function GenresList() {
    const [genres, setGenres] = useState([]);
  
    useEffect(() => {
      fetch("https://cinemaguide.skillbox.cc/movie/genres")
        .then((response) => response.json())
        .then((genres) => setGenres(genres));
    }, []);
  
    console.log(genres);
    return (
      <div className="genres">
        <h2 className="genres__title">Жанры фильмов</h2>
        <ul className="genres-list">
          {genres.map((genre) => (
            <li className="genres-list__item" key={genre}> 
             <Link to={`/genre?q=${genre}`} className="genres-list__link">
              {genre in pictures && <img className="genres-list__img" src={pictures[genre]} alt={genre} />}
                <span className="genres-list__title">{genre}</span> 
           </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default GenresList;