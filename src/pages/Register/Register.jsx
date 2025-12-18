import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/forms.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    imageUrl: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(
        formData.username,
        formData.email,
        formData.imageUrl,
        formData.password
      );
      navigate('/catalog');
    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <section className="form-page">
      <form onSubmit={onSubmit} className="form">
        <h2>Register</h2>

        <input name="username" placeholder="Username" onChange={onChange} />
        <input name="email" placeholder="Email" onChange={onChange} />
        <input name="imageUrl" placeholder="Image URL" onChange={onChange} />
        <input name="password" type="password" placeholder="Password" onChange={onChange} />

        <button>Register</button>
      </form>
    </section>
  );
}
