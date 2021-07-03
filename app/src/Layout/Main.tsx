import { makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Login from "./component/Login";
import UserContext from "../Context/UserContext";
import PostForm from "../Layout/component/PostForm";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  toolbar: {
    minHeight: 128,
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  postBtn: {
    marginRight: theme.spacing(4),
  },
}));

interface IMain {
  children: any; // any because children could have many types
}

const Main: React.FC<IMain> = ({ children }) => {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [createPostOpen, setCreatePostOpen] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            variant="h5"
            component={"a"}
            href="/"
            noWrap
          >
            My Blog
          </Typography>

          {(!user || Object.values(user).length === 0) && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
          )}
          {user && Object.values(user).length > 0 && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setCreatePostOpen(true)}
                className={classes.postBtn}
              >
                Create new post
              </Button>
              <Typography variant="body2" component="span">
                {user.email}
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
      <PostForm
        open={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
      />
    </>
  );
};

export default Main;
