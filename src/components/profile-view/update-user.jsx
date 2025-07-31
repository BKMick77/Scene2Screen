import { Form, Button } from "react-bootstrap";

export const UpdateUser = ({
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  birthday,
  setBirthday,
  handleSubmit,
  handleDelete
}) => {

  return (
    <div>
      <h4>Update Info</h4>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep currennt password"

          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-primary" type="submit">Update Profile</Button>
          <Button variant="outline-danger" className="ms-2" onClick={handleDelete}>Delete Account</Button>
        </div>
      </Form>

    </div>


  );
};
