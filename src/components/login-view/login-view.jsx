import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

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

        <FloatingLabel controlId="formUsername" label="Username" className="mb-3">

          <Form.Control
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="formPassword" label="Password" className="mb-3">


          <Form.Control
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FloatingLabel>

        <Button variant="outline-primary" type="submit" className="mt-3">Login</Button>
      </Form>

      <div className="mt-3 text-center">
        <span>Don't have an account?</span>
        <button
          type="button"
          className="btn btn-link p-1 mb-1"
          onClick={onSignupClick}
          style={{ textDecoration: "underline" }}
        >
          Sign up here
        </button>
      </div>
    </>
  );
};

