import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/forms.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

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

  const validateEmailProvider = (email) => {
    if (!email || !email.includes('@')) return false;
    const domain = email.split('@')[1].toLowerCase();
    const allowed = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
      'live.com',
      'aol.com',
      'icloud.com',
      'abv.bg'
    ];
    return allowed.some((d) => domain === d || domain.endsWith('.' + d));
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;
    return /\.(png|jpe?g|webp)(\?.*)?$/i.test(url);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (!formData.username.trim()) {
      errors.push('Username is required.');
    }

    if (!formData.email || !formData.email.includes('@')) {
      errors.push('Email must contain an @ character.');
    } else if (!validateEmailProvider(formData.email)) {
      errors.push('Email must be from a common provider (gmail, yahoo, outlook, hotmail, live, aol, icloud, abv).');
    }

    if (!isValidImageUrl(formData.imageUrl)) {
      errors.push('Image URL must point to a PNG or JPEG file (ending with .png/.jpg/.jpeg/.webp).');
    }

    if (!formData.password || formData.password.length < 6) {
      errors.push('Password must be at least 6 characters long.');
    }

    if (formData.password !== formData.repeatPassword) {
      errors.push('Passwords do not match.');
    }

    if (errors.length) {
      errors.forEach((m) => addToast(m));
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
      addToast(err?.message || 'Register failed');
    }
  };

  return (
    <section className="form-page">
      <form onSubmit={onSubmit} className="forms">
        <h3>Register</h3>

        <label>Username</label>
        <input name="username" value={formData.username} onChange={onChange} placeholder="Enter username" />

        <label>Email</label>
        <input name="email" type="email" value={formData.email} onChange={onChange} placeholder="name@gmail.com" />

        <label>Image URL</label>
        <input name="imageUrl" value={formData.imageUrl} onChange={onChange} placeholder="https://example.com/avatar.png" />

        <label>Password</label>
        <input name="password" type="password" value={formData.password} onChange={onChange} placeholder="At least 6 characters" />

        <label>Repeat Password</label>
        <input
          name="repeatPassword"
          type="password"
          value={formData.repeatPassword}
          onChange={onChange}
          placeholder="Repeat password"
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
