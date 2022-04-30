import { useEffect, useState } from "react";
import Movie from "../components/Movie"; // 가장 바깥으로 뒤로가기 한 다음에 component 찾아야 해서 .. 붙어야 함!
import "../components/Home.css";
import { FaSearch, FaBell, FaPlay, FaInfoCircle } from 'react-icons/fa';

function Home() {
  const API_KEY = "6be4e7cd599507ab6b764f0bfe5b22b7";
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]); // 아무것도 없는 상태를 막기 위해서 []을 활용
  const [topMovies, setTopMovies] = useState([]); 
  const [actionMovies, setActionMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [aniMovies, setAniMovies] = useState([]);
  const [loveMovies, setLoveMovies] = useState([]);
  const [misteryMovies, setMisteryMovies] = useState([]);

  const getMovies = async(popular, setMovies, page) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${popular}?api_key=${API_KEY}&language=ko-KR&page=${page}`);
    const json = await response.json();
    setMovies(json.results);
    setLoading(false);
  }
  const getGenreMovies = async(genres, setMovies) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&with_genres=${genres}&include_video=true`);
    const json = await response.json();
    setMovies(json.results);
    setLoading(false);
  }
  useEffect(()=> {
    getMovies("popular", setMovies, "1");
    getMovies("top_rated", setTopMovies, "1");
    getGenreMovies("28", setActionMovies);
    getGenreMovies("10751", setFamilyMovies);
    getGenreMovies("80", setCrimeMovies);
    getGenreMovies("16", setAniMovies);
    getGenreMovies("10749", setLoveMovies);
    getGenreMovies("9648", setMisteryMovies);
  },[]) // 1번만 시행하려고 [] 사용
  // console.log(movies);
  // console.log(TopMovies);

  const moveToTop = () => {window.scrollTo({ top: 0, behavior: "smooth" });} // 천천히 올라가는게 smooth! 

  return (
    <div>
      <header>
      <div class="logo" onClick={moveToTop}>NaFlix</div>
      <nav class="nav">
        <span>홈</span>
        <span>TV프로그램</span>
        <span>영화</span>
        <span>내가 찜한 콘텐츠</span>
      </nav>
      <nav class="sub-nav">
        <FaSearch class="icon" />
        <FaBell class="icon" />
      </nav>
      </header>
      <div>{loading ? <div class="title">loading...</div> : 
      <div>
        <div class="video-box">
        <iframe
        class="video opacity"
        src={`https://www.youtube.com/embed/2vWo-TZHXFc?autoplay=1&mute=1&loop=1&modestbranding=1&playlist=2vWo-TZHXFc&controls=0`}
        frameBorder="0"
        allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        />
          <div class="video-text">
            <div>스파이더맨: 노 웨이 홈</div>
            <div class="overview">
            ‘미스테리오’의 계략으로 세상에 정체가 탄로난 스파이더맨 ‘피터 파커’는 하루 아침에 평범한 일상을 잃게 된다. 문제를 해결하기 위해 ‘닥터 스트레인지’를 찾아가 도움을 청하지만 뜻하지 않게 멀티버스가 열리면서 ... 더보기
            </div>
            <div class="flex">
              <div class="button white"><FaPlay />  재생</div>
              <div class="button gray"><FaInfoCircle />  상세정보</div>
            </div>
          </div>
        </div>
      <div class="hole"> 
        <div>
          <div class="sub-title">지금 뜨는 콘텐츠</div>
          <div class="wrap-main">
          <div class="main">
            {movies.map(movie =>
                <Movie 
                key={movie.id} // 이건 map 때문에 한거지 Movie 함수에 들어가있지 않음!
                id={movie.id}
                poster_path={movie.poster_path}
                />
            )}
          </div>
          </div>
        </div>
        <div>
          <div class="sub-title">오늘 TMDB의 TOP 10 시리즈</div>
          <div class="wrap-main">
          <div class="main">
            {topMovies.slice(0,10).map(movie => 
            <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path}/>)}
          </div>
          </div>
        </div>
        <div>
          <div class="sub-title">설렘주의 로맨스</div>
          <div class="wrap-main">
          <div class="main">
            {loveMovies.map(movie => 
            <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path}/>)}
          </div>
          </div>
        </div>
        <div>
          <div class="sub-title">애니</div>
          <div class="wrap-main">
          <div class="main">
            {aniMovies.map(movie => 
            <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path}/>)}
          </div>
          </div>
        </div>
        <div>
          <div class="sub-title">가족 코미디</div>
          <div class="wrap-main">
          <div class="main">
            {familyMovies.map(movie => 
            <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path}/>)}
          </div>
          </div>
        </div>
        <div>
          <div class="sub-title">액션</div>
          <div class="wrap-main">
          <div class="main">
            {actionMovies.map(movie => 
            <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path}/>)}
          </div>
          </div>
        </div>
        <div>
          <div class="sub-title">범죄 스릴러</div>
          <div class="wrap-main">
          <div class="main">
            {crimeMovies.map(movie => 
            <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path}/>)}
          </div>
          </div>
        </div>
        <div>
          <div class="sub-title">미스테리</div>
          <div class="wrap-main">
          <div class="main">
            {misteryMovies.map(movie => 
            <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path}/>)}
          </div>
          </div>
        </div>
      </div>
      </div> }
      </div>
    </div>
  );
}

export default Home;
