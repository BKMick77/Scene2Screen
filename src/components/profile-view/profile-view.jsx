import { useState } from "react";
import { Form, Card, Button, Row, Col, Container } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, token, setUser, onLogout, movies }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedUser) => {
          alert("Profile has been updated");
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        });
      } else {
        alert("Update failed");
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete your account? Can not be undone."))
      return;

    fetch(`https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Account has been deleted.")
        onLogout();
      } else {
        alert("Deletion failed")
      }
    })
      .catch((err) => {
        console.error("Deletion error", err);
        alert("Error occured during deletion");
      });
  };

  return (
    <Container fluid className="px-4 my-4">
      <Row className="gx-4 gy-4">
        <Col xs={12} lg={3}>
          <Card className="w-100 h-100">
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={9}>
          <Card className="w-100 h-100">
            <Card.Body>
              <UpdateUser
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                email={email}
                setEmail={setEmail}
                birthday={birthday}
                setBirthday={setBirthday}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={12}>
          <FavoriteMovies user={user} movies={movies} />
        </Col>
      </Row>
    </Container>);
};




