import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import Recherche from '../components/Recherche';
import axios from 'axios';

const Accueil = ({ genres, moviesData }) => {
    const [isSubmited, setIsSubmited] = useState(false);
    const [termMoviesData, setTermMoviesData] = useState([]);
    const [filterTopFlop, setFilterTopFlop] = useState("");

    const handleClearCards = () => {
        setIsSubmited(false);
        setTermMoviesData([]);
    };

    const displayCards = (data = moviesData) => {
        if (filterTopFlop === "") {
            return data
                .slice(0, 18)
                .map((movie) => (
                    <Card key={movie.id} genres={genres} movie={movie} />
                ));
        } else if (filterTopFlop === "top") {
            return data
                .filter(movie => movie.vote_average > 6)
                .slice(0, 18)
                .map((movie) => (
                    <Card key={movie.id} genres={genres} movie={movie} />
                ));
        } else if (filterTopFlop === "flop") {
            return data
                .filter(movie => movie.vote_average < 6)
                .slice(0, 18)
                .map((movie) => (
                    <Card key={movie.id} genres={genres} movie={movie} />
                ));
        }
    };

    const getMovies = (keyword) => {
        setIsSubmited(true);
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=d248ea3e1b2fdbc11aca176180e43de5&query=${keyword}&language=fr-FR`)
            .then((res) => {
                setTermMoviesData(res.data.results);
            });
    };

    const getFilter = (target) => {
        setFilterTopFlop(target);
    };

    return (
        <div>
            <Navigation />
            <Recherche onClearCards={handleClearCards} onSearchTerm={getMovies} onFilter={getFilter} />
            <div className="card-container">
                {displayCards(isSubmited ? termMoviesData : moviesData)}
            </div>
        </div>
    );
};

export default Accueil;
