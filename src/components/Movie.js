import PropTypes from "prop-types"; // Movie가 받게 되는 값들이 어떤 형태여야 하는지 정해줌
import { Link } from "react-router-dom"; // Link : 해당 페이지로 갔을 때 전체 새로고침 방지!
import "../components/Home.css";
import { FaRegThumbsUp } from 'react-icons/fa';

function Movie ({id, medium_cover_image, title, year, genres, rating}){
    return (
      <div class="main-text">
        <Link to={`/movie/${id}`}>
          <img src={medium_cover_image} />
          <div class="title">{title} ({year})</div>
          <h2><FaRegThumbsUp /> {rating}</h2>
          <ul class="genre">
            {genres.map(genre => <li key={genre}># {genre}</li>)}
          </ul>
        </Link>
      </div>
    );
}

Movie.propTypes = {
    id : PropTypes.number.isRequired,
    medium_cover_image : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default Movie;