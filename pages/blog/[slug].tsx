import { createClient } from "contentful";
import styles from "../../src/styles/blog.module.css";
import { formatDate } from "../../src/Hooks/formatDate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../src/components/Skeleton";

export default function blogpost({ post }: any) {
  if (!post) {
    return (
      <>
        <h1>Blog</h1>
        <Skeleton />;
      </>
    );
  }

  const { titel, text } = post.fields;
  const { createdAt } = post.sys;

  let date: string = formatDate(createdAt);

  return (
    <>
      <section className={styles.section}>
        <h2>{titel}</h2>
        <span>{date}</span>
        <article>{documentToReactComponents(text)}</article>
      </section>
    </>
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getStaticPaths(): Promise<any> {
  const res = await client.getEntries({ content_type: "blog" });

  const paths = res.items.map((item: any) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any): Promise<any> {
  const { items } = await client.getEntries({ content_type: "blog", "fields.slug": params.slug });

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
