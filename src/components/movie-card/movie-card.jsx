import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onMovieClick: PropTypes.func
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
