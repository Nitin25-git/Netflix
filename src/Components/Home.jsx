import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "fbe876b6e17fcf7249df7ab41059221b";
const url = "https://api.themoviedb.org/3/";
const imgurl = "https://image.tmdb.org/t/p/w500";

const upcoming = "upcoming";
const nowplaying = "now_playing";
const popular = "popular";
const toprated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) => (
          <Card key={index} img={`${imgurl}/${item.poster_path}`} />
        ))}
      </div>
    </div>
  );
};
const Home = () => {
  const [upcomingMovies, setupcoming] = useState([]);
  const [nowplayingmovies, setnowplayingmovies] = useState([]);
  const [popularmovies, setpopularmovies] = useState([]);
  const [topratedmovies, settopratedmovies] = useState([]);
  const [genre, setgenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setupcoming(results);
    };

    const fetchnowplaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowplaying}?api_key=${apiKey}`);
      setnowplayingmovies(results);
    };

    const fetchpopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setpopularmovies(results);
    };

    const fetchtoprated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${toprated}?api_key=${apiKey}`);
      console.log(results);
      settopratedmovies(results);
    };
    const getallgenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setgenre(genres);
    };

    fetchUpcoming();
    fetchnowplaying();
    fetchpopular();
    fetchtoprated();
    getallgenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularmovies[0]
            ? `url(${imgurl}/${popularmovies[0].poster_path})`
            : "$bg:rgb(2, 2, 2)",
        }}
      >
        {popularmovies[0] && <h1>{popularmovies[0].original_title}</h1>}
        {popularmovies[0] && <p>{popularmovies[0].overview}</p>}
        <div>
          <button>
            
            <BiPlay /> Play
          </button>
          <button>
            My List
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={"Upcoming "} arr={upcomingMovies} />
      <Row title={"Now playing "} arr={nowplayingmovies} />
      <Row title={"Popular "} arr={popularmovies} />
      <Row title={"Top Rated"} arr={topratedmovies} />

      <div className="genrebox">
        {genre.map((item, index) => (
          <Link key={index} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
