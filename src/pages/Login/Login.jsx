import '../../styles/forms.css';

export default function Login() {
  return (
    <section className="forms">
      <form>
        <h3>Login</h3>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter username" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter password" />

        <button className="btn">Login</button>

        <p>
          Don&apos;t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </section>
  );
}
