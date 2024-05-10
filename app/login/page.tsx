import styles from './Login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
