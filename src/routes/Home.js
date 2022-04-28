import { useEffect, useState } from "react";
import Movie from "../components/Movie"; // 가장 바깥으로 뒤로가기 한 다음에 component 찾아야 해서 .. 붙어야 함!
import "../components/Home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]); // 아무것도 없는 상태를 막기 위해서 []을 활용
  const getMovies = async() => {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year");
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(()=> {
    getMovies();
  },[]) // 1번만 시행하려고 [] 사용
  console.log(movies);

  return (
    <div>
      <div class="main-title">NANA Movie Top 20</div>
      <div>{loading ? <div class="title">loading...</div> : 
      <div>
        <div class="main">
          {movies.map(movie => 
          <Movie 
          key={movie.id} // 이건 map 때문에 한거지 Movie 함수에 들어가있지 않음!
          id={movie.id}
          medium_cover_image={movie.medium_cover_image}
          title={movie.title}
          year = {movie.year}
          rating={movie.rating}
          genres={movie.genres}
          />)}
        </div> 
      </div> }
      </div>
    </div>
  );
}

export default Home;
