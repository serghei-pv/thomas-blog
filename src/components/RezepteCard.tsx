import styles from "../styles/contentcard.module.css";
import Link from "next/link";
import Image from "next/dist/client/image";

export default function RezepteCard({ post }: any) {
  let { titel, slug, nahrungstyp, schwierigkeit, vorbereitungszeit, bild } = post.fields;

  return (
    <li className={styles.li}>
      <Link href={"/rezepte/" + slug}>
        <a>
          <article className={styles.rezept}>
            <div className={styles.img}>
              <Image src={"https:" + bild.fields.file.url} width={120} height={150} alt="Ein Bild des Gerichts" />
            </div>
            <section>
              <p>
                <span>{vorbereitungszeit}</span>
                <span>{schwierigkeit}</span>
                {nahrungstyp != undefined && <span>{nahrungstyp}</span>}
              </p>
              <h3 className={styles.titel}>{titel}</h3>
            </section>
          </article>
        </a>
      </Link>
    </li>
  );
}
