import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGiveaways } from '../../services/giveaway';
import '../../styles/catalog.css';

export default function Catalog() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllGiveaways().then(setItems);
  }, []);

  return (
    <section className="catalog">
      <h2>All Giveaways</h2>

      <div className="catalog-grid">
        {items.map(item => (
          <Link
            key={item.objectId}
            to={`/details/${item.objectId}`}
            className="catalog-card"
          >
            <img src={item.imageUrl} alt={item.title} />
            <div className="catalog-card-content">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
