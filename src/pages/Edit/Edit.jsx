import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/create.css';

import { editGiveaway, getGiveawayById } from '../../services/giveaway';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Edit() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getGiveawayById(id)
      .then(data => {
        if (data.author.objectId !== user.objectId) {
          navigate('/catalog');
          return;
        }

        setFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          imageUrl: data.imageUrl || '',
        });
      })
      .catch(() => {
        setError('Failed to load giveaway data.');
      })
      .finally(() => setFetching(false));
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      await editGiveaway(id, data, user.sessionToken);
      navigate('/details/' + id);
    } catch {
      setError('Update failed.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <section className="create">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Edit Giveaway</h2>

        {error && <p className="error">{error}</p>}

        <label>
          Title
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Image URL
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>

        <button disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </section>
  );
}
