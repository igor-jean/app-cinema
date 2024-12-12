import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Card = ({movie, genres}) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [displayNone, setDisplayNone] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoris")) || [];
        if (storedFavorites.includes(movie.id)) {
            setIsFavorite(true);
        }
    }, [movie.id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    };

    const addItem = (movieId) => {
        let stockStorage = JSON.parse(localStorage.getItem("favoris")) || []
        if(!stockStorage.includes(movieId)) {
            stockStorage.push(movieId)
            localStorage.setItem("favoris", JSON.stringify(stockStorage))
            setIsFavorite(true)
        } 
    }

    const removeItem = (movieId) => {
        let stockStorage = JSON.parse(localStorage.getItem("favoris")) || []
        stockStorage = stockStorage.filter(id => id !== movieId)
        localStorage.setItem("favoris", JSON.stringify(stockStorage))
        setIsFavorite(false)
    }

    const toggleFavori = () => {
        if (isFavorite) {
            removeItem(movie.id);
        } else {
            addItem(movie.id);
        }
    }

    const removeCard = () => {
        setDisplayNone(true)
        removeItem(movie.id);
    }

    return (
        <div className='card' style={{display: displayNone ? "none" : null}}>
            <div className="img">
                <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} alt="" />
            </div>
            <h2>{movie.title}</h2>
            <div className='date-sortie'>Sorti le : {formatDate(movie.release_date)} </div>
            <div className="note">
                <span>{Math.floor(movie.vote_average * 10) / 10 + " / 10"} <i className="fa-solid fa-star"></i></span>
            </div>
            <div className="genres">
                {movie.genre_ids && movie.genre_ids.map((genreId) => {
                    const genreObj = genres.find((genre) => genre.id === genreId);
                    return genreObj ? <span key={genreId}>{genreObj.name}</span> : null;
                })}
            </div>
            <h3>Synopsis</h3>
            <p>{movie.overview}</p>
            <div className="favoris">
                {location.pathname === "/favoris" ? (
                    <span onClick={removeCard}>
                        <i className="fa-solid fa-heart-broken"></i>
                    </span>
                ) : (
                    <span onClick={toggleFavori}>
                        {isFavorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;