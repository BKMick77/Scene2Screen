import { useState } from 'react';
import { Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';

export const UpdateUser = ({ user, token, setUser, onClose }) => {
  const [username, setUsername] = useState(user.Username);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday?.slice(0, 10) || '');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const updatedData = {
      username,
      currentPassword,
      newPassword,
      email,
      birthday,
    };

    console.log('Submitting update with token:', token);

    fetch(
      `https://young-tor-59565-22774666cdbf.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((updatedUser) => {
            alert('Profile updated');
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            onClose?.();
          });
        } else {
          alert('Update failed');
        }
      })
      .catch((err) => {
        console.error('Update error', err);
        alert('An error occurred during update');
      });
  };

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
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel
              controlId="formCurrentPassword"
              label="Current Password"
            >
              <Form.Control
                type="password"
                placeholder=" "
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoFocus //not working
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
                pattern="^(?=.*[A-Za-z])(?=.*[\d\W]).{8,}$"
                title="Password must be at least 8 characters and include a letter and a number or special character."
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel
              controlId="formConfirmPassword"
              label="Confirm New Password"
            >
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
          <Button variant="outline-primary" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
