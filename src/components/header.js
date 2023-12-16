import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
const Header = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className="justify-content-center">
                <Navbar.Brand href="#home">USER MANAGEMENT LIST</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header