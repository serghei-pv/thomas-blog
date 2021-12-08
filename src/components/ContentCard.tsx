import Link from "next/link";
import { formatDate } from "../Hooks/formatDate";
import styles from "../styles/contentcard.module.css";

export default function ContentCard({ post, type }: any) {
  let { titel, slug } = post.fields;
  let { createdAt, contentType } = post.sys;

  const date: string = formatDate(createdAt);

  return (
    <li className={styles.li}>
      <Link href={type == "rezept" ? "/rezepte/" + slug : "/blog/" + slug}>
        <a>
          <p className={styles.top}>
            <span className={styles.date}>{date}</span>
            <span>{contentType.sys.id}</span>
          </p>
          <h3>{titel}</h3>
        </a>
      </Link>
    </li>
  );
}
