import { Navbar, Container, Nav } from "react-bootstrap";

export const NavbarView = ({ user, onHome, onLogout }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="auto">
            {user && (
              <>
                <Nav.Link onClick={onHome}>Home</Nav.Link>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
