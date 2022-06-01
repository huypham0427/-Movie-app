import React,{ useEffect, useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import { Button, Navbar, Container, Nav, FormControl, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ReactBootStrap from 'react-bootstrap';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Navigate } from 'react-router-dom';
import Home from './component/Home';

const API_URL="https://api.themoviedb.org/3/movie/now_playing?api_key=151f5123399aa60296034f5094c257e3&language=en-US&page=1&fbclid=IwAR07o-_oLvsPWeAJQ0VwYxI2kEAaTA2UPo2XNrBqucDNfCL5Au0RBXSF8nk";


function App() {

  const [movies, setMovies] = useState([]);
  //Create a query for search bar
  const [query, setQuery] = useState('');
  //Spinner loading API
  const [loading, setLoading] = useState(false);
  // Network Error
  const [error, setError] = useState(null);

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
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Movee</Navbar.Brand>
          <Navbar.Brand href="">Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
            <Navbar.Collapse id="nabarScroll">
              <Nav className="me-auto my-2 my-lg-3"
              style={{maxHeight:'100px'}}navbarScroll></Nav>

              {/* Search bar */}
              <Form className="d-flex" onSubmit={searchMovie}>
                <FormControl 
                type="search"
                placeholder="Search movies"
                className="me-2"
                aria-label="search"
                name=""
                value={query} onChange={changeHandler} ></FormControl>
                <Button variant="secondary" type="submit">Search</Button>
              </Form>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {error && <div>{error}</div>}
        {loading && <div className='d-flex justify-content-center'><ReactBootStrap.Spinner animation="border" variant='primary' /></div>}
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
    </>

  );
}


export default App;