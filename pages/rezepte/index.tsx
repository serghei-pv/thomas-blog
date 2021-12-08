import { createClient } from "contentful";
import styles from "../../src/styles/rezepte.module.css";
import RezepteCard from "../../src/components/RezepteCard";

export default function rezepte({ rezepte }: any) {
  return (
    <>
      <h1>Rezepte</h1>
      <ul className={styles.ul}>
        {rezepte.map((rezept: any) => (
          <RezepteCard RezepteCard key={rezept.sys.id} post={rezept} />
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps(): Promise<any> {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  const rezepte = await client.getEntries({ content_type: "rezept" });

  rezepte.items.sort(function (b, a) {
    return a.sys.createdAt.localeCompare(b.sys.createdAt);
  });

  return {
    props: {
      rezepte: rezepte.items,
      revalidate: 60,
    },
  };
}
