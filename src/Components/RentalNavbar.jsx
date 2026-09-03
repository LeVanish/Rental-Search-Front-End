import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function RentalNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Collapse id="navbar-nav">
          <Navbar.Brand as={Link} to="/">Rental Finder</Navbar.Brand>

          <Nav className="gap-2">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/table">Rentals</Nav.Link>
            <Nav.Link as={Link} to="/ratings">Ratings</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}