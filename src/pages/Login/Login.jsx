import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      <form onSubmit={onSubmit} className="forms">
        <h3>Login</h3>

        <label>Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={onChange}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={onChange}
        />

        <button className="btn">Login</button>

        <div className="form-footer">
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </section>
  );
}
