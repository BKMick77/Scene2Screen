import { useState } from 'react'
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Get Out",
      description: "A chilling horror film about a family confronted by their doppelgängers in a tense and symbolic struggle.",
      genre: "Horror",
      director: "Jordan Peele",
      image: "https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg"

    },

    {
      id: 2,
      title: "Arrival",
      description: "A cerebral sci-fi drama about a linguist working to communicate with alien visitors, exploring time and loss.",
      genre: "Thriller",
      director: "Denis Villeneuve",
      image: "https://image.tmdb.org/t/p/original/pEzNVQfdzYDzVK0XqxERIw2x2se.jpg",
    },

    {
      id: 3,
      title: "Parasite",
      description: "A darkly comic thriller about class disparity, deception, and infiltration that escalates into violence.",
      genre: "Drama",
      director: "Bong Joon-ho",
      image: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
