import styles from "../styles/contentcard.module.css";
import Link from "next/link";
import { formatDate } from "../Hooks/formatDate";

export default function BlogCard({ post }: any) {
  let { createdAt } = post.sys;
  let { titel, slug } = post.fields;

  const date: string = formatDate(createdAt);

  return (
    <li className={styles.li}>
      <Link href={"/blog/" + slug}>
        <a>
          <p className={styles.top}>
            <span className={styles.date}>{date}</span>
          </p>
          <h3>{titel}</h3>
        </a>
      </Link>
    </li>
  );
}
