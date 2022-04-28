import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { FaRegThumbsUp } from 'react-icons/fa';

function Detail(){
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState([]);
    const { id }= useParams();
    const getMovieDetails = async() => {
        const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        console.log(json.data.movie);
        setDetails(json.data.movie);
        setLoading(false);
    }
    useEffect(()=> {
        getMovieDetails();
    }, [])
    console.log(id);
    return (
        <div>
            {loading ? <h1>Loading...</h1> : 
            <div>
                <img src = {details.medium_cover_image}></img>
                <h2>{details.title}</h2>
                <p>{details.year}</p>
                <p><FaRegThumbsUp/></p>
                <p>{details.rating}</p>
                <p>{details.like_count}</p>
                <p>{details.description_full}</p>
            </div>
            }
        </div>

    );
}
export default Detail;