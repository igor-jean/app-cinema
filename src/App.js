import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './pages/Accueil';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coupdecoeur from './pages/Coupdecoeur';

function App() {
  const [genres, setGenres] = useState([])
  const [moviesData, setMoviesData] = useState([])

  useEffect(() => {
      axios
          .get("https://api.themoviedb.org/3/genre/movie/list?api_key=d248ea3e1b2fdbc11aca176180e43de5&language=fr-FR")
          .then((res)=> {
              setGenres(res.data.genres)
          })
  },[])

  useEffect(() => {
      axios
          .get("https://api.themoviedb.org/3/search/movie?api_key=d248ea3e1b2fdbc11aca176180e43de5&query=a&language=fr-FR")
          .then((res)=> {
            setMoviesData(res.data.results)
          })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil genres={genres} moviesData={moviesData}/>} />
        <Route path="/favoris" element={<Coupdecoeur genres={genres} />} />
        <Route path="*" element={<Accueil genres={genres} moviesData={moviesData}/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
