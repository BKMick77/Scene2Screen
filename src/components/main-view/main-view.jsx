import "./movie-view.scss";
import { useEffect, useState } from 'react'
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';

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

    setIsLoading(true);

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

  if (!user) {
    return (
      <>
        login
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or sign up for an account
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </>
    );
  }


  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
