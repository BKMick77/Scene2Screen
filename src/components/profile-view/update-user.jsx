import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";

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

        <Row className="g-3">
          <Col md={6}>
            <FloatingLabel controlId="formUsername" label="Username">
              <Form.Control
                type="text"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
                required
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
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="formCurrentPassword" label="Current Password">
              <Form.Control
                type="password"
                placeholder=" "
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="formNewPassword" label="New Password">
              <Form.Control
                type="password"
                placeholder="Leave blank to keep current password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="formConfirmPassword" label="Confirm New Password">
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

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-primary" type="submit">Update Profile</Button>
          {/* <Button variant="outline-danger" className="ms-2" onClick={handleDelete}>Delete Account</Button> */}
        </div>
      </Form>

    </div>


  );
};
