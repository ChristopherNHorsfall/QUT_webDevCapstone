import { Container, Navbar, Nav, Button, Form, NavItem } from "react-bootstrap";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

export default function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Tourism Industry Insights</Navbar.Brand>
                <Nav className="justify-content-end" variant="underline" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/About">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="secondary" as={Link} to="/Register" className="ms-2">
                            Register
                        </Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="primary" as={Link} to="/SignIn" className="ms-2">
                            Sign In
                        </Button>
                    </Nav.Item>
                </Nav>

            </Container>
        </Navbar>
    )
}