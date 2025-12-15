import '../../styles/create.css';

export default function Create() {
  return (
    <section className="create">
      <form className="create-form">
        <h2>Create Giveaway</h2>

        <label>
          Title
          <input type="text" placeholder="Giveaway title" />
        </label>

        <label>
          Description
          <textarea placeholder="Giveaway description"></textarea>
        </label>

        <label>
          Price
          <input type="number" placeholder="0" />
        </label>

        <label>
          Image URL
          <input type="text" placeholder="https://..." />
        </label>

        <button>Create</button>
      </form>
    </section>
  );
}
