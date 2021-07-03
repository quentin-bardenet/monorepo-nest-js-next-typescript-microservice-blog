import { GetStaticProps } from "next";
import axios from "axios";
import useSWR from "swr";
import Head from "next/head";

import PostsList from "../src/views/PostsList/PostsList";

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        "x-token": process.env.API_TOKEN,
      },
    })
    .then((res) => res.data);

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}posts`);

  return {
    props: {
      posts: posts,
    },
  };
};

export default function Home(props: any) {
  const { posts } = props;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}posts`,
    fetcher,
    {
      initialData: posts,
    }
  );

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog" />
      </Head>
      <PostsList posts={data} />
    </>
  );
}
