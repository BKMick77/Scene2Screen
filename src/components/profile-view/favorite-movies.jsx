import { Col, Card, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, movies }) => {
  return (
    <>
      <Row>
        <Col sm={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>

      <Row className="g-4">
        {user.FavoriteMovies?.length === 0 && <p>Add your favorites</p>}
        {user.FavoriteMovies?.map((movieID) => {
          const movie = movies.find((m) => m._id === movieID);
          return movie ? (
            <Col key={movie._id}>
              <Card className="h-100 p-2">
                <Link to={`/movies/${movie._id}`}>
                  <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleRemoveFavorite(movie._id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ) : null;
        })}
      </Row>
    </>
  );
};
