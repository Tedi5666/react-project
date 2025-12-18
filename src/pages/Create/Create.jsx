import { useState } from 'react';
import '../../styles/create.css';
import { createGiveaway } from '../../services/giveaway';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Create({ sessionToken }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      signed: []
    };

    try {
      await createGiveaway(data, sessionToken);
      setSuccess('Giveaway created successfully!');
      setFormData({ title: '', description: '', price: '', imageUrl: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      navigate('/catalog');
    }
  };
  return (
    <section className="create">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Create Giveaway</h2>

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
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </section>
  );
}
