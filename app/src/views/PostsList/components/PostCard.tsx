import Image from "next/image";
import React from "react";
import Post from "../../../Types/Post";

import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

interface Props {
  post: Post;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    margin: `${theme.spacing(2)}px auto`,
  },
  picture: {
    maxHeight: 350,
  },
}));

const PostCard: React.FC<Props> = ({ post }) => {
  const classes = useStyles();
  const router = useRouter();

  const redirectToDetail = () => {
    router.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.root} onClick={redirectToDetail}>
      <CardActionArea>
        <CardMedia
          className={classes.picture}
          component="img"
          src={post.imgUrl}
          alt={post.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
