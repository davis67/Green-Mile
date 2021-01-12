import React from "react";
import { Unauthenticatedapp } from "./unauthenticated-app";
import * as auth from "./auth-provider";
import { useAsync } from "./utils/hooks";
import "./test/server";

function App() {
  const { setData } = useAsync();
  const login = (form) => auth.login(form).then((user) => setData(user));
  return <Unauthenticatedapp login={login} />;
}

export default App;
