import '../../styles/details.css';

export default function Details() {
  return (
    <section className="details">
      <div className="details-card">
        <img
          src="https://via.placeholder.com/400x250"
          alt="giveaway"
        />

        <div className="details-content">
          <h2>Giveaway Title</h2>

          <p className="price">Price: 120 лв.</p>

          <p className="description">
            This is a short description of the giveaway. It explains what is
            being given and under what conditions.
          </p>

          <p className="author">
            Author: <span>username</span>
          </p>

          <div className="actions">
            {/* <button className="sign">Sign Up</button> */}
            <button className="edit">Edit</button>
            <button className="delete">Delete</button>
          </div>
        </div>
      </div>
    </section>
  );
}
