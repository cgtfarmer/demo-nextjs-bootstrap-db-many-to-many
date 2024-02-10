import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';

const matchesCurrentPath = (router, path) => {
  const currentPath = router.asPath;

  return [path, `${path}/`].includes(currentPath);
};

const Component = () => {
  const router = useRouter();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Stores', path: '/stores' },
  ];

  const navLinks = links.map((link) => {
    return (
      <Link key={link.name} href={link.path} passHref legacyBehavior>
        <Nav.Link active={matchesCurrentPath(router, link.path)}>
          {link.name}
        </Nav.Link>
      </Link>
    );
  });

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-3">
      <Link href="/" passHref legacyBehavior>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="navbar-top" />

      <Navbar.Collapse id="navbar-top">
        <Nav className="me-auto">
          {navLinks}

          <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item href="/admin/stores">
              Stores
            </NavDropdown.Item>

            <NavDropdown.Item href="/admin/products">
              Products
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Component;
