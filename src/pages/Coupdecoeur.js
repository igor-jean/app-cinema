import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import axios from 'axios';

const Coupdecoeur = ({genres}) => {
    const [moviesData, setMoviesData] = useState([])

    useEffect(()=> {
        const displayCards = async () => {
            let moviesids= JSON.parse(localStorage.getItem("favoris")) || [];
    
            const request = moviesids.map((id)=>(axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d248ea3e1b2fdbc11aca176180e43de5`)))
    
            const responses = await Promise.all(request)
            const data = responses.map(response=>response.data)
            setMoviesData(data)
            return moviesData.map((movie)=> (
                <Card key={movie.id} genres={genres} movie={movie} />
            ))
    
        }
        displayCards()
    }, [])

    return (
        <div>
            <Navigation/>
            <div className="card-container">
                {moviesData.map((movie)=> (
                   <Card key={movie.id} genres={genres} movie={movie} /> 
                ))}
            </div>
        </div>
    );
};

export default Coupdecoeur;