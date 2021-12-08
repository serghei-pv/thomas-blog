import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">
        <a>Start</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/rezepte">
        <a>Rezepte</a>
      </Link>
      <Link href="/galerie">
        <a>Galerie</a>
      </Link>
    </nav>
  );
}
