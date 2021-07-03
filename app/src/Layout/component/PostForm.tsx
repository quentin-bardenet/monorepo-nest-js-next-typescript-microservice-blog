import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { mutate } from "swr";
import { createPost } from "../../services/post.services";

interface IPostForm {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  fields: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const PostForm: React.FC<IPostForm> = ({ open, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    title: "",
    content: "",
    imgUrl: "",
  });

  const handleSubmit = async () => {
    await createPost(form);
    mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}posts`);
    onClose();
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>New Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new post as logged in user
        </DialogContentText>
        <TextField
          className={classes.fields}
          type="text"
          name="imgUrl"
          fullWidth
          variant="outlined"
          label="Link of image"
          value={form.imgUrl}
          onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
        />
        <TextField
          className={classes.fields}
          type="text"
          name="title"
          fullWidth
          variant="outlined"
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <TextField
          className={classes.fields}
          type="text"
          name="content"
          fullWidth
          variant="outlined"
          label="Content"
          value={form.content}
          multiline
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
