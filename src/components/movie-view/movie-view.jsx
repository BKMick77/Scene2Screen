import "./movie-view.scss";
import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  console.log("Rendering MovieCard:", movie);

  return (
    <div>

      <div>
        <img
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ width: "100%", height: "auto", display: "block", marginBottom: "1rem" }}
        />     </div>

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

      <div> <Button onClick={onBackClick} className="mb-2" style={{ width: "100px" }}>Back</Button>
      </div>

    </div>
  );
};
