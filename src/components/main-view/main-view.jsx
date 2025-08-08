import { useEffect, useState } from 'react'
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { NavbarView } from "../navbar-view/navbar-view.jsx"
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from '../profile-view/profile-view.jsx';
import { LoginModal } from '../login-modal/login-modal.jsx';
import { SignupModal } from '../signup-modal/signup-modal.jsx';
import { UserInfoModal } from '../user-info-modal/user-info-modal.jsx';
import { UpdateUserModal } from '../update-user-modal/update-user-modal.jsx';
import { DeleteAccountModal } from '../delete-account-modal/delete-account-modal.jsx';
import { DirectorModal } from "../director-modal/director-modal.jsx"

export const MainView = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDirectorModal, setShowDirectorModal] = useState(false);

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

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    fetch(`https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          console.log("Account deleted");
          setUser(null);
          setToken(null);
          localStorage.clear();
        } else {
          console.error("Failed to delete account");
        }
      })
      .catch((error) => console.error("Delete error:", error));
  };

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
          onShowDeleteModal={() => setShowDeleteModal(true)}
          movies={movies}
        />

        <LoginModal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
          onSignupClick={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            setShowLoginModal(false);
          }}
        />

        <SignupModal
          show={showSignupModal}
          onHide={() => setShowSignupModal(false)}
          onLoginClick={() => {
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
          token={token}
          setUser={setUser}
        />

        <DeleteAccountModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setShowDeleteModal(false);
            handleDelete();
          }}
        />

        <DirectorModal
          show={showDirectorModal}
          onHide={() => setShowDirectorModal(false)}
        />





        <Routes>

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <div className="login-bg"></div>
              )
            }
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
                  <Col xs={12}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser}
                      onShowDirectorModal={() => setShowDirectorModal(true)}
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
                  <Container fluid className="mt-4 px-4" >
                    <Row className="gx-4 gy-4 justify-content-center">
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie._id} xs={12} sm={6} md={4} lg={3} >
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
      </BrowserRouter>
    </>
  );
};




