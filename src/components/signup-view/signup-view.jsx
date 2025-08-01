import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

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

        <FloatingLabel controlId="formUsername" label="Username" className="mb-3">
          <Form.Control
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
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

        <FloatingLabel controlId="formConfirmPassword" label="Confirm Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder=" "
            value={confirmPassword}
            isInvalid={confirmPassword && confirmPassword !== password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match
          </Form.Control.Feedback>
        </FloatingLabel>


        <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="formBirthday" label="Birthday" className="mb-3">
          <Form.Control
            type="date"
            placeholder=" "
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </FloatingLabel>

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




