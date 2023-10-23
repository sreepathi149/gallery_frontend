import { Link, useNavigate } from "react-router-dom"
import {Navbar, Nav} from 'react-bootstrap'

const NavBar = () => {
    const navigate = useNavigate()
    
    const handleClick = () => {
        localStorage.removeItem('loginToken')
        navigate("/login")
    }

    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="/">Photo Gallery App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="pills" defaultActiveKey="/" className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        {localStorage.getItem('loginToken') ? <Nav.Link onClick={handleClick}>Logout</Nav.Link> : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                    </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    
    )
}

export default NavBar