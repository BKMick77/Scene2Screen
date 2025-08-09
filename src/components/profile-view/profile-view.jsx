import { Row, Col, Container } from 'react-bootstrap';
import { FavoriteMovies } from './favorite-movies';

export const ProfileView = ({ user, token, setUser, movies }) => {
  const handleRemoveFavorite = (movieId) => {
    fetch(
      `https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      if (response.ok) {
        const updateUser = {
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movieId),
        };
        setUser(updateUser);
        localStorage.setItem('user', JSON.stringify(updateUser));
      } else {
        alert('Could not remove favorite');
      }
    });
  };

  return (
    <FavoriteMovies
      user={user}
      movies={movies}
      handleRemoveFavorite={handleRemoveFavorite}
    />
  );
};
