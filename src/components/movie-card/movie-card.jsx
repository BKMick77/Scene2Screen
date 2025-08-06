import React from "react"
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"

export const MovieCard = ({ movie }) => {
  return (
    <Card className="cards">
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}
        style={{ textDecoration: "none" }}
      >

        <Card.Img variant="top"
          src={movie?.ImagePath}
          style={{ width: "100%", height: "100%", display: "block" }}
          alt={`${movie?.Title}`} />
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

