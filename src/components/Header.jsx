import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const values = useAuth();

  return (
    <header>
      <nav>
        <Link to="/" className="logo">GiveAway</Link>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          {values.user ? (
            <>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header> 
  );
}
