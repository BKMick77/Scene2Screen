import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      onClick={() => onMovieClick(movie)}
      style={{ cursor: "pointer" }}
      className="h-100" >
      <Card.Img variant="top" src={movie.ImagePath}
        style={{ width: "300px", height: "auto", display: "block", marginBottom: "1rem" }} />

      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director?.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

