import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    repeatPassword: '',
  });

  const onChange = (e) => {
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match');
      return;
    }

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
      <form onSubmit={onSubmit} className="forms">
        <h3>Register</h3>

        <label>Username</label>
        <input name="username" onChange={onChange} />

        <label>Email</label>
        <input name="email" onChange={onChange} />

        <label>Image URL</label>
        <input name="imageUrl" onChange={onChange} />

        <label>Password</label>
        <input name="password" type="password" onChange={onChange} />

        <label>Repeat Password</label>
        <input
          name="repeatPassword"
          type="password"
          onChange={onChange}
        />

        <button className="btn">Register</button>

        <div className="form-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </section>
  );
}
