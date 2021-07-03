import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Main from "../src/Layout/Main";
import UserContext from "../src/Context/UserContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "../src/services/user.services";

export default function MyApp(props: any) {
  const { Component, pageProps } = props;
  const [user, setUser] = useState({});

  const getCurrentProfile = async () => {
    try {
      const user = await getProfile();
      if (user.data) {
        setUser(user.data);
      }
    } catch (err) {
      // if there is any problem, consider user as logged out
      setUser({});
    }
  };

  React.useEffect(() => {
    getCurrentProfile();
    // get profile every minute to refresh token
    const interval = setInterval(() => {
      getCurrentProfile();
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My Blog</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <UserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <Main>
            <Component {...pageProps} />
          </Main>
        </UserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
