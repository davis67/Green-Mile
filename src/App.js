import React from "react";
import { Unauthenticatedapp } from "./unauthenticated-app";
import { Authenticatedapp } from "./authenticated-app";
import * as auth from "./auth-provider";
import { client } from "./utils/api-client";
import { FullPageSpinner } from "./components/lib";
import { useAsync } from "./utils/hooks";
import "./test/server";

async function getUser() {
  let user = null;

  const token = await auth.getToken();

  if (token) {
    const data = await client("me", { token });
    user = data.user;
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
    return user ? (
      <Authenticatedapp user={user} logout={logout} />
    ) : (
      <Unauthenticatedapp login={login} />
    );
  }
}

export default App;
