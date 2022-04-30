import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Movie from "../components/Movie"; // 가장 바깥으로 뒤로가기 한 다음에 component 찾아야 해서 .. 붙어야 함!
import "../components/Detail.css";
import { FaArrowLeft, FaSearch, FaChromecast, FaPlay, FaArrowDown, FaPlus, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa';
import { Link } from "react-router-dom"; 

function Detail(){
    const API_KEY = "6be4e7cd599507ab6b764f0bfe5b22b7";
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState([]);
    const [video, setVideo] = useState("");
    const [similars, setSimilars] = useState([]);
    const { id }= useParams();
    const getMovieDetails = async() => {
        const json = await(await fetch(`https://api.themoviedb.org/3/movie/${id}${video}?api_key=${API_KEY}&language=ko-KR`)).json();
        setDetails(json);
        setLoading(false);
    }
    const getSimilarDetails = async(similar, setSimilars) => {
        const json = await(await fetch(`https://api.themoviedb.org/3/movie/${id}/${similar}?api_key=${API_KEY}&language=ko-KR`)).json();
        console.log(json.results);
        setSimilars(json.results);
        setLoading(false);
    }
    useEffect(()=> {
        getMovieDetails();
        getSimilarDetails("videos",setVideo);
        getSimilarDetails("similar", setSimilars);
    }, [id]) // id가 변할 때마다 다시 불러조~ 이말임
    return (
        <div class="detail">
            {loading ? <h1>Loading...</h1> : 
            <div>
                <header>
                    <Link to={"/2022_NaFlix"}>                    
                    <FaArrowLeft class="icon"/>
                    </Link>
                    <div>
                      <FaChromecast class="icon"/>
                      <FaSearch class="icon"/>
                    </div>
                </header>
                <div class="video-box">
                <iframe
                class="video"
                src={`https://www.youtube.com/embed/${video[0].key}?autoplay=1&mute=1&loop=1&modestbranding=1&playlist=${video[0].key}&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
                </div>
                <div class="title">{details.title}</div>
                <span>{details.release_date.slice(0,4)}년</span>
                <span>{details.runtime}분</span>
                <div class="d-button white"><FaPlay /> 재생</div>
                <div class="d-button gray"><FaArrowDown /> 저장</div>
                <div class="d-overview">{details.overview}</div>
                <div>
                <div class="d-sub flex">
                   <div>
                      <FaPlus class="title" />
                      <div>내가 찜한 콘텐츠</div>
                   </div>
                   <div>
                      <FaRegThumbsUp class="title" />
                      <div>평가</div>
                   </div>
                   <div>
                      <FaShareAlt class="title" />
                      <div>공유</div>
                   </div>
                </div>
                  <div class="sub-title">비슷한 콘텐츠</div>
                  <div class="d-main">
                  {similars.slice(0,12).map(similar => 
                  <Movie 
                  key={similar.id} // 이건 map 때문에 한거지 Movie 함수에 들어가있지 않음!
                  id={similar.id}
                  poster_path={similar.poster_path}
                  />)}
                  </div>
                </div>
            </div>
            }
        </div>

    );
}
export default Detail;