import React from "react";
import { Unauthenticatedapp } from "./unauthenticated-app";
import { Authenticatedapp } from "./authenticated-app";
import * as auth from "./auth-provider";
import { client } from "./utils/api-client";
import { FullPageSpinner } from "./components/lib";
import { useAsync } from "./utils/hooks";
// import "./test/server";
import { BrowserRouter as Router } from "react-router-dom";

async function getUser() {
  let user = null;

  const token = await auth.getToken();

  if (token) {
    const data = await client("auth/me", "GET");

    user = data.data;
  }

  return user;
}

function App() {
  const {
    data: user,
    setData,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
  } = useAsync();

  React.useEffect(() => {
    run(getUser());
  }, [run]);

  const login = (form) => auth.login(form).then((user) => setData(user));

  const logout = () => {
    auth.logout();
    setData(null);
  };

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isSuccess) {
    console.log("user", user);
    return user ? (
      <Router>
        <Authenticatedapp user={user} logout={logout} />
      </Router>
    ) : (
      <Unauthenticatedapp login={login} />
    );
  }
}

export default App;
