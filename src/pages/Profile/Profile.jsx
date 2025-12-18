import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { request } from '../../services/api';
import '../../styles/profile.css';
import { Link } from 'react-router-dom';

export default function Profile({ sessionToken }) {
  const { user } = useAuth();
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchGiveaways = async () => {
      try {
        const data = await request(
          'GET',
          `/classes/giveAway?where=${encodeURIComponent(
            JSON.stringify({ "author": { "__type": "Pointer", "className": "_User", "objectId": user.objectId } })
          )}`,
          null,
          sessionToken
        );
        setGiveaways(data.results || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load giveaways.');
      } finally {
        setLoading(false);
      }
    };

    fetchGiveaways();
  }, [user, sessionToken]);

  if (!user) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Please log in to view your profile.</p>;
  }

  return (
    <section className="profile">
      <div className="profile-card">
        <img
          src={user.imageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="profile"
        />
        <h3>{user.username}</h3>
        <p>Email: {user.email}</p>

        <h4>My Giveaways</h4>

        {loading && <p>Loading giveaways...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {giveaways.length > 0 ? (
          <ul className="profile-list">
            {giveaways.map((g) => (
              <li key={g.objectId}>
                <span>{g.title}</span>
                <Link to={`/details/${g.objectId}`}>Details</Link>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="no-items">No giveaways yet.</p>
        )}
      </div>
    </section>
  );
}
