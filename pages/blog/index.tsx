import { createClient } from "contentful";
import BlogCard from "../../src/components/BlogCard";
import styles from "../../src/styles/blog.module.css";

export default function blog({ blogposts }: any) {
  return (
    <>
      <h1>Blog</h1>
      <ul className={styles.ul}>
        {blogposts.map((post: any) => (
          <BlogCard key={post.sys.id} post={post} />
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

  const blogposts = await client.getEntries({ content_type: "blog" });

  blogposts.items.sort(function (b, a) {
    return a.sys.createdAt.localeCompare(b.sys.createdAt);
  });

  return {
    props: {
      blogposts: blogposts.items,
      revalidate: 60,
    },
  };
}
