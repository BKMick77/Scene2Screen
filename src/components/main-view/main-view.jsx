import { useEffect, useState } from 'react'
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import { NavbarView } from "../navbar-view/navbar-view.jsx"
import { Row, Col, Button, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from '../profile-view/profile-view.jsx';

export const MainView = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

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


  return (
    <>
      <BrowserRouter>

        <NavbarView
          user={user}
          onLogout={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />

        <Row className='gx-0 justify-content-md-center'>
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5} className='mt-4'>
                      <SignupView />
                    </Col>
                  )}
                </>

              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5} className='mt-4'>
                      <LoginView onLoggedIn={handleLogin} />                    </Col>
                  )}
                </>

              }
            />
            <Route
              path="/profile"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      setUser={setUser}
                      onLogout={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
                  </Col>
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        user={user}
                        token={token}
                        setUser={setUser}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : isLoading ? (
                    <Col>Loading movies...</Col>
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Container fluid className="mt-4 px-4">
                      <Row className="gx-4 gy-4 justify-content-md-center">
                        {movies.map((movie) => (
                          <Col className="mb-4" key={movie._id} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </>
  );
};




