import { makeStyles, Typography, Button } from "@material-ui/core";
import Image from "next/image";
import React from "react";
import Post from "../../Types/Post";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface IPostDetail {
  post: Post;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: `${theme.spacing(2)}px auto`,
    textAlign: "center",
  },
  imgContainer: {
    minHeight: 350,
    position: "relative",
    marginBottom: theme.spacing(2),
  },
}));

const PostDetail: React.FC<IPostDetail> = ({ post }) => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <div style={{ textAlign: "start" }}>
        <Button startIcon={<ArrowBackIcon />} component="a" href="/">
          Back
        </Button>
      </div>
      <div className={classes.imgContainer}>
        <Image
          src={post.imgUrl}
          alt={post.title}
          objectFit="contain"
          layout="fill"
        />
      </div>
      <Typography variant="h2" component="h1">
        {post.title}
      </Typography>
      <p>{post.content}</p>
    </main>
  );
};

export default PostDetail;
