import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/forms.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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
      await login(formData.username, formData.password);
      navigate('/catalog');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <section className="form-page">
      <form onSubmit={onSubmit} className="form">
        <h2>Login</h2>

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={onChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
        />

        <button>Login</button>
      </form>
    </section>
  );
}
