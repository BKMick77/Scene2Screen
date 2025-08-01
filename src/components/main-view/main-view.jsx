import { useEffect, useState } from 'react'
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import { NavbarView } from "../navbar-view/navbar-view.jsx"
import { Row, Col, Button, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from '../profile-view/profile-view.jsx';
import { LoginModal } from '../../login-modal/login-modal.jsx';
import { SignupModal } from '../signup-modal/signup-modal.jsx';
import { UserInfoModal } from '../user-info-modal/user-info-modal.jsx';
import { UpdateUser } from '../profile-view/update-user.jsx';
import { UpdateUserModal } from '../update-user-modal/update-user-modal.jsx';

export const MainView = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

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

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [user]);


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
          onShowUserInfo={() => setShowUserInfoModal(true)}
          onShowUpdateUser={() => setShowUpdateUserModal(true)}
        />

        <LoginModal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
          onSignupClick={() => {
            console.log("Signup click fired");
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            setShowLoginModal(false);
            setShowLoginModal(true);
          }}
        />

        <SignupModal
          show={showSignupModal}
          onHide={() => setShowSignupModal(false)}
          onLoginClick={() => {
            console.log("Login click fired");
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
          onSignedUp={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            setShowSignupModal(false);
          }}
        />

        <UserInfoModal
          show={showUserInfoModal}
          onHide={() => setShowUserInfoModal(false)}
          user={user}
        />

        <UpdateUserModal
          show={showUpdateUserModal}
          onHide={() => setShowUpdateUserModal(false)}
          user={user}
        />

        <Row className='gx-0 justify-content-md-center'>

          <Routes>

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : null}
            />

            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : null}
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




