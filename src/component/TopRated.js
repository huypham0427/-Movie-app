import React, { useEffect, useState } from 'react';
import MovieBox from '../MovieBox';
import { Button, Navbar, Container, Nav, FormControl, Form } from 'react-bootstrap'

const API_URL="https://api.themoviedb.org/3/trending/all/day?api_key=151f5123399aa60296034f5094c257e3";

function TopRated() {
  const [movies, setMovies] = useState([]);
  // Network Error
  const [error, setError] = useState(null);
  // Create a query for search bar
  const [query, setQuery] = useState('');
  // Spinner loading API
  const [loading, setLoading] = useState(false);

  //Fetch API
  let response;
  useEffect(() => {
    response = fetch(API_URL)
    .then((res) => {
     if(res.ok) return res.json()
     else throw Error('Network Error');
    })
    .then(data =>{
      console.log(data)
      setMovies(data.results);
    })
    .catch(err => {
      if(!response.ok){
        setError(err.message);
      }
      
    })
  }, [])

    // Asynchronous call for Search function
    const searchMovie = async(e)=>{
      e.preventDefault();
      console.log("Searching");
      setLoading(true);
      try{
        const url =`https://api.themoviedb.org/3/search/movie?api_key=151f5123399aa60296034f5094c257e3&query=${query}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setMovies(data.results); 
        setLoading(false);
      }
      catch(e){
        console.log(e);
      }
    }
  
    const changeHandler=(e)=>{
      setQuery(e.target.value);
    }

  return (
    <div>
      <div>
        {movies.length > 0 ?(
        <div className="container">
          <div className="grid">
            {movies.map((movieReq)=>
            <MovieBox key={movieReq.id} {...movieReq}/>)}
          </div>
        </div>
        ):(
          <h2>No Movies Found</h2>
        )}
      </div>
    </div>
  )
}

export default TopRated;
