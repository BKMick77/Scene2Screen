import { Col, Card, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, movies, handleRemoveFavorite }) => {
  return (
    <Container className="mt-4 px-4">
      <Row>
        <Col sm={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>

      <Row>
        {user.FavoriteMovies?.length === 0 && <p>Add your favorites</p>}
        {user.FavoriteMovies?.map((movieID) => {
          const movie = movies.find((m) => m._id === movieID);
          return movie ? (
            <Col className="mb-4" key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Link to={`/movies/${movie._id}`}>
                  <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    style={{
                      width: "100%",         // ✅ fills its column
                      maxWidth: "500px",     // ✅ prevents being too wide
                      height: "auto",
                      display: "block",
                      margin: "0 auto 1rem"       // ✅ centers the image
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Director?.Name}</Card.Text>
                  </Card.Body>
                </Link>

                <Card.Body>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleRemoveFavorite(movie._id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ) : null;
        })}
      </Row>
    </Container>
  );
};
