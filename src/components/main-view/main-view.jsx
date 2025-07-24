import { useEffect, useState } from 'react'
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import { NavbarView } from "../navbar-view/navbar-view.jsx"
import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://young-tor-59565-22774666cdbf.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((moviesFromApi) => {
        console.log("Fetched Movies:", moviesFromApi);
        setMovies(moviesFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
      });

  }, [token]);


  return (
    <>
      <NavbarView
        user={user}
        onHome={() => setSelectedMovie(null)}
        onLogout={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />


      <Row className='gx-0 justify-content-md-center'>
        {!user ? (

          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or sign up for an account
            <SignupView />
          </Col>

        ) : selectedMovie ? (
          <>
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
                style={{ width: "100px" }}
              >
                Logout
              </Button>
            </Col>
          </>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie._id} xs={8} md={6} lg={4} xl={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};
