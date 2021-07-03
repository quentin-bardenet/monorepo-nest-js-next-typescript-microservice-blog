import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import axios from "axios";
import useSWR from "swr";
import PostDetail from "../../src/views/PostDetail/PostDetail";

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        "x-token": process.env.API_TOKEN,
      },
    })
    .then((res) => res.data);

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await fetcher(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}posts/${context.params?.id}`
  );
  return {
    props: {
      post: post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}posts`);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: any) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: "blocking" };
};

export default function PostDetailPage(props: any) {
  const { post } = props;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}posts/${post._id}`,
    fetcher,
    {
      initialData: post,
    }
  );

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content} />
      </Head>

      <PostDetail post={post} />
    </div>
  );
}
