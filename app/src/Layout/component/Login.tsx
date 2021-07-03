import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import UserContext from "../../Context/UserContext";
import { getProfile, login } from "../../services/user.services";

interface ILogin {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  fields: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Login: React.FC<ILogin> = ({ open, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      await login(form);

      // now get the user profile
      const user = await getProfile();

      setUser(user.data);
      onClose();
    } catch (err) {
      if (err?.response?.status === 404) {
        toast.error("Login or password incorrect");
      } else {
        toast.error("Oops something wring happen !");
      }
    }
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>Please login to create new posts</DialogContentText>
        <TextField
          className={classes.fields}
          type="email"
          name="email"
          fullWidth
          variant="outlined"
          label="Login"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          className={classes.fields}
          type="password"
          name="password"
          fullWidth
          variant="outlined"
          label="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
