import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./movie-view.scss";

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
      style={{
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "2rem",
        textAlign: "left",
        padding: ".5rem"
      }}
    >

      <div>
        <img
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ width: "100%", maxWidth: "450px", height: "auto", display: "block", marginBottom: "1rem" }} />
      </div>

      <div>
        <span> Title: </span>
        <span>{movie.Title}</span>
      </div>

      <div>
        <span> Description: </span>
        <span>{movie.Description}</span>
      </div>

      <div>
        <span>Director: </span>
        <span>{movie.Director?.Name}</span>
      </div>

      <div> <span>Genre: </span>
        <span>{movie.Genre?.Name}</span>
      </div>

      <div className="d-flex gap-3 mt-3 align-items-start">
        <Button
          variant="light"
          onClick={handleToggleFavorites}
          className="mb-2"
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            fontSize: "2rem",
            display: "block",
            marginLeft: 0,
            color: isFavorite ? "red" : "red",
          }}
        >
          {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </Button>

        <Link to={'/'}>
          <Button
            variant="outline-secondary"
            style={{ marginTop: "11px" }}>
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};




