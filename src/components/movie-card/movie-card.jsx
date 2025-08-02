import React from "react"
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"

export const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>

        <Card.Img variant="top"
          src={movie.ImagePath}
          style={{ width: "100%", height: "auto", display: "block", marginBottom: "1rem" }} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director?.Name}</Card.Text>
        </Card.Body>
      </Link>
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

