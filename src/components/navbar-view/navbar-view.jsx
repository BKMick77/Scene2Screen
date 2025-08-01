import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarView = ({ user, onLogout, onShowUserInfo, onShowUpdateUser }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" className="px-4">
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

                <NavDropdown.Item href="#action/3.4">
                  Delete Account
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
