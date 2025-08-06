import { Col, Card, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export const FavoriteMovies = ({ user, movies, handleRemoveFavorite }) => {
  return (
    <Container className="mt-4">
      <Row>
        <Col sm={12}>
          <p className="mb-4 fs-2">Favorite Movies</p>
        </Col>
      </Row>

      <Row>
        {user.FavoriteMovies?.length === 0 && <p>Add your favorites</p>}
        {user.FavoriteMovies?.map((movieID) => {
          const movie = movies.find((m) => m._id === movieID);
          return movie ? (
            <Col className="mb-4" key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="fav-cards">
                <Link to={`/movies/${movie._id}`}
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
                  />

                </Link>

                <Card.Body>

                  <FaRegTrashAlt
                    className="trash-button"
                    onClick={() => handleRemoveFavorite(movie._id)}
                  >
                  </FaRegTrashAlt>
                </Card.Body>
              </Card>
            </Col>
          ) : null;
        })}
      </Row>
    </Container>
  );
};
