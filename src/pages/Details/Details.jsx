import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getGiveawayById, deleteGiveaway } from '../../services/giveaway';
import { request } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

import '../../styles/details.css';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getGiveawayById(id)
      .then(data => {
        setItem(data);

        if (data.author?.objectId) {
          return request('GET', `/users/${data.author.objectId}`);
        }
      })
      .then(authorData => {
        if (authorData) {
          setAuthor(authorData.username);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load giveaway');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const isOwner =
    user &&
    item &&
    item.author &&
    item.author.objectId === user.objectId;

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (!item) {
    return <p className="error">Giveaway not found</p>;
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

          {isOwner && (
            <div className="details-actions">
              <button
                className="edit-btn"
                onClick={() => navigate(`/edit/${id}`)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => navigate(`/delete/${id}`)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </section>
  );
}
