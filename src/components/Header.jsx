import { Link } from 'react-router-dom';
import '../styles/nav.css';

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="logo">GiveAway</Link>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}
