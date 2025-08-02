import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SiAppletv, SiPrimevideo } from "react-icons/si";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();

  console.log("movieId from URL:", movieId);
  console.log("movies from props:", movies);
  console.log("movie._id values:", movies.map((m) => m._id));

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

  return (
    <div
      className="movie-view"
      style={{
        backgroundImage: `url(${movie.BackdropPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100dvh',
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
        <h1 className="mb-3">{movie.Title}</h1>

        <h3 className="mb-3" style={{ maxWidth: '30ch' }}> {movie.Description}</h3>
        <h4 className="mb-3"><strong>Director:</strong> {movie.Director?.Name}</h4>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h4 style={{ margin: 0 }}>{movie.Genre?.Name}</h4>
          <Button
            variant="light"
            onClick={handleToggleFavorites}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.75rem',
              color: isFavorite ? 'red' : 'red',
              padding: '5px',
              lineHeight: 1,
              marginLeft: '10px',
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
                  textDecoration: 'none', // optional, removes underline
                  display: 'inline-block', // keeps it tight around the icon
                  marginRight: '1rem' // spacing if placing next to others
                }}
              >
                <SiAppletv size={60} />
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
                <SiPrimevideo size={80} />
              </a>
            )}
          </div>
        )}
        <Link to="/">
          <Button variant="primary-secondary"
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              zIndex: 10,
            }}>
            Back
          </Button>
        </Link>

      </div>
    </div>
  );
};
