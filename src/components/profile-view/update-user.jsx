import { Form, Button, FloatingLabel } from "react-bootstrap";

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

        <FloatingLabel controlId="formUsername" label="Username" className="mb-3">
          <Form.Control
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="formCurrentPassword" label="Current Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder=" "
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="formNewPassword" label="New Password" className="mb-3">
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Leave blank to keep current password"

          />
        </FloatingLabel>

        <FloatingLabel controlId="formConfirmPassword" label="Confirm New Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder=" "
            value={confirmPassword}
            isInvalid={confirmPassword && confirmPassword !== newPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={!!newPassword}
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

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-primary" type="submit">Update Profile</Button>
          {/* <Button variant="outline-danger" className="ms-2" onClick={handleDelete}>Delete Account</Button> */}
        </div>
      </Form>

    </div>


  );
};
