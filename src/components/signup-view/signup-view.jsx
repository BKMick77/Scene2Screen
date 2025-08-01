import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = ({ onLoginClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://young-tor-59565-22774666cdbf.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            isInvalid={confirmPassword && confirmPassword !== password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="mt-3">Register</Button>
      </Form>

      <div className="mt-3 text-center">
        <span>Already have an account?</span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={onLoginClick}
          style={{ textDecoration: "underline" }}
        >
          Log in here
        </button>
      </div>
    </>
  );
};




