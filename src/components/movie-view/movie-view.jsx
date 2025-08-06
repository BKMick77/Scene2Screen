import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SiAppletv, SiPrimevideo } from "react-icons/si";
import ReviewDrawer from "../review-drawer/review-drawer";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const handleToggleFavorites = () => {
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}/movies/${movie._id}`;


    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Favorite toggle failed");


        return fetch(`https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("User fetch failed");
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => {
        console.error("toggle error", err);
      });
  };
  if (!movie) {
    return <div>Movie not found</div>;
  }

  const [showReviews, setShowReviews] = useState(false);

  const handleOpenReviews = () => setShowReviews(true);
  const handleCloseReviews = () => setShowReviews(false);

  return (
    <div
      className="movie-view"
      style={{
        backgroundImage: `url(${movie.BackdropPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden'
      }}
    >
      <div
        className="movie-content"
        style={{
          maxWidth: '800px',
          width: '90%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          margin: '25px 0 0 25px',
          position: 'fixed',
          zIndex: 10,

        }}
      >
        <h1 className="mb-3">{movie?.Title}</h1>

        <h3 className="mb-3" style={{ maxWidth: '30ch' }}> {movie?.Description}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h5 className="text-muted">Director</h5> <h5>{movie.Director?.Name}</h5>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h5 className="text-muted" style={{ margin: 0 }}>{movie.Genre?.Name}</h5>
          <span className="fs-5 ml-3 text-muted">•</span>
          <h5 className="text-muted" style={{ margin: 0 }}>{movie?.ReleaseYear}</h5>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {movie.RottonTomatoes[0]?.Link && (
            <a
              href={movie.RottonTomatoes[0]?.Link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <img
                src="https://images.fandango.com/cms/assets/ae686540-7fff-11ef-8321-2b978811c524--certified-fresh-notext.svg"
                style={{ width: 28, height: 28 }}
                className="movie-icon"
              />
              <h5 className="text-muted mb-0">{movie.RottonTomatoes[0]?.Score}</h5>
            </a>
          )}

          <Button
            className="heart-icon"
            variant="light"
            onClick={handleToggleFavorites}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.75rem',
              color: isFavorite ? 'red' : 'red',
              padding: '5px',
              lineHeight: 1,
              marginLeft: '1.25rem'
            }}
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </Button>
        </div>


        {movie.WatchLinks && (
          <div className="mt-4">
            <h3 style={{ marginBottom: '0', lineHeight: 1 }}>Watch at home</h3>

            {movie.WatchLinks.AppleTV && (
              <a
                href={movie.WatchLinks.AppleTV}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginRight: '2rem'
                }}
              >
                <SiAppletv className="movie-icon" size={60} />
              </a>
            )}

            {movie.WatchLinks.AmazonPrime && (
              <a
                href={movie.WatchLinks.AmazonPrime}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                <SiPrimevideo className="movie-icon" size={80} />
              </a>
            )}
          </div>
        )}
        <Link to="/">
          <Button variant="outline-secondary"
            style={{
              color: "#fff",
              borderColor: '#fff',
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              zIndex: 10,
            }}>
            Back
          </Button>
        </Link>

        <Button
          onClick={handleOpenReviews}
          variant="outline-secondary"
          style={{
            color: "#fff",
            borderColor: '#fff',
            position: 'fixed',
            bottom: '20px',
            left: '100px',
            zIndex: 10,
          }}>
          See Reviews
        </Button>

        <ReviewDrawer
          show={showReviews}
          handleClose={handleCloseReviews}
          movie={movie}
        />
      </div>
    </div>
  );
};
