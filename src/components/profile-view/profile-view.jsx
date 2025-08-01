import { useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, token, setUser, onLogout, movies }) => {
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      return;
    }

    const updatedData = {
      username,
      currentPassword,
      newPassword,
      email,
      birthday
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

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        const updateUser = {
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movieId)
        };
        setUser(updateUser);
        localStorage.setItem("user", JSON.stringify(updateUser));
      } else {
        alert("Could not remove favorite");
      }
    });
  };

  return (
    <>
      <Row className="gx-4 gy-4">
        <Col xs={12} lg={3}>
          <Card className="w-100 h-100">
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={9}>
          <Card className="w-50 h-50">
            <Card.Body>
              <UpdateUser
                username={username}
                setUsername={setUsername}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
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

      <Container className="mt-4 px-4">
        <Row>
          <Col>
            <FavoriteMovies
              user={user}
              movies={movies}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};




