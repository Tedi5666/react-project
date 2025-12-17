import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGiveawayById } from '../../services/giveaway';
import { request } from '../../services/api';
import '../../styles/details.css';

export default function Details() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGiveawayById(id)
      .then(data => {
        setItem(data);

        if (data.author && data.author.objectId) {
          return request('GET', `/users/${data.author.objectId}`);
        }
      })
      .then(user => {
        if (user) {
          setAuthor(user.username);
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;
  }

  if (!item) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Item not found</p>;
  }

  return (
    <section className="details-page">
      <div className="details-card">
        <img src={item.imageUrl} alt={item.title} />

        <div className="details-content">
          <h2>{item.title}</h2>
          <p className="details-author">Author: {author}</p>
          <p>{item.description}</p>
          <p className="details-price">Price: ${item.price}</p>
        </div>
      </div>
    </section>
  );
}
