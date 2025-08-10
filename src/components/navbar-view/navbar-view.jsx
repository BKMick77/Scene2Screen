import { Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

export const NavbarView = ({
  movies,
  onLogout,
  onShowUserInfo,
  onShowUpdateUser,
  onShowDeleteModal,
}) => {
  // fuse + titleMap
  const [q, setQ] = useState(''); //query
  const navigate = useNavigate();

  const fuse = useMemo(() => {
    return new Fuse(movies || [], {
      keys: ['Title'],
      threshold: 0.3, //fuzziness 0-1 low is fuzzier
      ignoreLocation: true,
    });
  }, [movies]);

  const titleMap = useMemo(() => {
    const m = new Map();
    for (const mv of movies || []) {
      m.set(mv.Title.toLowerCase().trim(), mv);
    }
    return m;
  }, [movies]);

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const term = q.trim();
    if (!term) return;

    const exact = titleMap.get(term.toLowerCase());
    const target = exact ?? fuse.search(term)[0]?.item;

    if (target?._id) {
      navigate(`/movies/${target._id}`);
      setQ(''); //clears query
    } else {
      alert('Movie unavailable');
    }
  };

  return (
    <Navbar
      data-bs-theme="dark"
      expand="lg"
      sticky="top"
      className="px-4"
      style={{ backgroundColor: '#16161F' }}
    >
      <Container fluid className="px-0">
        <Navbar.Brand as={Link} to="/" className="brand-text s2s-logo">
          S2S
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

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
          </Nav>

          <Form className="d-flex ms-auto" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search movies…"
              className="me-2"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
