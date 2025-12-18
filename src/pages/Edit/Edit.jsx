import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/create.css';
import { editGiveaway, getGiveawayById } from '../../services/giveaway';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Edit({ sessionToken }) {
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
  const [success, setSuccess] = useState('');

  
  useEffect(() => {
    getGiveawayById(id)
      .then(data => {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          imageUrl: data.imageUrl || '',
        });
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load giveaway data.');
      })
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = {
      ...formData,
      price: Number(formData.price),
      author: {
        __type: 'Pointer',
        className: '_User',
        objectId: user.objectId
      },
    };

    try {
      await editGiveaway(id, data, sessionToken); 
      setSuccess('Giveaway updated successfully!');
      navigate('/details/' + id);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
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
        {success && <p className="success">{success}</p>}

        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="Giveaway title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="Giveaway description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            placeholder="0"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </label>

        <label>
          Image URL
          <input
            type="text"
            name="imageUrl"
            placeholder="https://..."
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </section>
  );
}
