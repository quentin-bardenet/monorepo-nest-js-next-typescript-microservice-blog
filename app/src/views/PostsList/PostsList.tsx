import React from "react";
import Post from "../../Types/Post";
import PostCard from "./components/PostCard";

interface Props {
  posts: Post[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <main>
      {posts.map((post: Post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  );
};

export default PostsList;
