import styles from "../styles/contentcard.module.css";
import Link from "next/link";
import Image from "next/dist/client/image";
import { formatDate } from "../Hooks/formatDate";

export default function RezepteCard({ post }: any) {
  let { createdAt } = post.sys;
  let { titel, slug, nahrungstyp, schwierigkeit, vorbereitungszeit, bild, beschreibung } = post.fields;

  const date: string = formatDate(createdAt);

  return (
    <li className={styles.li}>
      <Link href={"/rezepte/" + slug}>
        <a>
          <article className={styles.rezept}>
            <section>
              <p className={styles.top}>
                <span>{date}</span>
                <span>{nahrungstyp}</span>
              </p>
              <h3 className={styles.titel}>{titel}</h3>
              <article className={styles.beschreibung}>{beschreibung}</article>
              <p className={styles.bot}>
                <span>{vorbereitungszeit}</span>
                <span>{schwierigkeit}</span>
              </p>
            </section>
            <div className={styles.img}>
              <Image src={"https:" + bild.fields.file.url} width={120} height={150} alt="Ein Bild des Gerichts" />
            </div>
          </article>
        </a>
      </Link>
    </li>
  );
}
