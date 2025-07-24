import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
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

//THIS RENDERS!!!!

// export const MovieCard = ({ movie }) => {
//   console.log("Rendering MovieCard:", movie);
//   return (
//     <div>
//       <h2>{movie.Title}</h2>
//       <p>ID: {movie._id}</p>
//       <p>Director: {movie.Director?.Name}</p>
//       <p>Genre: {movie.Genre?.Name}</p>
//       <p>{movie.ImagePath}</p>
//     </div>
//   );
// };
