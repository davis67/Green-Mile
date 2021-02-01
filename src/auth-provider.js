const localStorageKey = "__auth_provider__token__";

function handleUserResponse(user) {
  console.log("user", user);
  window.localStorage.setItem(localStorageKey, user.tokens.access);

  return user;
}

function login({ email, password }) {
  return client("login", { email, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

const authURL = process.env.REACT_APP_AUTH_URL;

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return window
    .fetch(`${authURL}${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { login, getToken, logout };
