import { useState } from "react";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";

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

        <Row className="g-3">
          <Col md={6}>
            <FloatingLabel controlId="formUsername" label="Username">
              <Form.Control
                type="text"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                pattern="^[a-zA-Z0-9_]{3,20}$"
                title="Username must be 3–20 characters and contain only letters, numbers, or underscores"
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="formEmail" label="Email">
              <Form.Control
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
                title="Enter a valid email address"
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="formPassword" label="Password">
              <Form.Control
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="/^(?=.*[A-Za-z])(?=.*\d|[^A-Za-z\d])[A-Za-z\d\W]{8,}$/"
                title="Password must be at least 8 characters and include a letter and a number or special character."
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="formConfirmPassword" label="Confirm Password">
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
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="formBirthday" label="Birthday">
              <Form.Control
                type="date"
                placeholder=" "
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button variant="outline-primary" type="submit" className="mt-3">Register</Button>
      </Form>

      <div className="mt-3 text-center">
        <span>Already have an account?</span>
        <button
          type="button"
          className="btn btn-link p-1 mb-1"
          onClick={onLoginClick}
          style={{ textDecoration: "underline" }}
        >
          Log in here
        </button>
      </div>
    </>
  );
};




