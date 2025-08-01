import { Form, Button } from "react-bootstrap";

export const UpdateUser = ({
  username,
  setUsername,
  newPassword,
  setNewPassword,
  email,
  setEmail,
  birthday,
  setBirthday,
  handleSubmit,
  handleDelete,
  confirmPassword,
  setConfirmPassword,
  currentPassword,
  setCurrentPassword,
}) => {

  return (
    <div>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
            required
          />
        </Form.Group>

        <Form.Group controlId="formCurrentPassword" className="mb-3">
          <Form.Label>Current Password:</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNewPassword" className="mb-3">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Leave blank to keep current password"

          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirm New Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            isInvalid={confirmPassword && confirmPassword !== newPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={!!newPassword}
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

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-primary" type="submit">Update Profile</Button>
          <Button variant="outline-danger" className="ms-2" onClick={handleDelete}>Delete Account</Button>
        </div>
      </Form>

    </div>


  );
};
