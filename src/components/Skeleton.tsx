import styles from "../styles/skeleton.module.css";

export default function Skeleton() {
  return (
    <section className={styles.section}>
      <div className={styles.info}></div>
      <div className={styles.title}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
    </section>
  );
}
