import '../../styles/details.css';

export default function Details() {
  return (
    <section className="details">
      <div className="details-content">
        <h2>Gaming Mouse</h2>

        <p><strong>Price:</strong> $50</p>
        <p>
          <strong>Description:</strong> High-quality gaming mouse suitable for
          competitive play.
        </p>
        <p><strong>Owner:</strong> JohnDoe</p>

        <div className="details-actions">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    </section>
  );
}
