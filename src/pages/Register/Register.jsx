import '../../styles/forms.css';

export default function Register() {
  return (
    <section className="forms">
      <form>
        <h3>Register</h3>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter username" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter email" />

        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" placeholder="Profile image URL" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter password" />

        <label htmlFor="repass">Repeat Password</label>
        <input type="password" id="repass" placeholder="Repeat password" />

        <button className="btn">Register</button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </section>
  );
}
