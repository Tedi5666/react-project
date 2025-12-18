import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteGiveaway, getGiveawayById } from '../../services/giveaway';
import { request } from '../../services/api';
import { useAuth } from '../../context/AuthContext.jsx';
import '../../styles/details.css';

export default function Details({ sessionToken}) {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
      setError('Failed to load giveaway.');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this giveaway?');
    if (!confirmDelete) return;

    try {
      await deleteGiveaway(`${id}`, sessionToken);
      alert('Giveaway deleted successfully!');
      navigate('/catalog'); 
    } catch (err) {
      console.error(err);
      alert('Failed to delete giveaway.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

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

          {user.objectId === item.author.objectId && (
            <div className="details-actions">
              <button onClick={handleEdit} className="edit-btn">Edit</button>
              <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
          )}
        </div>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </section>
  );
}
