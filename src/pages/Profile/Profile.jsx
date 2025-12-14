import '../../styles/profile.css';

export default function Profile() {
  return (
    <section className="profile">
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
        />

        <h3>Username</h3>
        <p>Email: user@email.com</p>

        <h4>My Giveaways</h4>

        <ul className="profile-list">
          <li>
            <span>Giveaway title 1</span>
            <a href="/details/1">Details</a>
          </li>
          <li>
            <span>Giveaway title 2</span>
            <a href="/details/2">Details</a>
          </li>
        </ul>

        <p className="no-items">No giveaways yet.</p>
      </div>
    </section>
  );
}
