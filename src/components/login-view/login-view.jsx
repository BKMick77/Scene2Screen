import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn, onSignupClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://young-tor-59565-22774666cdbf.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user")
        }
      })
      .catch((e) => {
        console.error("Login Failed", e);
        alert("Something is wrong")
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
            minLength="4"
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

        <Button variant="outline-primary" type="submit" className="mt-3">Login</Button>
      </Form>

      <div className="mt-3 text-center">
        <span>Don't have an account?</span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={onSignupClick}
          style={{ textDecoration: "underline" }}
        >
          Sign up here
        </button>
      </div>
    </>
  );
};

