import Image from "next/image";
import styles from "../src/styles/index.module.css";
import { createClient } from "contentful";
import ContentCard from "../src/components/ContentCard";

export default function index({ content }: any) {
  console.log(content);

  return (
    <>
      <h1>Thomas&#39; Kitchen</h1>
      <article className={styles.article}>
        <section className={styles.img}>
          <Image src="/images/index.webp" width="500" height="500" alt="Ein Bild von Thomas" priority={true}></Image>
        </section>

        <section className={styles.neuste}>
          <h2>Neuste Beiträge</h2>
          <ul>
            {content.map((post: any) => (
              <ContentCard key={post.sys.id} post={post} type={post.sys.contentType.sys.id == "rezept" ? "rezept" : "blog"} />
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}

export async function getStaticProps(): Promise<any> {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  const rezepte = await client.getEntries({ content_type: "rezept" });
  const blogposts = await client.getEntries({ content_type: "blog" });

  let content: any[] = [];

  for (let key in rezepte.items) {
    content.push(rezepte.items[key]);
  }
  for (let key in blogposts.items) {
    content.push(blogposts.items[key]);
  }

  content.sort(function (b, a) {
    return a.sys.createdAt.localeCompare(b.sys.createdAt);
  });

  if (content.length > 3) {
    content.length = 3;
  }

  return {
    props: {
      content: content,
    },
    revalidate: 60,
  };
}
