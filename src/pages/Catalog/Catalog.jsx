import '../../styles/catalog.css';
import { Link } from 'react-router-dom';

export default function Catalog() {
  return (
    <section className="catalog">
      <h2>All Giveaways</h2>

      <div className="catalog-grid">
        <div className="catalog-card">
          <img src="https://via.placeholder.com/300" alt="item" />
          <div className="catalog-card-content">
            <h3>Gaming Mouse</h3>
            <p>Price: $50</p>
            <Link to="/details/1">Details</Link>
          </div>
        </div>

        <div className="catalog-card">
          <img src="https://via.placeholder.com/300" alt="item" />
          <div className="catalog-card-content">
            <h3>Keyboard</h3>
            <p>Price: $70</p>
            <Link to="/details/2">Details</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
