import { createClient } from "contentful";
import styles from "../../src/styles/rezepte.module.css";
import { formatDate } from "../../src/Hooks/formatDate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../src/components/Skeleton";
import Image from "next/image";

export default function rezept({ post }: any) {
  if (!post) {
    return (
      <>
        <h1>Rezepte</h1>
        <Skeleton />;
      </>
    );
  }

  const { bild, nahrungstyp, portionen, schwierigkeit, titel, vorwort, zubereitung, zutaten, vorbereitungszeit } = post.fields;
  const { createdAt } = post.sys;

  let date: string = formatDate(createdAt);

  return (
    <>
      <h1>Rezepte</h1>
      <section className={styles.section}>
        <span>{date}</span>
        <h2>{titel}</h2>
        <div className={styles.recipeInfo}>
          <span>
            {portionen} {portionen > 1 ? "Portionen" : "Portion"}
          </span>
          <span>{vorbereitungszeit}</span>
          <span>{schwierigkeit}</span>
          <span>{nahrungstyp}</span>
        </div>
        <div className={styles.img}>
          <Image src={"https:" + bild.fields.file.url} alt="Ein Bild des Gerichts" width={480} height={600} />
        </div>
        <div className={styles.zutaten}>
          <h3>Zutaten</h3>
          <ul>
            {zutaten.map((zutat: any) => (
              <li key={zutat}>{zutat}</li>
            ))}
          </ul>
        </div>
        <article className={styles.vorwort}>
          <h3>Vorwort</h3>
          {documentToReactComponents(vorwort)}
        </article>
        <article className={styles.zubereitung}>
          <h3>Zubereitung</h3>
          {documentToReactComponents(zubereitung)}
        </article>
        <p className={styles.schlusswort}>Guten Appetit!</p>
      </section>
    </>
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getStaticPaths(): Promise<any> {
  const res = await client.getEntries({ content_type: "rezept" });

  const paths = res.items.map((item: any) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any): Promise<any> {
  const { items } = await client.getEntries({ content_type: "rezept", "fields.slug": params.slug });

  if (!items) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: { post: items[0] },
    revalidate: 60,
  };
}
