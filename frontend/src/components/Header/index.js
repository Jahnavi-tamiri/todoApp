import { Link } from 'react-router-dom';
import { Nav } from './styledComponent'; 

const Header = () => {
    return (
        <Nav>
            <h1>Welcome to Todo Application</h1>
            <div>
                <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
                <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
            </div>
        </Nav>
    )
}

export default Header;
