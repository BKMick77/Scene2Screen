import { Navbar, Container, Nav, NavDropdown, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarView = ({
  onLogout,
  onShowUserInfo,
  onShowUpdateUser,
  onShowDeleteModal,
}) => {

  return (
    <Navbar data-bs-theme="dark" expand="lg" sticky="top" className="px-4"
      style={{ backgroundColor: "#16161F" }}
    >
      <Container fluid className="px-0">
        <Navbar.Brand as={Link} to="/" className="brand-text">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <>
              <Nav.Link as={Link} to="/">Home</Nav.Link>

              <NavDropdown title="Account" id="basic-nav-dropdown">

                <NavDropdown.Item as={Link} to="/profile">
                  Favorite Movies
                </NavDropdown.Item>

                <NavDropdown.Item onClick={onShowUserInfo}>
                  Your Info
                </NavDropdown.Item>

                <NavDropdown.Item onClick={onShowUpdateUser}>
                  Update Info
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={onShowDeleteModal}>
                  Delete Account
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
            </>
          </Nav>
          <Form className="d-flex ms-auto">
            <Form.Control
              type="text"
              placeholder="Search (placeholder)"
              className="me-2"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
