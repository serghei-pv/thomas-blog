import Head from "next/head";

export default function HeadContainer({ children }: any) {
  return (
    <Head>
      <title>Thomas | {children} </title>
      <meta name="description" content="Mein Blog." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Head>
  );
}
