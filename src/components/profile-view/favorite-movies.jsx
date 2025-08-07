import { Col, Card, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export const FavoriteMovies = ({ user, movies, handleRemoveFavorite }) => {
  const favoriteMovies = user.FavoriteMovies?.map((movieID) =>
    movies.find((m) => m._id === movieID)
  ).filter(Boolean);

  return (
    <Container fluid className="mt-4 px-4">
      <Row>
        <Col sm={12}>
          <p className="mb-4 fs-2">Favorite Movies</p>
        </Col>
      </Row>

      <Row className="gx-4 gy-4 justify-content-center">
        {favoriteMovies.length === 0 ? (
          <Col>Add your favorites</Col>
        ) : (
          favoriteMovies.map((movie) => (
            <Col className="mb-4" key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="cards position-relative">
                <Link
                  to={`/movies/${movie._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                    }}
                    alt={movie.Title}
                  />
                </Link>
                <FaRegTrashAlt
                  className="trash-button"
                  size={35}
                  onClick={() => handleRemoveFavorite(movie._id)}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};
